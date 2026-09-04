import type { Project } from "./types";

export const projects = [
  {
    id: "tim-beeston-cleaning",
    title: "Tim Beeston Cleaning",
    description:
      "New website for a family-run cleaning business in Killarney, replacing a template site: services, before-and-after gallery, team profiles, FAQ, Instagram feed and WhatsApp contact. A lightweight static build that loads fast on a phone.",
    tech: ["HTML", "CSS", "JavaScript"],
    kind: "client",
    // Client has not promoted the new build to the domain root yet.
    url: "https://www.timbeestoncleaning.ie/test6.html",
    urlLabel: "Preview",
    image: "/projects/tim-beeston.jpg",
    year: 2026,
  },
  {
    id: "netfeasa-apps",
    title: "Cross-Platform IoT Apps",
    description:
      "Two field apps for an IoT company, built so one TypeScript codebase ships to iOS, Android, web and Windows. They keep working offline and sync when back online; releases to every platform are automated.",
    tech: ["React Native", "Expo", "TypeScript", "AWS Cognito", "GitHub Actions"],
    kind: "professional",
    year: 2025,
  },
  {
    id: "roaming-billing-pipeline",
    title: "Serverless Roaming-Billing Pipeline",
    description:
      "Telecom billing files processed on AWS automatically, the moment they arrive or on a schedule, with alerts when a step fails. Infrastructure defined as code (Pulumi) across dev and prod in multiple regions, with end-to-end tests.",
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
