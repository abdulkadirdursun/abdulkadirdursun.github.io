# Game Developer Portfolio Website — Design Document

**Date:** 2026-02-26
**Status:** Approved
**Stack:** Vanilla HTML/CSS + TypeScript, static GitHub Pages deployment

---

## 1. Visual Identity

**Mood:** Dark & muted game studio aesthetic — professional with a game industry feel.

### Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0f1117` | Page background |
| `--bg-secondary` | `#1a1d27` | Card backgrounds, elevated surfaces |
| `--bg-tertiary` | `#242836` | Filter bar, input fields |
| `--text-primary` | `#e2e4ea` | Headings, main text |
| `--text-secondary` | `#8b8fa3` | Descriptions, secondary info |
| `--accent` | `#6c63ff` | Primary accent (muted indigo-violet) |
| `--accent-hover` | `#7f78ff` | Hover states |
| `--tag-engine` | `#4a9eff` | Engine tags (soft blue) |
| `--tag-platform` | `#50c878` | Platform tags (muted green) |
| `--tag-genre` | `#e8a043` | Genre tags (warm amber) |
| `--tag-graphics` | `#c77dba` | Graphics tags (muted purple) |

### Typography

- **Headings:** Space Grotesk (techy sans-serif)
- **Body:** Inter (clean sans-serif)

---

## 2. Page Layout

Single-page design. Three sections stacked vertically:

### Hero / About Section
- Compact, not full-screen
- Avatar on the left, name + short bio + social link buttons on the right
- Social buttons: GitHub, LinkedIn, itch.io, etc. (driven by data)

### Filter Bar
- Sticky when scrolling past it
- Tag chips grouped by type, color-coded to match tag colors
- Toggle chips on/off to filter projects
- "Clear all" button to reset
- Filter logic: AND within the same tag type, OR across different types

### Project Cards Grid
- Responsive: 3 columns (desktop >=1024px), 2 columns (tablet 600-1023px), 1 column (mobile <600px)
- Cards fade in/out subtly when filter selection changes

---

## 3. Project Card Design

Each card contains, top to bottom:

1. **Slideshow area** — Images and inline YouTube embeds
   - Navigation dots at bottom, left/right arrows on edges
   - Images: `object-fit: cover`
   - YouTube: inline `<iframe>`, lazy-loaded when slid into view
   - Auto-advances every 5s on images, pauses on video slides

2. **Game title**

3. **Description** — 2-3 lines max

4. **Tags** — Small colored pills, color-coded by type. Not clickable (filtering is in the filter bar).

5. **Platform links** — Row of icon+label buttons, each opens in a new tab

---

## 4. Data Model

All data in a single `data/projects.json` file.

```json
{
  "profile": {
    "name": "Your Name",
    "bio": "Game developer & designer",
    "avatar": "assets/avatar.png",
    "socials": [
      { "platform": "github", "url": "https://github.com/you" },
      { "platform": "linkedin", "url": "https://linkedin.com/in/you" },
      { "platform": "itchio", "url": "https://you.itch.io" }
    ]
  },
  "tagTypes": [
    { "id": "engine", "label": "Engine", "color": "#4a9eff" },
    { "id": "platform", "label": "Platform", "color": "#50c878" },
    { "id": "genre", "label": "Genre", "color": "#e8a043" },
    { "id": "graphics", "label": "Graphics", "color": "#c77dba" }
  ],
  "projects": [
    {
      "name": "My Game",
      "description": "A short description of the game.",
      "media": [
        { "type": "image", "src": "assets/projects/mygame/1.png" },
        { "type": "youtube", "videoId": "dQw4w9WgXcQ" }
      ],
      "tags": {
        "engine": ["Unity"],
        "platform": ["Steam", "Android"],
        "genre": ["Action"],
        "graphics": ["3D"]
      },
      "links": [
        { "platform": "steam", "url": "https://store.steampowered.com/app/..." },
        { "platform": "android", "url": "https://play.google.com/store/apps/..." }
      ]
    }
  ]
}
```

### Key behaviors:
- **Adding tag types:** Add a new entry to `tagTypes` → a new filter row appears automatically
- **Adding tags:** Use any new string in a project's `tags` → it appears in the filter bar automatically (scanned dynamically from all projects)
- **Adding projects:** Add a new object to the `projects` array

---

## 5. File Structure

```
/
├── index.html
├── css/
│   └── styles.css
├── src/
│   ├── main.ts
│   ├── components/
│   │   ├── hero.ts
│   │   ├── filter-bar.ts
│   │   ├── project-card.ts
│   │   └── slideshow.ts
│   ├── types.ts
│   └── utils/
│       └── filter.ts
├── dist/
│   └── bundle.js
├── data/
│   └── projects.json
├── assets/
│   ├── avatar.png
│   ├── icons/
│   └── projects/
├── tsconfig.json
└── package.json
```

### Build

- **Dev dependencies:** `typescript`, `esbuild` (for module bundling)
- **Build command:** `npm run build` → compile TS + bundle into `dist/bundle.js`
- **Deployment:** `dist/` committed to repo, GitHub Pages serves directly. No CI required.

---

## 6. Responsive Breakpoints

| Breakpoint | Grid Columns |
|------------|-------------|
| >= 1024px (desktop) | 3 |
| 600–1023px (tablet) | 2 |
| < 600px (mobile) | 1 |
