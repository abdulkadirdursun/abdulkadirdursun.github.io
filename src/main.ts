import { PortfolioData, Project } from "./types";
import { renderHero } from "./components/hero";
import { renderTabBar, TabId } from "./components/tab-bar";
import { renderFilterBar } from "./components/filter-bar";
import { createProjectCard } from "./components/project-card";
import { filterProjects } from "./utils/filter";

async function init(): Promise<void> {
  const response = await fetch("data/projects.json");
  const data: PortfolioData = await response.json();

  const heroEl = document.getElementById("hero")!;
  const tabEl = document.getElementById("tab-bar")!;
  const filterEl = document.getElementById("filter-bar")!;
  const gridEl = document.getElementById("projects-grid")!;

  renderHero(heroEl, data.profile);

  let isAnimating = false;
  let activeTab: TabId = "all";
  let activeFilters: Record<string, string[]> = {};

  function getVisibleProjects(): Project[] {
    const byCategory = activeTab === "all"
      ? data.projects
      : data.projects.filter(p => p.category === activeTab);
    return filterProjects(byCategory, activeFilters);
  }

  function renderProjects(projects: Project[], animate = false): void {
    if (!animate) {
      gridEl.innerHTML = "";
      for (const project of projects) {
        const card = createProjectCard(project, data.tagTypes);
        gridEl.appendChild(card);
      }
      return;
    }

    if (isAnimating) return;
    isAnimating = true;

    const existing = gridEl.querySelectorAll(".project-card");
    existing.forEach(card => card.classList.add("fade-out"));

    setTimeout(() => {
      gridEl.innerHTML = "";
      for (const project of projects) {
        const card = createProjectCard(project, data.tagTypes);
        card.classList.add("fade-out");
        gridEl.appendChild(card);
      }

      void gridEl.offsetHeight;
      gridEl.querySelectorAll(".project-card").forEach(card => {
        card.classList.remove("fade-out");
      });

      isAnimating = false;
    }, 300);
  }

  function rebuildFilterBar(): void {
    const categoryProjects = activeTab === "all"
      ? data.projects
      : data.projects.filter(p => p.category === activeTab);

    renderFilterBar(filterEl, data.tagTypes, categoryProjects, (filters) => {
      activeFilters = filters;
      renderProjects(getVisibleProjects(), true);
    });
  }

  renderTabBar(tabEl, (tab) => {
    activeTab = tab;
    activeFilters = {};
    rebuildFilterBar();
    renderProjects(getVisibleProjects(), true);
  });

  rebuildFilterBar();
  renderProjects(data.projects);
}

init();
