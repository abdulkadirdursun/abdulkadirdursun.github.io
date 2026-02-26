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

export type ProjectCategory = "personal" | "professional";

export type ProjectStatus = "published" | "cancelled" | "prototype" | "in-development";

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
  tagTypes: TagType[];
  projects: Project[];
}
