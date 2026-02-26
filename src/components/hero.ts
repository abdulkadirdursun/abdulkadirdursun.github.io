import { Profile } from "../types";
import { getIcon } from "../utils/icons";

export function renderHero(container: HTMLElement, profile: Profile): void {
  container.innerHTML = `
    <div class="hero-content">
      <img class="hero-avatar" src="${profile.avatar}" alt="${profile.name}" />
      <div class="hero-info">
        <h1>${profile.name}</h1>
        <p>${profile.bio}</p>
        <div class="hero-socials">
          ${profile.socials.map(s => `
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
