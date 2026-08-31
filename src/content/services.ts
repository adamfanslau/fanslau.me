import type { Service } from "./types";

export const services = [
  {
    id: "cloud",
    title: "Cloud Development",
    description:
      "Backends, APIs, and infrastructure that scale with your product — designed for reliability and sensible running costs.",
    highlights: [
      "API and microservice design",
      "Serverless and containerized workloads",
      "CI/CD pipelines and infrastructure as code",
    ],
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    description:
      "Native-quality iOS and Android apps, from idea to app store — including the backend they talk to.",
    highlights: [
      "Cross-platform and native development",
      "Offline-first data and sync",
      "App store release and maintenance",
    ],
  },
  {
    id: "web",
    title: "Websites & Web Apps",
    description:
      "Fast, accessible websites and web applications — marketing sites, dashboards, and everything in between.",
    highlights: [
      "Modern frameworks (Next.js, React)",
      "Performance and SEO baked in",
      "Design-to-production delivery",
    ],
  },
] satisfies Service[];
