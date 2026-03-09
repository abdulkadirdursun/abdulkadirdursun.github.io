import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface ProjectFrontmatter {
  name: string;
  sortOrder?: number;
  status: string;
  media: Array<{ type: string; src?: string; videoId?: string }>;
  tags: Record<string, string[]>;
  links: Array<{ platform: string; url: string }>;
}

const REQUIRED_FIELDS: (keyof ProjectFrontmatter)[] = ["name", "status", "media", "tags", "links"];
const CATEGORIES = ["personal", "professional"] as const;

const dataDir = path.resolve(__dirname, "..", "data");
const projectsDir = path.join(dataDir, "projects");
const configPath = path.join(dataDir, "config.json");
const outputPath = path.join(dataDir, "projects.json");

// Read config
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

// Collect projects from category folders
const projects: Array<Record<string, unknown>> = [];
let hasErrors = false;

for (const category of CATEGORIES) {
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
      description: content.trim(),
      media: frontmatter.media,
      tags: frontmatter.tags,
      links: frontmatter.links,
    });
  }
}

// Warn on duplicate sortOrder within same category
for (const category of CATEGORIES) {
  const categoryProjects = projects.filter(p => p.category === category && p.sortOrder !== undefined);
  const seen = new Map<number, string[]>();
  for (const p of categoryProjects) {
    const order = p.sortOrder as number;
    if (!seen.has(order)) seen.set(order, []);
    seen.get(order)!.push(p.name as string);
  }
  for (const [order, names] of seen) {
    if (names.length > 1) {
      console.warn(`WARN ${category}: duplicate sortOrder ${order} in: ${names.join(", ")}`);
    }
  }
}

// Sort projects: per-category, sortOrder ascending (with-sortOrder first, then without)
projects.sort((a, b) => {
  // Group by category first (preserve CATEGORIES order)
  const catA = CATEGORIES.indexOf(a.category as typeof CATEGORIES[number]);
  const catB = CATEGORIES.indexOf(b.category as typeof CATEGORIES[number]);
  if (catA !== catB) return catA - catB;

  const orderA = a.sortOrder as number | undefined;
  const orderB = b.sortOrder as number | undefined;
  const nameA = (a.name as string).toLowerCase();
  const nameB = (b.name as string).toLowerCase();

  // Both have sortOrder: ascending, tie-break by name
  if (orderA !== undefined && orderB !== undefined) {
    if (orderA !== orderB) return orderA - orderB;
    return nameA.localeCompare(nameB);
  }
  // Only one has sortOrder: it comes first
  if (orderA !== undefined) return -1;
  if (orderB !== undefined) return 1;
  // Neither has sortOrder: alphabetical by name
  return nameA.localeCompare(nameB);
});

// Remove sortOrder from output (build-time only)
for (const p of projects) {
  delete p.sortOrder;
}

// Write output
const output = {
  profile: config.profile,
  tagTypes: config.tagTypes,
  projects,
};

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Built data/projects.json with ${projects.length} projects`);

if (hasErrors) {
  process.exit(1);
}
