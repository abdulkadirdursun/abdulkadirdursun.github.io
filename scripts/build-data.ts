import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

interface ProjectFrontmatter {
  name: string;
  sortOrder?: number;
  status: string;
  media: Array<{ type: string; src?: string; videoId?: string }>;
  tags: Record<string, string[]>;
  links: Array<{ platform: string; url: string }>;
}

interface CategoryDef {
  id: string;
  label: string;
}

const REQUIRED_FIELDS: (keyof ProjectFrontmatter)[] = ["name", "status", "media", "tags", "links"];

const dataDir = path.resolve(__dirname, "..", "data");
const projectsDir = path.join(dataDir, "projects");
const configPath = path.join(dataDir, "config.json");
const outputPath = path.join(dataDir, "projects.json");

// Read config
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

// Validate categories from config
if (!Array.isArray(config.categories) || config.categories.length === 0) {
  console.error("ERROR: config.json must define a non-empty `categories` array");
  process.exit(1);
}

const categories = config.categories as CategoryDef[];
const categoryIds = categories.map(c => c.id);

// Collect projects from category folders
const projects: Array<Record<string, unknown>> = [];
let hasErrors = false;

for (const category of categoryIds) {
  const categoryDir = path.join(projectsDir, category);
  if (!fs.existsSync(categoryDir)) continue;

  const files = fs.readdirSync(categoryDir).filter(f => f.endsWith(".md"));

  for (const file of files) {
    const filePath = path.join(categoryDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    // Validate required fields
    const missing = REQUIRED_FIELDS.filter(field => !(field in data));
    if (missing.length > 0) {
      console.error(`SKIP ${category}/${file}: missing fields: ${missing.join(", ")}`);
      hasErrors = true;
      continue;
    }

    const frontmatter = data as ProjectFrontmatter;

    // Validate sortOrder
    if (frontmatter.sortOrder !== undefined) {
      if (!Number.isInteger(frontmatter.sortOrder) || frontmatter.sortOrder < 1) {
        console.warn(`WARN ${category}/${file}: invalid sortOrder "${frontmatter.sortOrder}" (must be positive integer), treating as unset`);
        frontmatter.sortOrder = undefined;
      }
    }

    projects.push({
      name: frontmatter.name,
      sortOrder: frontmatter.sortOrder,
      category,
      status: frontmatter.status,
      description: marked.parse(content.trim(), { async: false }) as string,
      media: frontmatter.media,
      tags: frontmatter.tags,
      links: frontmatter.links,
    });
  }
}

// Warn on duplicate sortOrder within the same status (sortOrder only competes inside a status cluster)
{
  const seen = new Map<string, string[]>();
  for (const p of projects) {
    if (p.sortOrder === undefined) continue;
    const key = `${p.status}:${p.sortOrder}`;
    if (!seen.has(key)) seen.set(key, []);
    seen.get(key)!.push(`${p.category}/${p.name}`);
  }
  for (const [key, names] of seen) {
    if (names.length > 1) {
      console.warn(`WARN duplicate sortOrder (${key}) in: ${names.join(", ")}`);
    }
  }
}

const STATUS_SORT_RANK: Record<string, number> = {
  "work-in-progress": 0,
  "published": 1,
  "prototype": 2,
  "cancelled": 3,
};

// Sort projects globally: status rank first (work-in-progress -> published -> prototype -> cancelled),
// then sortOrder ascending within each status (with-sortOrder first, then without), name as tiebreak.
// Category-filtered tabs preserve this order since filtering keeps relative order.
projects.sort((a, b) => {
  const rankA = STATUS_SORT_RANK[a.status as string] ?? 99;
  const rankB = STATUS_SORT_RANK[b.status as string] ?? 99;
  if (rankA !== rankB) return rankA - rankB;

  const orderA = a.sortOrder as number | undefined;
  const orderB = b.sortOrder as number | undefined;
  const nameA = (a.name as string).toLowerCase();
  const nameB = (b.name as string).toLowerCase();

  if (orderA !== undefined && orderB !== undefined) {
    if (orderA !== orderB) return orderA - orderB;
    return nameA.localeCompare(nameB);
  }
  if (orderA !== undefined) return -1;
  if (orderB !== undefined) return 1;
  return nameA.localeCompare(nameB);
});

// Remove sortOrder from output (build-time only)
for (const p of projects) {
  delete p.sortOrder;
}

// Write output
const output = {
  profile: config.profile,
  categories,
  tagTypes: config.tagTypes,
  projects,
};

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Built data/projects.json with ${projects.length} projects across ${categoryIds.length} categories`);

if (hasErrors) {
  process.exit(1);
}
