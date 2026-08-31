import type { SiteConfig } from "./types";

export const siteConfig = {
  name: "Adam Fanslau",
  role: "Software Engineer",
  tagline:
    "Full-stack & cloud engineer building cross-platform apps and serverless AWS back-ends — from UI to CI/CD.",
  description:
    "Adam Fanslau — full-stack software engineer in Kerry, Ireland. Cross-platform apps (React Native + Expo), serverless AWS back-ends, CI/CD, and websites.",
  url: "https://fanslau.me",
  email: "adam.fanslau@gmail.com",
  location: "Killarney, County Kerry, Ireland",
  about: [
    "I'm a full-stack software engineer with 4.5+ years of experience building cross-platform applications and serverless cloud back-ends end-to-end — from UI to CI/CD to event-driven AWS infrastructure.",
    "At Net Feasa I built most of the UI and the CI/CD for two production cross-platform apps (React Native + Expo, TypeScript) shipping from a single codebase to iOS, Android, Web, and Windows — including a custom offline-first sync layer — and serverless data pipelines on AWS provisioned with Pulumi. Before that, at eCreation Media, I cut CI pipeline runtime from over an hour to minutes and shipped zero-downtime production deployments for video-industry clients.",
    "I work fluently with AI coding tools — GitHub Copilot and Claude Code — as a force-multiplier on top of solid engineering fundamentals. Based in Killarney, Ireland, and available for freelance work.",
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/adamfanslau",
      platform: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/adam-fanslau",
      platform: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:adam.fanslau@gmail.com",
      platform: "email",
    },
  ],
  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
} satisfies SiteConfig;
