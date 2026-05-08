import { PortfolioData, Project } from "./types";
import { renderHero } from "./components/hero";
import { renderTabBar, TabId } from "./components/tab-bar";
import { renderFilterBar } from "./components/filter-bar";
import { createProjectCard, ProjectCard } from "./components/project-card";
import { filterProjects } from "./utils/filter";

async function init(): Promise<void> {
  const gridEl = document.getElementById("projects-grid")!;

  let data: PortfolioData;
  try {
    const response = await fetch("data/projects.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
  } catch (err) {
    gridEl.innerHTML = `<p class="load-error">Couldn't load portfolio data. Run <code>npm run build</code> and reload.</p>`;
    console.error("Failed to load data/projects.json:", err);
    return;
  }

  document.title = data.profile.name;

  const heroEl = document.getElementById("hero")!;
  const tabEl = document.getElementById("tab-bar")!;
  const filterEl = document.getElementById("filter-bar")!;

  renderHero(heroEl, data.profile);

  let isAnimating = false;
  let activeTab: TabId = "all";
  let activeFilters: Record<string, string[]> = {};
  let activeCards: ProjectCard[] = [];

  function tearDownCards(): void {
    for (const card of activeCards) card.destroy();
    activeCards = [];
  }

  function getVisibleProjects(): Project[] {
    const byCategory = activeTab === "all"
      ? data.projects
      : data.projects.filter(p => p.category === activeTab);
    return filterProjects(byCategory, activeFilters);
  }

  function mountCards(projects: Project[], fadeIn: boolean): void {
    tearDownCards();
    gridEl.innerHTML = "";
    for (const project of projects) {
      const card = createProjectCard(project, data.tagTypes);
      if (fadeIn) card.element.classList.add("fade-out");
      activeCards.push(card);
      gridEl.appendChild(card.element);
    }
    if (fadeIn) {
      void gridEl.offsetHeight;
      gridEl.querySelectorAll(".project-card").forEach(c => c.classList.remove("fade-out"));
    }
  }

  function renderProjects(projects: Project[], animate = false): void {
    if (!animate) {
      mountCards(projects, false);
      return;
    }

    if (isAnimating) return;
    isAnimating = true;

    const existing = gridEl.querySelectorAll(".project-card");
    existing.forEach(card => card.classList.add("fade-out"));

    setTimeout(() => {
      mountCards(projects, true);
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
