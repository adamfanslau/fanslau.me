import type { SiteConfig } from "./types";

export const siteConfig = {
  name: "Adam Fanslau",
  role: "Freelance Software Engineer",
  tagline:
    "Websites that win customers, automation that clears the admin, and AWS back-ends that just run — for small businesses and tech teams across Ireland.",
  description:
    "Freelance software engineer in Killarney, Kerry. Websites for local businesses, automation of manual work, and AWS cloud & CI/CD for tech teams across Ireland.",
  url: "https://fanslau.me",
  email: "adam.fanslau@gmail.com",
  location: "Killarney, County Kerry, Ireland",
  availability: "Open to a small number of new projects",
  about: {
    summary:
      "Software engineer in Killarney, Ireland, shipping production code since 2021: websites that bring in enquiries, automation that takes repetitive work off people's plates, and serverless AWS back-ends that are reliable and cheap to run. I take on a small number of freelance projects at a time and work with you directly, in plain English, from first call to launch and after.",
    facts: [
      {
        key: "location",
        value:
          "Killarney, Co. Kerry — in person around Kerry, remote everywhere else",
      },
      {
        key: "day job",
        value: "Software Engineer at Net Feasa (IoT), since 2024",
      },
      {
        key: "previously",
        value:
          "eCreation Media — clients included Sky, BBC Studios and Virgin Media",
      },
      {
        key: "stack",
        value:
          "TypeScript, React & React Native, Python, AWS, Pulumi, GitHub Actions",
      },
      {
        key: "ai tools",
        value:
          "used daily, reviewed line by line. The name on the commit is mine.",
      },
      { key: "shell", value: "zsh, dark mode, obviously" },
    ],
    // Every figure traces back to experience.ts.
    stats: [
      { value: "2021", label: "shipping production code since" },
      { value: "4", label: "platforms from one codebase" },
      { value: "12×", label: "faster CI pipeline (1h → 5 min)" },
      { value: "0s", label: "downtime on production deploys" },
    ],
    photoCaption: "actual footage of me reading legacy code",
  },
  terminalCommands: [
    "build website",
    "automate it",
    "deploy --aws",
    "fix ci-cd",
    "ship it",
    "rm -rf busywork",
    "cat cv.md",
    "make it faster",
  ],
  contact: {
    intro:
      "Tell me what you're trying to get done — a couple of lines is plenty. I reply within one business day. From me, not a bot.",
    include: [
      "What you're trying to get done, in your words",
      "Any deadline or event you're working towards",
      "A rough budget if you have one (optional — it helps me suggest the right size of solution)",
    ],
    email: {
      subject: "Project enquiry",
      body: [
        "Hi Adam,",
        "",
        "What I'm trying to get done:",
        "",
        "",
        "Timeline (if any):",
        "",
        "",
        "Rough budget (optional):",
        "",
        "",
        "Best way to reach me:",
        "",
      ].join("\r\n"),
    },
    steps: [
      "I reply within one business day, usually with a few questions.",
      "A short call to understand what you need — no charge.",
      "Scope and price in writing before any work starts.",
      "You own the code, domain and accounts at handover. Ongoing support is optional.",
    ],
    note: "Based in Killarney, Co. Kerry. Happy to meet in person around Kerry; everything else works remotely.",
  },
  // True: Cloudflare Web Analytics is cookieless and there is no consent banner.
  footerNote:
    "Hand-built in Killarney. No cookies, no pop-ups, an unreasonable amount of cyan.",
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
    { label: "Start a project", href: "/#contact", kind: "cta" },
    { label: "CV", href: "/cv", kind: "page" },
  ],
} satisfies SiteConfig;
