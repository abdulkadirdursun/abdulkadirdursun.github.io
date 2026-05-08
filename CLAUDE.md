# Portfolio Website

This project is for my personal portfolio website design. I'm a Unity game developer and i present the projects I worked in this website.

## Architecture

### Two-stage build

The README states that projects are edited in `data/projects.json` — that is **out of date**. The actual authoring flow is:

1. Each project is a markdown file with YAML frontmatter under `data/projects/<category>/<slug>.md`. Categories are hardcoded to `personal` and `professional` in `scripts/build-data.ts`.
2. Profile and `tagTypes` live in `data/config.json`.
3. `scripts/build-data.ts` (run via `tsx`) reads config + all per-project markdown, validates required frontmatter (`name`, `status`, `media`, `tags`, `links`), applies sort, and emits a single `data/projects.json`. The markdown body becomes `description`.
4. `src/main.ts` fetches that JSON at runtime and renders into the static shell in `index.html` (`#hero`, `#tab-bar`, `#filter-bar`, `#projects-grid`).

Because of this split, `data/projects.json` is a **build artifact** — do not edit it by hand; it will be overwritten. `dist/bundle.js` is similarly an artifact but is committed so GitHub Pages can serve it without CI.

### Sort semantics (build-data.ts)

Projects are grouped by category in the order `["personal", "professional"]`. Within a category: items with `sortOrder` come first (ascending, ties broken by name); items without come after, alphabetically. `sortOrder` must be a positive integer or it's silently dropped with a warning. Duplicate `sortOrder` values within a category produce a warning but do not fail the build. Missing required frontmatter fields cause that file to be skipped and the build to exit non-zero (other projects still write).

### Filter semantics (utils/filter.ts)

Tag filtering is **OR within a tag type, AND across tag types**. E.g. selecting Unity + Godot under `engine` and Action under `genre` matches projects with `(Unity OR Godot) AND Action`. The filter bar (`components/filter-bar.ts`) is rebuilt whenever the active tab changes so it only shows tag values present in the currently visible category.

### Rendering

No framework — vanilla DOM via `document.createElement`. `main.ts` is the orchestrator and owns the only mutable state (`activeTab`, `activeFilters`, `isAnimating`). The fade transition in `renderProjects` is a 300ms `setTimeout` that must match the CSS `.fade-out` transition; changing one requires changing the other.

Tag chip colors come from `tagTypes[].color` in `config.json` and are applied via the `--tag-color` CSS custom property on each chip. Adding a new tag type requires adding it to `config.json`; project frontmatter can then reference its `id` under `tags:`.

## Working in this repo

- This is a local project folder, not a git repo. Do not create commits.
- After any change under `data/` or `src/`, run the appropriate build script — there is no dev server that does it automatically.
- When adding a new project category beyond `personal`/`professional`, both `scripts/build-data.ts` (`CATEGORIES` constant) and `src/components/tab-bar.ts` need updates, and the `ProjectCategory` union in `src/types.ts`.
