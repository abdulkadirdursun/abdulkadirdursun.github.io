# Filter Bar Dropdown Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace vertically stacked filter rows with horizontal type buttons that open an inline dropdown panel (accordion-style, one at a time).

**Architecture:** Rewrite `filter-bar.ts` DOM generation to produce a button row + a single shared panel container. CSS handles layout, transitions, and active states. Filter logic (`filter.ts`) and `main.ts` interface unchanged.

**Tech Stack:** TypeScript (vanilla DOM), CSS transitions. No test framework available — verify via `npm run build` + browser.

---

### Task 1: Rewrite filter-bar.ts — horizontal type buttons + dropdown panel

**Files:**
- Modify: `src/components/filter-bar.ts` (full rewrite, lines 1–91)

**Step 1: Replace the entire file with the new implementation**

```typescript
import { TagType, Project } from "../types";

export function renderFilterBar(
  container: HTMLElement,
  tagTypes: TagType[],
  projects: Project[],
  onFilterChange: (activeFilters: Record<string, string[]>) => void
): void {
  // Collect unique tags per type from projects
  const tagsPerType: Record<string, Set<string>> = {};
  for (const tt of tagTypes) {
    tagsPerType[tt.id] = new Set();
  }
  for (const project of projects) {
    for (const tt of tagTypes) {
      const tags = project.tags[tt.id] || [];
      for (const tag of tags) {
        tagsPerType[tt.id].add(tag);
      }
    }
  }

  const activeFilters: Record<string, string[]> = {};
  for (const tt of tagTypes) {
    activeFilters[tt.id] = [];
  }

  let openTypeId: string | null = null;

  const inner = document.createElement("div");
  inner.className = "filter-bar-inner";

  // === Type buttons row ===
  const btnRow = document.createElement("div");
  btnRow.className = "filter-type-row";

  const typeButtons: Record<string, HTMLButtonElement> = {};

  for (const tt of tagTypes) {
    const sortedTags = Array.from(tagsPerType[tt.id]).sort();
    if (sortedTags.length === 0) continue;

    const btn = document.createElement("button");
    btn.className = "filter-type-btn";
    btn.dataset.typeId = tt.id;
    btn.style.setProperty("--type-color", tt.color);

    const labelSpan = document.createElement("span");
    labelSpan.textContent = tt.label;
    btn.appendChild(labelSpan);

    const badge = document.createElement("span");
    badge.className = "filter-badge";
    btn.appendChild(badge);

    const arrow = document.createElement("span");
    arrow.className = "filter-arrow";
    arrow.textContent = "\u25BE"; // ▾
    btn.appendChild(arrow);

    btn.addEventListener("click", () => {
      if (openTypeId === tt.id) {
        openTypeId = null;
      } else {
        openTypeId = tt.id;
      }
      updatePanel();
      updateTypeButtons();
    });

    typeButtons[tt.id] = btn;
    btnRow.appendChild(btn);
  }

  // Clear all button
  const clearBtn = document.createElement("button");
  clearBtn.className = "clear-btn";
  clearBtn.textContent = "Clear all";
  clearBtn.addEventListener("click", () => {
    for (const tt of tagTypes) {
      activeFilters[tt.id] = [];
    }
    updatePanel();
    updateTypeButtons();
    onFilterChange(activeFilters);
  });
  btnRow.appendChild(clearBtn);

  inner.appendChild(btnRow);

  // === Dropdown panel (shared, shows chips for the open type) ===
  const panel = document.createElement("div");
  panel.className = "filter-panel";
  inner.appendChild(panel);

  function updateTypeButtons(): void {
    for (const tt of tagTypes) {
      const btn = typeButtons[tt.id];
      if (!btn) continue;

      const isOpen = openTypeId === tt.id;
      btn.classList.toggle("open", isOpen);

      const hasActive = activeFilters[tt.id].length > 0;
      btn.classList.toggle("has-filters", hasActive);

      const badge = btn.querySelector(".filter-badge") as HTMLElement;
      if (badge) {
        badge.textContent = hasActive ? String(activeFilters[tt.id].length) : "";
      }
    }
  }

  function updatePanel(): void {
    panel.innerHTML = "";

    if (!openTypeId) {
      panel.classList.remove("open");
      return;
    }

    const tt = tagTypes.find(t => t.id === openTypeId);
    if (!tt) return;

    const sortedTags = Array.from(tagsPerType[tt.id]).sort();

    for (const tag of sortedTags) {
      const chip = document.createElement("button");
      chip.className = "filter-chip";
      if (activeFilters[tt.id].includes(tag)) {
        chip.classList.add("active");
      }
      chip.textContent = tag;
      chip.dataset.tagType = tt.id;
      chip.dataset.tagValue = tag;
      chip.style.setProperty("--chip-color", tt.color);

      chip.addEventListener("click", () => {
        const idx = activeFilters[tt.id].indexOf(tag);
        if (idx >= 0) {
          activeFilters[tt.id].splice(idx, 1);
          chip.classList.remove("active");
        } else {
          activeFilters[tt.id].push(tag);
          chip.classList.add("active");
        }
        updateTypeButtons();
        onFilterChange(activeFilters);
      });

      panel.appendChild(chip);
    }

    panel.classList.add("open");
  }

  container.innerHTML = "";
  container.appendChild(inner);
  updateTypeButtons();
}
```

**Step 2: Build to verify no compile errors**

Run: `npm run build`
Expected: Compiles with no errors.

**Step 3: Commit**

```bash
git add src/components/filter-bar.ts
git commit -m "feat: rewrite filter-bar to horizontal type buttons with dropdown panel"
```

---

### Task 2: Replace filter CSS styles

**Files:**
- Modify: `css/styles.css` (lines 155–233 — the `#filter-bar` through `.clear-btn:hover` block)

**Step 1: Replace the filter CSS block (lines 155–233) with the new styles**

Remove everything from `#filter-bar {` through `.clear-btn:hover {` (inclusive) and replace with:

```css
/* ===== Filter Bar ===== */
#filter-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--bg-tertiary);
  padding: 12px 24px;
}

.filter-bar-inner {
  max-width: 1200px;
  margin: 0 auto;
}

/* --- Type button row --- */
.filter-type-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-type-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 8px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.filter-type-btn:hover {
  color: var(--text-primary);
  border-color: var(--type-color, var(--accent));
}

.filter-type-btn.open {
  background: var(--type-color, var(--accent));
  color: #fff;
  border-color: transparent;
}

.filter-type-btn.has-filters:not(.open) {
  border-color: var(--type-color, var(--accent));
  color: var(--text-primary);
}

.filter-arrow {
  font-size: 0.75rem;
  transition: transform 0.2s;
}

.filter-type-btn.open .filter-arrow {
  transform: rotate(180deg);
}

.filter-badge {
  font-size: 0.7rem;
  min-width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 8px;
  background: var(--type-color, var(--accent));
  color: #fff;
}

.filter-badge:empty {
  display: none;
}

.filter-type-btn.open .filter-badge {
  background: rgba(255, 255, 255, 0.25);
}

/* --- Dropdown panel --- */
.filter-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.25s ease, padding 0.25s ease;
  padding: 0;
}

.filter-panel.open {
  max-height: 200px;
  padding-top: 12px;
}

/* --- Chips (unchanged behavior) --- */
.filter-chip {
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.825rem;
  font-weight: 500;
  background: var(--bg-tertiary);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
  color: var(--text-primary);
}

.filter-chip:hover {
  border-color: var(--chip-color, var(--accent));
}

.filter-chip.active {
  background: var(--chip-color, var(--accent));
  color: #fff;
}

/* --- Clear button --- */
.clear-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.8rem;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: color 0.2s;
}

.clear-btn:hover {
  color: var(--text-primary);
}
```

**Step 2: Build and verify**

Run: `npm run build`
Expected: Compiles with no errors.

**Step 3: Visual verification in browser**

Open `index.html` (or dev server) and verify:
- Filter types appear as horizontal buttons
- Clicking a type opens a chip panel below
- Clicking another type closes the first, opens the second
- Clicking the same type closes the panel
- Chips toggle on/off correctly, badge counts update
- "Clear all" resets everything
- Active filters show badge + border when panel is closed

**Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: update filter CSS for horizontal dropdown layout"
```
