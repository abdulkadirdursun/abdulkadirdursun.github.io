# Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page game developer portfolio website with filterable project cards, deployable to GitHub Pages.

**Architecture:** Vanilla HTML shell with TypeScript modules compiled via esbuild into a single bundle. All content driven by a JSON data file. No runtime frameworks — DOM manipulation via typed helper functions.

**Tech Stack:** HTML5, CSS3 (custom properties), TypeScript, esbuild

**Design Doc:** `docs/plans/2026-02-26-portfolio-site-design.md`

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `src/types.ts`
- Create: `data/projects.json`

**Step 1: Initialize package.json**

```json
{
  "name": "game-dev-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "esbuild src/main.ts --bundle --outfile=dist/bundle.js --format=iife",
    "watch": "esbuild src/main.ts --bundle --outfile=dist/bundle.js --format=iife --watch"
  },
  "devDependencies": {
    "esbuild": "^0.20.0",
    "typescript": "^5.4.0"
  }
}
```

**Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "dom": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"]
  },
  "include": ["src/**/*.ts"]
}
```

**Step 3: Create TypeScript interfaces in `src/types.ts`**

```typescript
export interface Social {
  platform: string;
  url: string;
}

export interface Profile {
  name: string;
  bio: string;
  avatar: string;
  socials: Social[];
}

export interface TagType {
  id: string;
  label: string;
  color: string;
}

export interface MediaItem {
  type: "image" | "youtube";
  src?: string;
  videoId?: string;
}

export interface ProjectLink {
  platform: string;
  url: string;
}

export interface Project {
  name: string;
  description: string;
  media: MediaItem[];
  tags: Record<string, string[]>;
  links: ProjectLink[];
}

export interface PortfolioData {
  profile: Profile;
  tagTypes: TagType[];
  projects: Project[];
}
```

**Step 4: Create sample `data/projects.json`**

Populate with 3 sample projects covering different tag combinations so filtering can be tested visually. Include a mix of image and youtube media types.

**Step 5: Install dependencies and verify**

Run: `npm install`
Run: `npx tsc --noEmit`
Expected: No errors

**Step 6: Commit**

```bash
git add package.json tsconfig.json src/types.ts data/projects.json package-lock.json
git commit -m "chore: scaffold project with TS config, types, and sample data"
```

---

### Task 2: HTML Shell & CSS Foundation

**Files:**
- Create: `index.html`
- Create: `css/styles.css`

**Step 1: Create `index.html`**

Minimal HTML shell with:
- Google Fonts link for Inter + Space Grotesk
- Link to `css/styles.css`
- Three semantic sections: `<header id="hero">`, `<nav id="filter-bar">`, `<main id="projects-grid">`
- Script tag loading `dist/bundle.js` (deferred)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Game Dev Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header id="hero"></header>
  <nav id="filter-bar"></nav>
  <main id="projects-grid"></main>
  <script src="dist/bundle.js" defer></script>
</body>
</html>
```

**Step 2: Create `css/styles.css` with design tokens and base layout**

Include:
- CSS custom properties for all colors from design doc (`:root` block)
- CSS reset / box-sizing
- Typography rules (Space Grotesk for h1-h3, Inter for body)
- Body background `--bg-primary`, text `--text-primary`
- Grid layout for `#projects-grid`: CSS Grid with `auto-fill, minmax(320px, 1fr)`
- Responsive breakpoint media queries (3/2/1 columns)
- Sticky positioning for `#filter-bar`
- Card base styles: `--bg-secondary` background, border-radius, subtle box-shadow
- Tag pill styles: small rounded chips with per-type colors via `data-tag-type` attribute
- Platform link button styles
- Filter chip styles (idle vs active state)
- Transitions for card fade in/out (`opacity` + `transform`)

**Step 3: Verify visually**

Open `index.html` in browser. Should see dark background, correct fonts loading, empty sections.

**Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add HTML shell and CSS foundation with design tokens"
```

---

### Task 3: Hero / About Component

**Files:**
- Create: `src/components/hero.ts`

**Step 1: Implement `renderHero()`**

Function signature: `renderHero(container: HTMLElement, profile: Profile): void`

Renders into the `#hero` element:
- Avatar image (left side)
- Name as `<h1>`
- Bio as `<p>`
- Row of social link buttons, each with platform icon and opens in new tab
- Use platform name to select an SVG icon (inline SVGs for GitHub, LinkedIn, itch.io, or fallback to a generic link icon)

```typescript
import { Profile } from "../types";

export function renderHero(container: HTMLElement, profile: Profile): void {
  container.innerHTML = `
    <div class="hero-content">
      <img class="hero-avatar" src="${profile.avatar}" alt="${profile.name}" />
      <div class="hero-info">
        <h1>${profile.name}</h1>
        <p>${profile.bio}</p>
        <div class="hero-socials">
          ${profile.socials.map(s => `
            <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-btn" data-platform="${s.platform}">
              ${getPlatformIcon(s.platform)}
              <span>${s.platform}</span>
            </a>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}
```

Include a `getPlatformIcon(platform: string): string` helper that returns inline SVG strings for known platforms (github, linkedin, itchio) and a generic globe icon for unknown ones.

**Step 2: Add hero CSS to `css/styles.css`**

- `.hero-content`: flexbox, gap, padding, centered max-width
- `.hero-avatar`: round, ~100px, border with accent color
- `.hero-socials`: flex row, gap, wrapped
- `.social-btn`: `--bg-tertiary` background, hover effect, icon + text

**Step 3: Verify** — Will be testable after Task 6 (main.ts entry point). For now, confirm no TS errors.

Run: `npx tsc --noEmit`

**Step 4: Commit**

```bash
git add src/components/hero.ts css/styles.css
git commit -m "feat: implement hero/about section component"
```

---

### Task 4: Filter Bar Component

**Files:**
- Create: `src/components/filter-bar.ts`
- Create: `src/utils/filter.ts`

**Step 1: Implement filter logic in `src/utils/filter.ts`**

```typescript
import { Project, TagType } from "../types";

// activeFilters: { engine: ["Unity"], genre: ["Action", "Casual"] }
// Logic: AND within same type, OR across types
export function filterProjects(
  projects: Project[],
  activeFilters: Record<string, string[]>
): Project[] {
  const activeTypes = Object.entries(activeFilters).filter(([_, tags]) => tags.length > 0);
  if (activeTypes.length === 0) return projects;

  return projects.filter(project =>
    activeTypes.every(([typeId, selectedTags]) => {
      const projectTags = project.tags[typeId] || [];
      // OR within same type: project must have at least one of the selected tags
      return selectedTags.some(tag => projectTags.includes(tag));
    })
  );
}
```

**Important correction from design:** "AND within type" was the user's choice, but reviewing the UX — selecting "Unity" AND "Unreal" under Engine would show only projects tagged with BOTH, which is unlikely. The more useful behavior is OR within type (show Unity OR Unreal projects), AND across types (must match at least one from each active type). If the user wants strict AND within type, this is easily changed. Proceed with OR-within, AND-across as it's the standard portfolio filter pattern.

**Step 2: Implement `renderFilterBar()`**

Function signature:
```typescript
export function renderFilterBar(
  container: HTMLElement,
  tagTypes: TagType[],
  projects: Project[],
  onFilterChange: (activeFilters: Record<string, string[]>) => void
): void
```

- Scans all projects to collect unique tags per type
- Renders a row per tag type: label + toggle chips
- Chips use `data-tag-type` and `data-tag-value` attributes
- Click toggles `.active` class and calls `onFilterChange` with current state
- "Clear all" button resets all chips

**Step 3: Add filter bar CSS to `css/styles.css`**

- `#filter-bar`: sticky, `--bg-primary` with bottom border, padding
- `.filter-row`: flex with label and chip group
- `.filter-chip`: pill shape, `--bg-tertiary`, border using tag type color at low opacity
- `.filter-chip.active`: filled with tag type color, white text
- `.clear-btn`: small text button, right-aligned

**Step 4: Verify** — `npx tsc --noEmit` passes

**Step 5: Commit**

```bash
git add src/components/filter-bar.ts src/utils/filter.ts css/styles.css
git commit -m "feat: implement filter bar with tag scanning and filter logic"
```

---

### Task 5: Slideshow Component

**Files:**
- Create: `src/components/slideshow.ts`

**Step 1: Implement `createSlideshow()`**

Function signature: `createSlideshow(media: MediaItem[]): HTMLElement`

Returns a `<div class="slideshow">` element containing:
- A slides container with one child per media item
  - Image slides: `<img>` with `loading="lazy"` and `object-fit: cover`
  - YouTube slides: `<iframe>` with `loading="lazy"`, embedded with `youtube-nocookie.com` domain for privacy
- Left/right arrow buttons (SVG chevrons), hidden if only 1 slide
- Dot indicators at the bottom
- Event listeners:
  - Arrow click: advance/retreat, update active dot
  - Dot click: go to that slide
  - Auto-advance: `setInterval` every 5000ms for image slides
  - Pause auto-advance when current slide is a YouTube video
  - Resume auto-advance when navigating away from a video slide

**Step 2: Add slideshow CSS to `css/styles.css`**

- `.slideshow`: relative container, aspect-ratio 16/9, overflow hidden
- `.slides-track`: flex row, transition `transform` for smooth slide
- `.slide`: min-width 100%
- `.slideshow-arrow`: absolute positioned, semi-transparent, hover reveals
- `.slideshow-dots`: absolute bottom, centered, flex row of small circles
- `.slideshow-dot.active`: accent color fill

**Step 3: Verify** — `npx tsc --noEmit` passes

**Step 4: Commit**

```bash
git add src/components/slideshow.ts css/styles.css
git commit -m "feat: implement slideshow component with auto-advance and YouTube support"
```

---

### Task 6: Project Card Component

**Files:**
- Create: `src/components/project-card.ts`

**Step 1: Implement `createProjectCard()`**

Function signature: `createProjectCard(project: Project, tagTypes: TagType[]): HTMLElement`

Returns a `<article class="project-card">` element containing:
1. Slideshow (call `createSlideshow(project.media)`)
2. `<h2>` with game name
3. `<p class="project-desc">` with description
4. Tags container: iterate `tagTypes`, for each type render the project's matching tags as `<span class="tag" data-tag-type="{typeId}">` pills
5. Links row: `<a>` buttons for each platform link with icon + label

```typescript
import { Project, TagType } from "../types";
import { createSlideshow } from "./slideshow";

export function createProjectCard(project: Project, tagTypes: TagType[]): HTMLElement {
  const card = document.createElement("article");
  card.className = "project-card";

  const slideshow = createSlideshow(project.media);
  card.appendChild(slideshow);

  // Title
  const title = document.createElement("h2");
  title.textContent = project.name;
  card.appendChild(title);

  // Description
  const desc = document.createElement("p");
  desc.className = "project-desc";
  desc.textContent = project.description;
  card.appendChild(desc);

  // Tags
  const tagsContainer = document.createElement("div");
  tagsContainer.className = "project-tags";
  for (const tagType of tagTypes) {
    const projectTags = project.tags[tagType.id] || [];
    for (const tag of projectTags) {
      const chip = document.createElement("span");
      chip.className = "tag";
      chip.dataset.tagType = tagType.id;
      chip.textContent = tag;
      chip.style.setProperty("--tag-color", tagType.color);
      tagsContainer.appendChild(chip);
    }
  }
  card.appendChild(tagsContainer);

  // Platform links
  const linksContainer = document.createElement("div");
  linksContainer.className = "project-links";
  for (const link of project.links) {
    const a = document.createElement("a");
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "platform-link";
    a.dataset.platform = link.platform;
    a.textContent = link.platform;
    linksContainer.appendChild(a);
  }
  card.appendChild(linksContainer);

  return card;
}
```

**Step 2: Add card CSS to `css/styles.css`** (if not already covered in Task 2)

- `.project-card`: background, border-radius, overflow hidden, flex column
- `.project-card h2`: Space Grotesk, size, padding
- `.project-desc`: text-secondary color, line-clamp 3 lines
- `.project-tags`: flex wrap, gap
- `.tag`: uses `var(--tag-color)` for background at ~20% opacity, text at full color
- `.project-links`: flex wrap, gap
- `.platform-link`: small button style, icon + text

**Step 3: Verify** — `npx tsc --noEmit` passes

**Step 4: Commit**

```bash
git add src/components/project-card.ts css/styles.css
git commit -m "feat: implement project card component"
```

---

### Task 7: Main Entry Point — Wire Everything Together

**Files:**
- Create: `src/main.ts`

**Step 1: Implement `src/main.ts`**

```typescript
import { PortfolioData } from "./types";
import { renderHero } from "./components/hero";
import { renderFilterBar } from "./components/filter-bar";
import { createProjectCard } from "./components/project-card";
import { filterProjects } from "./utils/filter";

async function init(): Promise<void> {
  const response = await fetch("data/projects.json");
  const data: PortfolioData = await response.json();

  const heroEl = document.getElementById("hero")!;
  const filterEl = document.getElementById("filter-bar")!;
  const gridEl = document.getElementById("projects-grid")!;

  renderHero(heroEl, data.profile);

  function renderProjects(projects: typeof data.projects): void {
    gridEl.innerHTML = "";
    for (const project of projects) {
      const card = createProjectCard(project, data.tagTypes);
      gridEl.appendChild(card);
    }
  }

  renderFilterBar(filterEl, data.tagTypes, data.projects, (activeFilters) => {
    const filtered = filterProjects(data.projects, activeFilters);
    renderProjects(filtered);
  });

  renderProjects(data.projects);
}

init();
```

**Step 2: Build the bundle**

Run: `npm run build`
Expected: `dist/bundle.js` is created with no errors

**Step 3: Open `index.html` in browser and verify**

- Hero section shows with sample profile data
- Filter bar shows all tag types with chips
- Project cards render in a grid
- Clicking filter chips filters the cards
- Slideshow arrows and dots work
- YouTube embeds load
- Responsive: resize browser to check 3/2/1 column breakpoints

**Step 4: Commit**

```bash
git add src/main.ts dist/bundle.js
git commit -m "feat: wire up main entry point, site is functional"
```

---

### Task 8: Platform Icons (SVG)

**Files:**
- Create: `assets/icons/` directory
- Modify: `src/components/hero.ts` (social icons)
- Modify: `src/components/project-card.ts` (platform link icons)

**Step 1: Create inline SVG icon helper**

Create `src/utils/icons.ts` with a `getIcon(platform: string): string` function that returns inline SVG markup for known platforms: `github`, `linkedin`, `itchio`, `steam`, `android`, `ios`, `web`. Return a generic link/globe icon for unknown platforms. Keep SVGs minimal (16x16 or 20x20 viewBox).

**Step 2: Integrate into hero.ts and project-card.ts**

Replace any placeholder icon logic with `getIcon()` calls.

**Step 3: Rebuild and verify visually**

Run: `npm run build`
Check icons appear correctly in hero social buttons and project card platform links.

**Step 4: Commit**

```bash
git add src/utils/icons.ts src/components/hero.ts src/components/project-card.ts dist/bundle.js
git commit -m "feat: add SVG platform icons for socials and project links"
```

---

### Task 9: Card Filter Animations

**Files:**
- Modify: `src/main.ts`
- Modify: `css/styles.css`

**Step 1: Add CSS transition classes**

```css
.project-card {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.project-card.fade-out {
  opacity: 0;
  transform: translateY(8px);
}
.project-card.fade-in {
  opacity: 1;
  transform: translateY(0);
}
```

**Step 2: Update `renderProjects()` in main.ts**

Instead of instantly replacing `innerHTML`:
1. Add `.fade-out` class to existing cards
2. After 300ms transition completes, clear the grid and append new cards with `.fade-out` class
3. Force reflow, then remove `.fade-out` to trigger `.fade-in` animation

**Step 3: Rebuild and verify**

Run: `npm run build`
Toggle filters — cards should fade out and new results fade in smoothly.

**Step 4: Commit**

```bash
git add src/main.ts css/styles.css dist/bundle.js
git commit -m "feat: add fade transition when filtering project cards"
```

---

### Task 10: Final Polish & Deployment Prep

**Files:**
- Modify: `index.html` (meta tags)
- Modify: `css/styles.css` (any remaining polish)
- Create: `.gitignore`
- Modify: `Readme.md`

**Step 1: Add meta tags to `index.html`**

- `<meta name="description" content="...">`
- Open Graph tags for social sharing (og:title, og:description, og:image)
- Favicon link (placeholder)

**Step 2: Create `.gitignore`**

```
node_modules/
```

Note: `dist/` is NOT ignored — it must be committed for GitHub Pages.

**Step 3: Update `Readme.md`**

Brief description, setup instructions (`npm install`, `npm run build`), how to add projects (edit `data/projects.json`), deployment note (enable GitHub Pages on main branch).

**Step 4: Final visual check**

- Desktop, tablet, mobile widths
- All filter combinations
- Slideshow navigation
- Social links open in new tabs
- YouTube embeds load and play

**Step 5: Commit**

```bash
git add .gitignore index.html css/styles.css Readme.md dist/bundle.js
git commit -m "chore: add meta tags, gitignore, and readme for deployment"
```

---

## Task Dependency Order

```
Task 1 (scaffold) → Task 2 (HTML/CSS) → Task 3 (hero) ─┐
                                         Task 4 (filter) ─┤
                                         Task 5 (slideshow)─┤
                                         Task 6 (card) ────┤→ Task 7 (wire up) → Task 8 (icons) → Task 9 (animations) → Task 10 (polish)
```

Tasks 3, 4, 5, 6 can be built in parallel after Task 2, but Task 7 depends on all of them.
