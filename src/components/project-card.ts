import { Project, TagType, STATUS_LABELS } from "../types";
import { createSlideshow } from "./slideshow";
import { createIconNode } from "../utils/icons";

export interface ProjectCard {
  element: HTMLElement;
  destroy: () => void;
}

export function createProjectCard(project: Project, tagTypes: TagType[]): ProjectCard {
  const card = document.createElement("article");
  card.className = "project-card";

  const mediaWrapper = document.createElement("div");
  mediaWrapper.className = "media-wrapper";

  const slideshow = createSlideshow(project.media);
  mediaWrapper.appendChild(slideshow.element);

  const badge = document.createElement("span");
  badge.className = `status-badge status-${project.status}`;
  badge.textContent = STATUS_LABELS[project.status] || project.status;
  mediaWrapper.appendChild(badge);

  card.appendChild(mediaWrapper);

  const title = document.createElement("h2");
  title.textContent = project.name;
  card.appendChild(title);

  const descSlot = document.createElement("div");
  descSlot.className = "desc-slot";
  const desc = document.createElement("div");
  desc.className = "project-desc";
  desc.innerHTML = project.description;
  descSlot.appendChild(desc);
  card.appendChild(descSlot);

  const COLLAPSED_MAX_EM = 8;
  const checkOverflow = (): void => {
    const fontSizePx = parseFloat(getComputedStyle(desc).fontSize);
    const limitPx = COLLAPSED_MAX_EM * fontSizePx;
    desc.classList.toggle("is-overflowing", desc.scrollHeight > limitPx + 1);
  };
  let prevWidth = -1;
  const descObserver = new ResizeObserver((entries) => {
    const width = entries[0].contentRect.width;
    if (Math.abs(width - prevWidth) < 0.5) return;
    prevWidth = width;
    checkOverflow();
  });
  descObserver.observe(desc);
  if (document.fonts?.ready) {
    document.fonts.ready.then(checkOverflow);
  }

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

    a.appendChild(createIconNode(link.platform));

    const label = document.createElement("span");
    label.textContent = link.platform;
    a.appendChild(label);

    linksContainer.appendChild(a);
  }
  card.appendChild(linksContainer);

  return {
    element: card,
    destroy: () => {
      descObserver.disconnect();
      slideshow.destroy();
    },
  };
}
