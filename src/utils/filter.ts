import { Project } from "../types";

/**
 * Filter projects: OR within same tag type, AND across different tag types.
 * e.g. { engine: ["Unity", "Godot"], genre: ["Action"] }
 * → project must have (Unity OR Godot) AND (Action)
 */
export function filterProjects(
  projects: Project[],
  activeFilters: Record<string, string[]>
): Project[] {
  const activeTypes = Object.entries(activeFilters).filter(([, tags]) => tags.length > 0);
  if (activeTypes.length === 0) return projects;

  return projects.filter(project =>
    activeTypes.every(([typeId, selectedTags]) => {
      const projectTags = project.tags[typeId] || [];
      return selectedTags.some(tag => projectTags.includes(tag));
    })
  );
}
