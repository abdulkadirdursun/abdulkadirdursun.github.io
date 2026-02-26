import { Project, TagType } from "../types";
import { createSlideshow } from "./slideshow";
import { getIcon } from "../utils/icons";

export function createProjectCard(project: Project, tagTypes: TagType[]): HTMLElement {
  const card = document.createElement("article");
  card.className = "project-card";

  const mediaWrapper = document.createElement("div");
  mediaWrapper.className = "media-wrapper";

  const slideshow = createSlideshow(project.media);
  mediaWrapper.appendChild(slideshow);

  const statusLabels: Record<string, string> = {
    "published": "Published",
    "cancelled": "Cancelled",
    "prototype": "Prototype",
    "in-development": "In Development",
  };

  const badge = document.createElement("span");
  badge.className = `status-badge status-${project.status}`;
  badge.textContent = statusLabels[project.status] || project.status;
  mediaWrapper.appendChild(badge);

  card.appendChild(mediaWrapper);

  // Title
  const title = document.createElement("h2");
  title.textContent = project.name;
  card.appendChild(title);

  // Description
  const desc = document.createElement("p");
  desc.className = "project-desc";
  desc.textContent = project.description;
  card.appendChild(desc);

  // Tags
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

  // Platform links
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
