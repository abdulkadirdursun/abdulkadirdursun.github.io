"use strict";
(() => {
  // src/utils/icons.ts
  var icons = {
    github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    itchio: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.13 1.338C2.08 1.96.02 4.328 0 4.95v1.03c0 1.303 1.22 2.45 2.325 2.45 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.07 2.41 2.4 2.41 1.328 0 2.362-1.102 2.362-2.41 0 1.308 1.137 2.41 2.466 2.41h.024c1.33 0 2.466-1.102 2.466-2.41 0 1.308 1.034 2.41 2.363 2.41 1.33 0 2.4-1.102 2.4-2.41 0 1.308 1.106 2.41 2.435 2.41C22.78 8.43 24 7.282 24 5.98V4.95c-.02-.62-2.082-2.99-3.13-3.612-3.253-.114-5.508-.134-8.87-.133-3.362 0-7.945.053-8.87.133zm6.376 6.477a2.74 2.74 0 01-.468.602c-.5.49-1.19.795-1.947.795a2.786 2.786 0 01-1.95-.795c-.182-.178-.32-.37-.446-.59-.127.222-.303.412-.486.59a2.788 2.788 0 01-1.95.795c-.092 0-.187-.025-.264-.052-.107 1.113-.152 2.176-.168 2.95v.005l-.006 1.167c.02 2.334-.23 7.564 1.03 8.85 1.952.454 5.545.662 9.15.663 3.605 0 7.198-.21 9.15-.664 1.26-1.284 1.01-6.514 1.03-8.848l-.006-1.167v-.004c-.016-.775-.06-1.838-.168-2.95-.077.026-.172.052-.263.052a2.788 2.788 0 01-1.95-.795c-.184-.178-.36-.368-.486-.59-.127.22-.265.412-.447.59a2.786 2.786 0 01-1.95.794c-.76 0-1.446-.303-1.948-.793a2.74 2.74 0 01-.468-.602 2.738 2.738 0 01-.463.602 2.787 2.787 0 01-1.95.794h-.16a2.787 2.787 0 01-1.95-.793 2.738 2.738 0 01-.464-.602zm-2.004 2.59v.002c.795.002 1.5 0 2.373.953.687-.072 1.406-.108 2.125-.107.72 0 1.438.035 2.125.107.873-.953 1.578-.95 2.372-.953.376 0 1.876 0 2.92 2.934l1.123 4.028c.832 2.995-.266 3.068-1.636 3.07-2.03-.075-3.156-1.55-3.156-3.025-1.124.184-2.436.276-3.748.277-1.312 0-2.624-.093-3.748-.277 0 1.475-1.125 2.95-3.156 3.026-1.37-.004-2.468-.077-1.636-3.072l1.122-4.027c1.045-2.934 2.545-2.934 2.92-2.934zM12 12.714c-.002.002-2.14 1.964-2.523 2.662l1.4-.056v1.22c0 .056.56.033 1.123.007.562.026 1.124.05 1.124-.008v-1.22l1.4.055C14.138 14.677 12 12.713 12 12.713z"/></svg>`,
    steam: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.002.188.006l2.861-4.142V8.91a3.817 3.817 0 013.813-3.813 3.817 3.817 0 013.813 3.813 3.817 3.817 0 01-3.813 3.813c-.025 0-.049 0-.075-.001l-4.076 2.911c.004.052.006.105.006.158 0 2.858-2.326 5.184-5.184 5.184-2.573 0-4.721-1.881-5.126-4.342L.153 15.185C1.46 20.235 6.293 24 11.979 24c6.627 0 12-5.373 12-12s-5.373-12-12-12zM7.006 18.615l-1.452-.6a2.612 2.612 0 004.86-1.346c0-1.441-1.173-2.613-2.613-2.613-.296 0-.58.05-.846.142l1.5.621a1.924 1.924 0 11-1.449 3.796zm8.209-7.793a2.545 2.545 0 01-2.542-2.542 2.545 2.545 0 012.542-2.542 2.545 2.545 0 012.542 2.542 2.545 2.545 0 01-2.542 2.542z"/></svg>`,
    android: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.341a.996.996 0 100-1.992.996.996 0 000 1.992zm-11.046 0a.996.996 0 100-1.992.996.996 0 000 1.992zm11.405-6.02l1.997-3.46a.416.416 0 00-.152-.567.416.416 0 00-.568.152L17.137 8.95a12.226 12.226 0 00-5.137-1.11c-1.834 0-3.554.4-5.137 1.11L4.84 5.446a.416.416 0 00-.568-.152.416.416 0 00-.152.567l1.997 3.46C2.688 11.188.343 14.658 0 18.761h24c-.344-4.103-2.689-7.573-6.118-9.44z"/></svg>`,
    ios: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>`,
    web: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`
  };
  function getIcon(platform) {
    return icons[platform.toLowerCase()] || icons.web;
  }

  // src/components/hero.ts
  function renderHero(container, profile) {
    container.innerHTML = `
    <div class="hero-content">
      <img class="hero-avatar" src="${profile.avatar}" alt="${profile.name}" />
      <div class="hero-info">
        <h1>${profile.name}</h1>
        <p>${profile.bio}</p>
        <div class="hero-socials">
          ${profile.socials.map((s) => `
            <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-btn" data-platform="${s.platform}">
              ${getIcon(s.platform)}
              <span>${s.platform}</span>
            </a>
          `).join("")}
        </div>
      </div>
    </div>
  `;
  }

  // src/components/tab-bar.ts
  var TABS = [
    { id: "all", label: "All" },
    { id: "personal", label: "Personal" },
    { id: "professional", label: "Professional" }
  ];
  function renderTabBar(container, onTabChange) {
    const nav = document.createElement("div");
    nav.className = "tab-bar-inner";
    let activeTab = "all";
    for (const tab of TABS) {
      const btn = document.createElement("button");
      btn.className = "tab-btn" + (tab.id === activeTab ? " active" : "");
      btn.textContent = tab.label;
      btn.dataset.tab = tab.id;
      btn.addEventListener("click", () => {
        if (tab.id === activeTab)
          return;
        activeTab = tab.id;
        nav.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        onTabChange(activeTab);
      });
      nav.appendChild(btn);
    }
    container.innerHTML = "";
    container.appendChild(nav);
  }

  // src/components/filter-bar.ts
  function renderFilterBar(container, tagTypes, projects, onFilterChange) {
    const tagsPerType = {};
    for (const tt of tagTypes) {
      tagsPerType[tt.id] = /* @__PURE__ */ new Set();
    }
    for (const project of projects) {
      for (const tt of tagTypes) {
        const tags = project.tags[tt.id] || [];
        for (const tag of tags) {
          tagsPerType[tt.id].add(tag);
        }
      }
    }
    const activeFilters = {};
    for (const tt of tagTypes) {
      activeFilters[tt.id] = [];
    }
    let openTypeId = null;
    const inner = document.createElement("div");
    inner.className = "filter-bar-inner";
    const btnRow = document.createElement("div");
    btnRow.className = "filter-type-row";
    const typeButtons = {};
    for (const tt of tagTypes) {
      const sortedTags = Array.from(tagsPerType[tt.id]).sort();
      if (sortedTags.length === 0)
        continue;
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
    const panel = document.createElement("div");
    panel.className = "filter-panel";
    inner.appendChild(panel);
    function updateTypeButtons() {
      for (const tt of tagTypes) {
        const btn = typeButtons[tt.id];
        if (!btn)
          continue;
        const isOpen = openTypeId === tt.id;
        btn.classList.toggle("open", isOpen);
        const hasActive = activeFilters[tt.id].length > 0;
        btn.classList.toggle("has-filters", hasActive);
        const badge = btn.querySelector(".filter-badge");
        if (badge) {
          badge.textContent = hasActive ? String(activeFilters[tt.id].length) : "";
        }
      }
    }
    function updatePanel() {
      panel.innerHTML = "";
      if (!openTypeId) {
        panel.classList.remove("open");
        return;
      }
      const tt = tagTypes.find((t) => t.id === openTypeId);
      if (!tt)
        return;
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

  // src/components/slideshow.ts
  function createSlideshow(media) {
    const container = document.createElement("div");
    container.className = "slideshow";
    const track = document.createElement("div");
    track.className = "slides-track";
    for (const item of media) {
      const slide = document.createElement("div");
      slide.className = "slide";
      if (item.type === "image" && item.src) {
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = "";
        img.loading = "lazy";
        slide.appendChild(img);
      } else if (item.type === "youtube" && item.videoId) {
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube-nocookie.com/embed/${item.videoId}`;
        iframe.loading = "lazy";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        slide.appendChild(iframe);
      }
      track.appendChild(slide);
    }
    container.appendChild(track);
    if (media.length <= 1)
      return container;
    let current = 0;
    let autoTimer = null;
    function goTo(index) {
      current = (index + media.length) % media.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === current));
      if (media[current].type === "youtube") {
        stopAuto();
      } else {
        startAuto();
      }
    }
    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => goTo(current + 1), 5e3);
    }
    function stopAuto() {
      if (autoTimer !== null) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }
    const prevBtn = document.createElement("button");
    prevBtn.className = "slideshow-arrow prev";
    prevBtn.innerHTML = `<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M10.354 3.354a.5.5 0 00-.708-.708l-5 5a.5.5 0 000 .708l5 5a.5.5 0 00.708-.708L5.707 8l4.647-4.646z"/></svg>`;
    prevBtn.addEventListener("click", () => goTo(current - 1));
    const nextBtn = document.createElement("button");
    nextBtn.className = "slideshow-arrow next";
    nextBtn.innerHTML = `<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M5.646 3.354a.5.5 0 01.708-.708l5 5a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708L10.293 8 5.646 3.354z"/></svg>`;
    nextBtn.addEventListener("click", () => goTo(current + 1));
    container.appendChild(prevBtn);
    container.appendChild(nextBtn);
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "slideshow-dots";
    const dots = [];
    for (let i = 0; i < media.length; i++) {
      const dot = document.createElement("button");
      dot.className = "slideshow-dot";
      if (i === 0)
        dot.classList.add("active");
      dot.addEventListener("click", () => goTo(i));
      dots.push(dot);
      dotsContainer.appendChild(dot);
    }
    container.appendChild(dotsContainer);
    if (media[0].type !== "youtube") {
      startAuto();
    }
    return container;
  }

  // src/components/project-card.ts
  function createProjectCard(project, tagTypes) {
    const card = document.createElement("article");
    card.className = "project-card";
    const mediaWrapper = document.createElement("div");
    mediaWrapper.className = "media-wrapper";
    const slideshow = createSlideshow(project.media);
    mediaWrapper.appendChild(slideshow);
    const statusLabels = {
      "published": "Published",
      "cancelled": "Cancelled",
      "prototype": "Prototype",
      "in-development": "In Development"
    };
    const badge = document.createElement("span");
    badge.className = `status-badge status-${project.status}`;
    badge.textContent = statusLabels[project.status] || project.status;
    mediaWrapper.appendChild(badge);
    card.appendChild(mediaWrapper);
    const title = document.createElement("h2");
    title.textContent = project.name;
    card.appendChild(title);
    const desc = document.createElement("p");
    desc.className = "project-desc";
    desc.textContent = project.description;
    card.appendChild(desc);
    const tagsContainer = document.createElement("div");
    tagsContainer.className = "project-tags";
    for (const tagType of tagTypes) {
      const projectTags = project.tags[tagType.id] || [];
      for (const tag of projectTags) {
        const chip = document.createElement("span");
        chip.className = "tag";
        chip.dataset.tagType = tagType.id;
        chip.textContent = tag;
        chip.style.setProperty("--tag-color", tagType.color);
        tagsContainer.appendChild(chip);
      }
    }
    card.appendChild(tagsContainer);
    const linksContainer = document.createElement("div");
    linksContainer.className = "project-links";
    for (const link of project.links) {
      const a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "platform-link";
      a.dataset.platform = link.platform;
      a.innerHTML = `${getIcon(link.platform)}<span>${link.platform}</span>`;
      linksContainer.appendChild(a);
    }
    card.appendChild(linksContainer);
    return card;
  }

  // src/utils/filter.ts
  function filterProjects(projects, activeFilters) {
    const activeTypes = Object.entries(activeFilters).filter(([, tags]) => tags.length > 0);
    if (activeTypes.length === 0)
      return projects;
    return projects.filter(
      (project) => activeTypes.every(([typeId, selectedTags]) => {
        const projectTags = project.tags[typeId] || [];
        return selectedTags.some((tag) => projectTags.includes(tag));
      })
    );
  }

  // src/main.ts
  async function init() {
    const response = await fetch("data/projects.json");
    const data = await response.json();
    const heroEl = document.getElementById("hero");
    const tabEl = document.getElementById("tab-bar");
    const filterEl = document.getElementById("filter-bar");
    const gridEl = document.getElementById("projects-grid");
    renderHero(heroEl, data.profile);
    let isAnimating = false;
    let activeTab = "all";
    let activeFilters = {};
    function getVisibleProjects() {
      const byCategory = activeTab === "all" ? data.projects : data.projects.filter((p) => p.category === activeTab);
      return filterProjects(byCategory, activeFilters);
    }
    function renderProjects(projects, animate = false) {
      if (!animate) {
        gridEl.innerHTML = "";
        for (const project of projects) {
          const card = createProjectCard(project, data.tagTypes);
          gridEl.appendChild(card);
        }
        return;
      }
      if (isAnimating)
        return;
      isAnimating = true;
      const existing = gridEl.querySelectorAll(".project-card");
      existing.forEach((card) => card.classList.add("fade-out"));
      setTimeout(() => {
        gridEl.innerHTML = "";
        for (const project of projects) {
          const card = createProjectCard(project, data.tagTypes);
          card.classList.add("fade-out");
          gridEl.appendChild(card);
        }
        void gridEl.offsetHeight;
        gridEl.querySelectorAll(".project-card").forEach((card) => {
          card.classList.remove("fade-out");
        });
        isAnimating = false;
      }, 300);
    }
    function rebuildFilterBar() {
      const categoryProjects = activeTab === "all" ? data.projects : data.projects.filter((p) => p.category === activeTab);
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
})();
