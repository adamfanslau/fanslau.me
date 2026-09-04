import type { Service } from "./types";

export const services = [
  {
    id: "web",
    title: "Websites & Web Apps",
    short: "Websites",
    icon: "web",
    description:
      "Fast, search-friendly websites for local businesses, and web apps when you need more — logins, dashboards, customer portals. Built to load quickly and turn visitors into enquiries, then handed over with hosting set up.",
    highlights: [
      "Services, gallery, team, FAQ and Instagram — everything a small-business site needs",
      "Lightweight static builds, or Next.js and React",
      "Performance, accessibility and SEO built in",
      "Mobile apps too: React Native + Expo from the same TypeScript codebase",
    ],
  },
  {
    id: "automation",
    title: "Automation & Integrations",
    short: "Automation",
    icon: "automation",
    description:
      "Take repetitive manual work off your team — reports, file transfers, data entry, software releases — and make it run itself, with an alert when something goes wrong.",
    highlights: [
      "Scheduled and event-triggered jobs on AWS (S3, EventBridge)",
      "Alerts to email and Microsoft Teams; partner file delivery over SFTP",
      "Web scraping and OCR for documents and images (Python)",
      "CI/CD for dev teams — one pipeline cut from over an hour to 5–15 minutes",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Back-End (AWS)",
    short: "AWS Cloud",
    icon: "cloud",
    description:
      "Serverless back-ends on AWS that are reliable, cost little when idle, and are defined as code — so every environment is reproducible and nothing lives only in someone's head.",
    highlights: [
      "Lambda (Python, Node.js), S3, SQS/SNS, EventBridge, Cognito",
      "Infrastructure as code with Pulumi across dev and prod",
      "Integration tests against real AWS, OpenAPI contracts, zero-downtime deploys",
    ],
  },
] satisfies Service[];
