export interface Social {
  platform: string;
  url: string;
}

export interface Profile {
  name: string;
  bio: string;
  avatar: string;
  socials: Social[];
}

export interface CategoryDef {
  id: string;
  label: string;
}

export interface TagType {
  id: string;
  label: string;
  color: string;
}

export interface MediaItem {
  type: "image" | "youtube";
  src?: string;
  videoId?: string;
}

export interface ProjectLink {
  platform: string;
  url: string;
}

export type ProjectCategory = string;

export const STATUS_LABELS = {
  "published": "Published",
  "cancelled": "Cancelled",
  "prototype": "Prototype",
  "in-development": "In Development",
} as const;

export type ProjectStatus = keyof typeof STATUS_LABELS;

export interface Project {
  name: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  media: MediaItem[];
  tags: Record<string, string[]>;
  links: ProjectLink[];
}

export interface PortfolioData {
  profile: Profile;
  categories: CategoryDef[];
  tagTypes: TagType[];
  projects: Project[];
}
