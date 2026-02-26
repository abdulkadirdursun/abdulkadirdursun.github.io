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
    arrow.textContent = "\u25BE";
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
