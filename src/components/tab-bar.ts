import { CategoryDef } from "../types";

export type TabId = "all" | string;

export function renderTabBar(
  container: HTMLElement,
  categories: CategoryDef[],
  onTabChange: (tab: TabId) => void
): void {
  const tabs: Array<{ id: TabId; label: string }> = [
    { id: "all", label: "All" },
    ...categories.map(c => ({ id: c.id, label: c.label })),
  ];

  const nav = document.createElement("div");
  nav.className = "tab-bar-inner";

  let activeTab: TabId = "all";

  for (const tab of tabs) {
    const btn = document.createElement("button");
    btn.className = "tab-btn" + (tab.id === activeTab ? " active" : "");
    btn.textContent = tab.label;
    btn.dataset.tab = tab.id;

    btn.addEventListener("click", () => {
      if (tab.id === activeTab) return;
      activeTab = tab.id;

      nav.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      onTabChange(activeTab);
    });

    nav.appendChild(btn);
  }

  container.innerHTML = "";
  container.appendChild(nav);
}
