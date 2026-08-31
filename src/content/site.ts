import type { SiteConfig } from "./types";

// TODO: replace the email and LinkedIn placeholders with real ones.
export const siteConfig = {
  name: "Adam Fanslau",
  role: "Software Engineer",
  tagline:
    "I design and build cloud platforms, mobile apps, and websites — from first prototype to production.",
  description:
    "Adam Fanslau — software engineer offering cloud, mobile app, and website development. Portfolio, services, and contact.",
  url: "https://fanslau.me",
  email: "hello@fanslau.me",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/adamfanslau",
      platform: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/adamfanslau",
      platform: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:hello@fanslau.me",
      platform: "email",
    },
  ],
  nav: [
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
} satisfies SiteConfig;
