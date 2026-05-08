import { Profile } from "../types";
import { createIconNode } from "../utils/icons";

export function renderHero(container: HTMLElement, profile: Profile): void {
  container.innerHTML = "";

  const content = document.createElement("div");
  content.className = "hero-content";

  const avatar = document.createElement("img");
  avatar.className = "hero-avatar";
  avatar.src = profile.avatar;
  avatar.alt = profile.name;
  content.appendChild(avatar);

  const info = document.createElement("div");
  info.className = "hero-info";

  const name = document.createElement("h1");
  name.textContent = profile.name;
  info.appendChild(name);

  const bio = document.createElement("p");
  bio.textContent = profile.bio;
  info.appendChild(bio);

  const socials = document.createElement("div");
  socials.className = "hero-socials";
  for (const s of profile.socials) {
    const link = document.createElement("a");
    link.href = s.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "social-btn";
    link.dataset.platform = s.platform;

    link.appendChild(createIconNode(s.platform));

    const label = document.createElement("span");
    label.textContent = s.platform;
    link.appendChild(label);

    socials.appendChild(link);
  }
  info.appendChild(socials);

  content.appendChild(info);
  container.appendChild(content);
}
