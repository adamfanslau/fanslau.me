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
  /**
   * "page" renders as an outlined pill — a separate page, not a section.
   * "cta" renders as the filled call-to-action button.
   */
  kind?: "page" | "cta";
}

export interface ContactCopy {
  /** What to put in the first email. */
  intro: string;
  /** "Worth including" hints shown above the email address. */
  include: string[];
  /** Prefilled subject and body for every mailto: link on the site. */
  email: {
    subject: string;
    /** Use \r\n line breaks so the template survives every mail client. */
    body: string;
  };
  /** "How it works" steps, in order. */
  steps: string[];
  /** Location / remote note under the steps. */
  note: string;
}

/** One `key: value` line printed under `~$ whoami`. */
export interface AboutFact {
  /** Lowercase mono key, e.g. "location", "day job". Scrambled — keep ASCII. */
  key: string;
  value: string;
}

/** One proof figure in the About stats strip. */
export interface AboutStat {
  /** Big figure set in the display face. Not scrambled, so any glyph is fine. */
  value: string;
  /** One short line under the figure. */
  label: string;
}

export interface AboutCopy {
  /** Two-sentence bio; also the summary at the top of /cv. */
  summary: string;
  /** 5–6 whoami lines. */
  facts: AboutFact[];
  /** Exactly four figures, each traceable to experience.ts. */
  stats: AboutStat[];
  /** Figcaption under the profile photo, rendered as a `# comment`. */
  photoCaption: string;
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
  about: AboutCopy;
  /** Short command strings cycled by the terminal-prompt logo (keep ≤16 chars). */
  terminalCommands: string[];
  contact: ContactCopy;
  /** One dry line for the footer's right-hand side. */
  footerNote: string;
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
  /** Plain-English qualifier that completes "Good fit if …". */
  fit: string;
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
