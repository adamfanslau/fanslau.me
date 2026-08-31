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
  /** Short paragraphs for the About section. */
  about: string[];
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
  kind?: "client" | "professional" | "personal";
  url?: string;
  repoUrl?: string;
  year?: number;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  start: string;
  /** Omitted = Present. */
  end?: string;
  location?: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  credential: string;
  /** e.g. "First Class Honours". */
  detail?: string;
  start: string;
  end: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
}
