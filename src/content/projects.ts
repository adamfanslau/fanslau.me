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
    id: "fanslau-me",
    title: "fanslau.me",
    description:
      "This site — a fully static Next.js portfolio with a real-time three.js Tron-grid background, deployed on Vercel.",
    tech: ["Next.js", "React", "three.js", "Tailwind CSS", "Vercel"],
    kind: "personal",
    repoUrl: "https://github.com/adamfanslau/fanslau.me",
    url: "https://fanslau.me",
    year: 2026,
  },
] satisfies Project[];
