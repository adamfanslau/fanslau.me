import type { SiteConfig } from "./types";

export const siteConfig = {
  name: "Adam Fanslau",
  role: "Freelance Software Engineer",
  tagline:
    "I build websites that bring in customers, automate the admin work you're still doing by hand, and run the AWS cloud back-end underneath — for small businesses and tech teams across Ireland.",
  description:
    "Freelance software engineer in Killarney, Kerry. Websites for local businesses, automation of manual work, and AWS cloud & CI/CD for tech teams across Ireland.",
  url: "https://fanslau.me",
  email: "adam.fanslau@gmail.com",
  location: "Killarney, County Kerry, Ireland",
  availability: "Open to a small number of new projects",
  about: [
    "I'm a software engineer in Killarney, Ireland. I help businesses with three things: websites that bring in enquiries, automation that takes repetitive manual work off people's plates, and cloud back-ends on AWS that are reliable and cheap to run. I've done this professionally since 2021, and I take on a small number of freelance projects at a time.",
    "At Net Feasa I lead the UI on two apps that ship to iOS, Android, web and Windows from a single codebase, and I built their release pipeline from scratch, so every change is tested, versioned and deployed without anyone doing it by hand. I also built the serverless AWS pipelines that process telecom billing files and alert the team by email or Teams when something fails.",
    "Before that, at eCreation Media, a consultancy whose clients included Sky, BBC Studios and Virgin Media, I cut a build pipeline from over an hour to a few minutes and made production deployments zero-downtime.",
    "I work directly with you, in plain English, from first call to launch and after. I use AI coding tools every day because they make me faster, and I review and stand behind everything that ships. Based in Killarney, working with clients across Ireland and remotely.",
  ],
  terminalCommands: [
    "build website",
    "automate it",
    "deploy --aws",
    "fix ci-cd",
    "ship it",
  ],
  contact: {
    intro:
      "Tell me what you're trying to get done: a new website, a manual process you'd like to stop doing by hand, or cloud and CI/CD work that needs another pair of hands. A couple of lines is plenty.",
    steps: [
      "I reply within one business day, usually with a few questions.",
      "A short call to understand what you need — no charge.",
      "Scope and price in writing before any work starts.",
      "You own the code, domain and accounts at handover. Ongoing support is optional.",
    ],
    note: "Based in Killarney, Co. Kerry. Happy to meet in person around Kerry; everything else works remotely.",
  },
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
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/#projects" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
    { label: "CV", href: "/cv", kind: "page" },
  ],
} satisfies SiteConfig;
