import { ProjectCategory } from "../types";

export type TabId = "all" | ProjectCategory;

interface Tab {
  id: TabId;
  label: string;
}

const TABS: Tab[] = [
  { id: "all", label: "All" },
  { id: "personal", label: "Personal" },
  { id: "professional", label: "Professional" },
];

export function renderTabBar(
  container: HTMLElement,
  onTabChange: (tab: TabId) => void
): void {
  const nav = document.createElement("div");
  nav.className = "tab-bar-inner";

  let activeTab: TabId = "all";

  for (const tab of TABS) {
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
