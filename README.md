# Game Dev Portfolio Template

A single-page, dark-themed portfolio website for game developers. Project cards with image/YouTube slideshows, sticky filter bar, and tab-based category navigation. No runtime framework — vanilla TypeScript bundled with esbuild. Designed to be hosted statically on GitHub Pages.

---

## Table of contents

1. [Quick start](#quick-start)
2. [How the build works](#how-the-build-works)
3. [Customizing your profile](#customizing-your-profile)
4. [Adding a project](#adding-a-project)
5. [Removing a project](#removing-a-project)
6. [Project frontmatter reference](#project-frontmatter-reference)
7. [Sort order](#sort-order)
8. [Tag types (filter categories)](#tag-types-filter-categories)
9. [Adding a project category](#adding-a-project-category)
10. [Removing a project category](#removing-a-project-category)
11. [Media: images and YouTube](#media-images-and-youtube)
12. [Platform links and icons](#platform-links-and-icons)
13. [Deployment (GitHub Pages)](#deployment-github-pages)
14. [Project layout](#project-layout)
15. [Tech stack](#tech-stack)

---

## Quick start

```bash
npm install
npm run build
```

This produces:
- `data/projects.json` — generated from `data/config.json` and the markdown files under `data/projects/`
- `dist/bundle.js` — bundled JS

Then open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

For active development (re-bundles JS on save):

```bash
npm run watch
```

Note: `watch` only re-bundles JS. If you edit files under `data/`, run `npm run build:data` (or full `npm run build`) to regenerate `data/projects.json`.

---

## How the build works

Authoring happens in two places:

1. **`data/config.json`** — your profile, social links, project `categories` (the tabs), and `tagTypes` (filter categories like Engine, Genre, etc.).
2. **`data/projects/<category>/<slug>.md`** — one markdown file per project. YAML frontmatter holds metadata; the markdown body is the project description.

`scripts/build-data.ts` (run via `tsx`) reads both, validates required fields, sorts projects, and writes a single combined `data/projects.json`. At runtime, `src/main.ts` fetches that JSON and renders the page.

```
config.json + data/projects/**/*.md  ──build:data──▶  data/projects.json
src/**/*.ts                          ──build:js────▶  dist/bundle.js
```

**Do not edit `data/projects.json` by hand** — it is overwritten on every build. `dist/bundle.js` is similarly a build artifact, but it is committed so GitHub Pages can serve it without a CI step.

---

## Customizing your profile

Edit `data/config.json`:

```json
{
  "profile": {
    "name": "Your Name",
    "bio": "Short tagline shown in the hero",
    "avatar": "assets/profile.jpg",
    "socials": [
      { "platform": "github",   "url": "https://github.com/your-handle" },
      { "platform": "linkedin", "url": "https://www.linkedin.com/in/your-handle" },
      { "platform": "itchio",   "url": "https://your-handle.itch.io/" }
    ]
  },
  ...
}
```

- Replace `assets/profile.jpg` with your own image (any aspect ratio — it is rendered as a 100 px circle).
- `socials[].platform` controls which icon is shown. See [Platform links and icons](#platform-links-and-icons) for supported values.

After editing `config.json`, run `npm run build:data`.

---

## Adding a project

1. Decide which category the project belongs to: `personal` or `professional` (or a custom category — see [Adding a project category](#adding-a-project-category)).
2. Create `data/projects/<category>/<slug>.md`. The filename is up to you (use kebab-case).
3. Paste this template and fill it in:

```markdown
---
name: My Awesome Game
sortOrder: 1
status: published
media:
  - type: youtube
    videoId: dQw4w9WgXcQ
  - type: image
    src: assets/projects/myawesomegame/screenshot1.png
  - type: image
    src: assets/projects/myawesomegame/screenshot2.png
tags:
  engine: [Unity]
  platform: [Steam, Android]
  genre: [Action, Roguelike]
  graphics: [3D]
links:
  - platform: steam
    url: https://store.steampowered.com/app/123456/
  - platform: android
    url: https://play.google.com/store/apps/details?id=com.example
---

A short description of the project. The body of the markdown file becomes the
description shown on the card. Keep it to a few sentences — the card clamps it
to 3 lines.
```

4. Drop your screenshots/cover art into `assets/projects/<your-folder>/` and reference them in `media`.
5. Run `npm run build` and reload the page.

---

## Removing a project

Delete the corresponding markdown file under `data/projects/<category>/`, then run `npm run build`. Optionally delete the project's image folder under `assets/projects/`.

---

## Project frontmatter reference

| Field        | Required | Type                 | Notes                                                                                         |
| ------------ | -------- | -------------------- | --------------------------------------------------------------------------------------------- |
| `name`       | yes      | string               | Card title. Quote it if it contains a colon (`name: "Cube Match: 3D Puzzle"`).                |
| `status`     | yes      | enum                 | One of: `published`, `cancelled`, `prototype`, `work-in-progress`. Drives the colored badge.    |
| `media`      | yes      | array                | At least one item. See [Media](#media-images-and-youtube).                                    |
| `tags`       | yes      | object               | Map of `tagType.id → string[]`. Keys must match `tagTypes[].id` in `config.json`.             |
| `links`      | yes      | array                | List of `{ platform, url }`. See [Platform links](#platform-links-and-icons).                 |
| `sortOrder`  | no       | positive integer     | Lower numbers appear first within their category. See [Sort order](#sort-order).              |

If a required field is missing, that file is **skipped with an error** and the build exits non-zero (other projects still get written).

The markdown **body** (everything after the closing `---`) becomes the project description. Plain text only — formatting is rendered as raw text.

---

## Sort order

Within each category:

1. Projects with a `sortOrder` come first, ascending. Ties are broken alphabetically by `name`.
2. Projects without a `sortOrder` come after, alphabetically by `name`.

Categories themselves render in a fixed order: `personal` first, then `professional` (configurable in `scripts/build-data.ts`).

`sortOrder` must be a **positive integer**. Anything else (zero, negative, decimal, string) prints a warning and is treated as unset. Duplicate `sortOrder` values within the same category print a warning but don't fail the build.

---

## Tag types (filter categories)

A "tag type" is a filter dimension — Engine, Platform, Genre, Graphics, etc. They are defined in `data/config.json`:

```json
"tagTypes": [
  { "id": "engine",   "label": "Engine",   "color": "#4a9eff" },
  { "id": "platform", "label": "Platform", "color": "#50c878" },
  { "id": "genre",    "label": "Genre",    "color": "#e8a043" },
  { "id": "graphics", "label": "Graphics", "color": "#c77dba" }
]
```

- `id` — used as the key in each project's `tags` map. Must be unique.
- `label` — shown on the filter button.
- `color` — hex color used for the chip background and filter button accent.

**Filter semantics:** OR within a tag type, AND across tag types. Selecting `engine: [Unity, Godot]` and `genre: [Action]` matches projects that have `(Unity OR Godot) AND Action`.

The filter bar only displays tag values that are present in the currently visible category — switching tabs rebuilds the bar.

### Adding a new tag type

1. Add an entry to `tagTypes` in `config.json` with a new unique `id`.
2. Use that `id` in any project's `tags` block, e.g. `tags: { mood: [Cozy, Relaxing], ... }`.
3. Run `npm run build:data`.

### Removing a tag type

1. Remove the entry from `tagTypes`.
2. Remove that key from every project's `tags` block (it will simply be ignored if you forget, but it is dead data).
3. Run `npm run build:data`.

---

## Adding a project category

Categories are defined in `data/config.json`. To add a new one (e.g. `freelance`):

1. Add an entry to the `categories` array:
   ```json
   "categories": [
     { "id": "personal",     "label": "Personal" },
     { "id": "professional", "label": "Professional" },
     { "id": "freelance",    "label": "Freelance" }
   ]
   ```
2. Create the matching folder `data/projects/freelance/` and add markdown files.
3. Run `npm run build`.

- `id` — slug used as both the folder name and the tab data attribute. Must match the folder under `data/projects/`.
- `label` — text shown on the tab.
- The order of entries in `categories` controls tab order **and** the order projects render in the **All** tab.

## Removing a project category

Delete the entry from `categories` in `config.json` and (optionally) delete the matching folder under `data/projects/`. Rebuild. If the folder remains but the entry is gone, the projects in it are silently ignored.

---

## Media: images and YouTube

Each project's `media` array becomes a slideshow at the top of the card. Two media types are supported:

```yaml
media:
  - type: image
    src: assets/projects/myproject/cover1.png
  - type: youtube
    videoId: dQw4w9WgXcQ
```

- **Images** — relative path from the site root. PNG, JPG, WebP all work. The slideshow uses `aspect-ratio: 16/9` and `object-fit: cover`, so use 16:9 source images for best results. Use **forward slashes** (`/`) in paths — backslashes won't work in URLs.
- **YouTube** — provide just the video ID (the part after `v=` in a watch URL). Embeds use the `youtube-nocookie.com` domain.

Slideshow behavior:
- Single item: no arrows or dots are rendered.
- Multiple items: arrows appear on hover, dots show below.
- Auto-advance every 5 s, paused while a YouTube slide is showing.

---

## Platform links and icons

The `links` array on each project, and the `socials` array on the profile, both use the same `{ platform, url }` shape. The `platform` value drives both:

- The **icon** rendered next to the label (looked up case-insensitively in `src/utils/icons.ts`).
- The **label text** shown next to the icon (rendered as-is — keep your casing consistent).

Built-in platform icons:

| `platform` | Icon         |
| ---------- | ------------ |
| `github`   | GitHub       |
| `linkedin` | LinkedIn     |
| `itchio`   | itch.io      |
| `steam`    | Steam        |
| `android`  | Google Play  |
| `ios`      | App Store    |
| `web`      | Globe (default fallback) |

Unknown platform values fall back to the generic `web` globe icon. To add a new platform icon, add an entry to the `icons` map in `src/utils/icons.ts`.

---

## Deployment (GitHub Pages)

1. Run `npm run build` locally so `data/projects.json` and `dist/bundle.js` are up to date.
2. Push the repository to GitHub.
3. **Settings → Pages** — set source to the `main` branch, root (`/`).
4. The site will be live at `https://<username>.github.io/<repo>/`.

Both `data/projects.json` and `dist/bundle.js` are build artifacts that the static host needs at runtime, so commit them.

If you use a project page (not a user/organization page), the site lives at a subpath. All links in this template are relative, so it should work out of the box. If you serve from a custom domain, point it at the GitHub Pages site as usual.

### Custom title, favicon, OG image

`index.html` has a hardcoded `<title>` and meta tags — update them to match your name. The template references `assets/favicon.png` and `assets/og-image.png` but does not ship them; add your own files at those paths or remove the tags.

---

## Project layout

```
.
├── index.html                       # Static shell — has #hero, #tab-bar, #filter-bar, #projects-grid mount points
├── css/styles.css                   # All styles (vanilla CSS with custom properties)
├── data/
│   ├── config.json                  # Profile + categories + tagTypes (edit this)
│   ├── projects/
│   │   ├── personal/                # One .md per project, YAML frontmatter + body
│   │   │   └── *.md
│   │   └── professional/
│   │       └── *.md
│   └── projects.json                # GENERATED — do not edit by hand
├── assets/
│   ├── profile.jpg                  # Your avatar
│   └── projects/<slug>/*.png        # Per-project covers/screenshots
├── scripts/
│   └── build-data.ts                # Reads config + markdown, writes projects.json
├── src/
│   ├── main.ts                      # Bootstraps everything; only place that holds mutable state
│   ├── types.ts                     # Shared TS types
│   ├── components/
│   │   ├── hero.ts
│   │   ├── tab-bar.ts
│   │   ├── filter-bar.ts
│   │   ├── project-card.ts
│   │   └── slideshow.ts
│   └── utils/
│       ├── filter.ts                # OR-within / AND-across filter logic
│       └── icons.ts                 # SVG icon registry
├── dist/
│   └── bundle.js                    # GENERATED but committed (so GH Pages can serve it)
├── package.json
└── tsconfig.json
```

---

## Tech stack

- HTML5 + CSS3 (custom properties, grid, sticky positioning)
- TypeScript with `strict` type-checking, bundled via [esbuild](https://esbuild.github.io/) into a single IIFE
- [gray-matter](https://github.com/jonschlinkert/gray-matter) to parse YAML frontmatter
- [tsx](https://github.com/privatenumber/tsx) to run the build script directly
- No runtime frameworks, no client-side router, no CSS preprocessor

---

## NPM scripts

| Script                | What it does                                                  |
| --------------------- | ------------------------------------------------------------- |
| `npm run build:data`  | Regenerate `data/projects.json` from config + markdown files. |
| `npm run build:js`    | Bundle `src/main.ts` into `dist/bundle.js`.                   |
| `npm run build`       | `build:data` then `build:js`.                                 |
| `npm run watch`       | Re-bundle JS on save (does NOT rebuild data).                 |
