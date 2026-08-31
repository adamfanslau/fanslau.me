import type { Service } from "./types";

export const services = [
  {
    id: "cloud",
    title: "Cloud & Back-End",
    description:
      "Serverless AWS back-ends and event-driven data pipelines that scale with your product — designed for reliability and sensible running costs.",
    highlights: [
      "AWS Lambda, S3, SQS/SNS, EventBridge",
      "Infrastructure as code with Pulumi",
      "CI/CD pipelines built from scratch",
    ],
  },
  {
    id: "mobile",
    title: "Cross-Platform Apps",
    description:
      "Production apps from one TypeScript codebase to iOS, Android, Web, and desktop — including the cloud back-end they talk to.",
    highlights: [
      "React Native + Expo",
      "Offline-first data and sync",
      "Auth, dashboards, and store releases",
    ],
  },
  {
    id: "web",
    title: "Websites & Web Apps",
    description:
      "Fast, accessible websites and web applications — from marketing sites for local businesses to data-driven dashboards.",
    highlights: [
      "Next.js and React",
      "Performance and SEO baked in",
      "Design-to-production delivery",
    ],
  },
] satisfies Service[];
