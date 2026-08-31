import type { Project } from "./types";

export const projects = [
  {
    id: "tim-beeston-cleaning",
    title: "Tim Beeston Cleaning",
    description:
      "Website for a family-run cleaning business in Killarney — hero slider, service cards, filterable photo gallery, team profiles, FAQ, and Instagram integration. Lightweight, performance-focused static build.",
    tech: ["HTML", "CSS", "JavaScript"],
    kind: "client",
    url: "https://www.timbeestoncleaning.ie/test6.html",
    image: "/projects/tim-beeston.jpg",
    year: 2026,
  },
  {
    id: "netfeasa-apps",
    title: "Cross-Platform IoT Apps",
    description:
      "Two production apps built with React Native + Expo, shipping one TypeScript codebase to iOS, Android, Web, and Windows desktop — offline-first SQLite sync layer, ~18-component library, Cognito auth, and multi-platform CI/CD.",
    tech: ["React Native", "Expo", "TypeScript", "AWS Cognito", "GitHub Actions"],
    kind: "professional",
    year: 2025,
  },
  {
    id: "roaming-billing-pipeline",
    title: "Serverless Roaming-Billing Pipeline",
    description:
      "Event-driven telecom billing pipeline on AWS — Python Lambdas triggered by S3 events and EventBridge schedules, provisioned with Pulumi IaC across multi-region dev and prod stacks, with end-to-end tests.",
    tech: ["Python", "AWS Lambda", "S3", "EventBridge", "Pulumi"],
    kind: "professional",
    year: 2025,
  },
  {
    id: "bug-blaster",
    title: "Bug Blaster",
    description:
      "The most honest production incident simulator ever built: an HTML5 canvas shooter where you defend the codebase by blasting syntax errors, logic bugs, and memory leaks before they ship. Written from scratch in TypeScript — no game engine, no mercy. Playable right here.",
    tech: ["TypeScript", "HTML5 Canvas", "Vite"],
    kind: "personal",
    url: "/bug-blaster",
    urlLabel: "▶ Play",
    repoUrl: "https://github.com/adamfanslau/bug-blaster",
    image: "/projects/bug-blaster-branded.png",
    year: 2026,
  },
] satisfies Project[];
