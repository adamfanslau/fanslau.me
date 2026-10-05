import type { Project } from "./types";

export const projects = [
  {
    id: "tim-beeston-cleaning",
    title: "Tim Beeston Cleaning",
    description:
      "New website for a family-run cleaning business in Killarney, replacing a template site: services, before-and-after gallery, team profiles, FAQ, Instagram feed and WhatsApp contact. A lightweight static build that loads fast on a phone.",
    tech: ["HTML", "CSS", "JavaScript"],
    kind: "client",
    url: "https://timbeestoncleaning.ie",
    image: "/projects/tim-beeston.jpg",
    year: 2026,
  },
  {
    id: "lens",
    title: "Lens",
    description:
      "A public demo of a private AI stack: drop in a PDF and get the key facts as strict JSON plus a plain-language explanation, point it at a photo and it transcribes and describes it, or just chat. Two open-weight Qwen models run on a six-core desktop in my house; a Go API queues the work and streams results back as they arrive. No account, files deleted after 24 hours.",
    tech: ["Go", "React", "TypeScript", "Tailwind", "SQLite", "llama.cpp", "Cloudflare"],
    kind: "personal",
    url: "https://lens.fanslau.me",
    urlLabel: "◉ Try it",
    image: "/projects/lens.jpg",
    year: 2026,
  },
  {
    id: "bug-blaster",
    title: "Bug Blaster",
    description:
      "It's Sprint 47, the build is red, and you are the CI. A synthwave canvas shooter where `missing ;`, `undefined is not a function` and a memory leak with a live MB counter charge down a neon corridor toward your desk. Every bug you miss ships to production and costs you a coffee; run out and you get a Production Incident Postmortem, with story points. Fill the RAGE meter and answer with git push --force. Zero dependencies, zero asset files, zero mercy.",
    tech: ["TypeScript", "HTML5 Canvas", "Web Audio", "Vite"],
    kind: "personal",
    url: "https://bugblaster.fanslau.me",
    urlLabel: "▶ Play",
    repoUrl: "https://github.com/adamfanslau/bug-blaster",
    image: "/projects/bug-blaster-poster.jpg",
    video: {
      mp4: "/projects/bug-blaster.mp4",
      webm: "/projects/bug-blaster.webm",
    },
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
] satisfies Project[];
