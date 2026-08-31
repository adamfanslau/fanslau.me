export interface SocialLink {
  label: string;
  /** Full URL, or a mailto: address. */
  href: string;
  platform: "github" | "linkedin" | "email";
}

export interface SiteConfig {
  name: string;
  role: string;
  /** Hero one-liner. */
  tagline: string;
  /** Meta description, ~150 chars. */
  description: string;
  url: string;
  email: string;
  location?: string;
  socials: SocialLink[];
  nav: { label: string; href: `#${string}` }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  highlights?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  url?: string;
  repoUrl?: string;
  year?: number;
}

export interface SkillCategory {
  category: string;
  items: string[];
}
