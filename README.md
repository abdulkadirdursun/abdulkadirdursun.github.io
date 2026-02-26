# Game Dev Portfolio

A single-page game developer portfolio website. Dark themed, filterable project cards with slideshows, designed for GitHub Pages deployment.

## Setup

```bash
npm install
npm run build
```

## Development

```bash
npm run watch
```

Then open `index.html` in a browser (or use a local server like `npx serve .`).

## Adding Projects

Edit `data/projects.json`:

- **Profile:** Update `profile.name`, `profile.bio`, `profile.avatar`, and `profile.socials`
- **Tag types:** Add entries to `tagTypes` to create new filter categories
- **Projects:** Add objects to the `projects` array with `name`, `description`, `media`, `tags`, and `links`

Media items support `"type": "image"` (with `src` path) and `"type": "youtube"` (with `videoId`).

## Deployment

1. Push to a GitHub repository
2. Go to Settings > Pages
3. Set source to the `main` branch, root directory
4. The site will be live at `https://<username>.github.io/<repo-name>/`

Note: `dist/bundle.js` is committed to the repo so GitHub Pages can serve it directly — no CI build step needed.

## Tech Stack

- HTML5, CSS3 (custom properties, grid)
- TypeScript, bundled with esbuild
- No runtime frameworks — vanilla DOM manipulation
