import type { Project } from "./types";

// TODO: replace these placeholders with real projects.
export const projects = [
  {
    id: "iot-fleet-platform",
    title: "IoT Fleet Tracking Platform",
    description:
      "Cloud platform ingesting telemetry from thousands of devices, with real-time dashboards and alerting.",
    tech: ["AWS", "TypeScript", "Node.js", "PostgreSQL"],
    year: 2025,
  },
  {
    id: "logistics-mobile-app",
    title: "Logistics Companion App",
    description:
      "Mobile app for field operators — offline-first workflows, barcode scanning, and background sync.",
    tech: ["React Native", "TypeScript", "GraphQL"],
    year: 2024,
  },
  {
    id: "fanslau-me",
    title: "fanslau.me",
    description:
      "This site — a fully static Next.js portfolio deployed on Vercel.",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    repoUrl: "https://github.com/adamfanslau/fanslau.me",
    url: "https://fanslau.me",
    year: 2026,
  },
] satisfies Project[];
