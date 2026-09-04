export interface SocialLink {
  label: string;
  /** Full URL, or a mailto: address. */
  href: string;
  platform: "github" | "linkedin" | "email";
}

export interface NavItem {
  label: string;
  /** Root-relative so it works from every route: "/#services" or "/cv". */
  href: `/${string}`;
  /** "page" renders as an outlined pill — a separate page, not a section. */
  kind?: "page";
}

export interface ContactCopy {
  /** What to put in the first email. */
  intro: string;
  /** "How it works" steps, in order. */
  steps: string[];
  /** Location / remote note under the steps. */
  note: string;
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
  /** Status-chip text shown in the hero and Contact panel. */
  availability: string;
  /** Short paragraphs for the About section. */
  about: string[];
  /** Short command strings cycled by the terminal-prompt logo (keep ≤16 chars). */
  terminalCommands: string[];
  contact: ContactCopy;
  socials: SocialLink[];
  nav: NavItem[];
}

export type ServiceIcon = "web" | "automation" | "cloud";

export interface Service {
  id: string;
  title: string;
  /** One or two words for the hero tiles, e.g. "Websites". */
  short: string;
  description: string;
  icon: ServiceIcon;
  highlights?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  kind?: "client" | "professional" | "personal";
  url?: string;
  /** Link text for `url` (default "Live site"). */
  urlLabel?: string;
  repoUrl?: string;
  year?: number;
  /** Screenshot under public/, e.g. "/projects/bug-blaster.png". */
  image?: string;
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
