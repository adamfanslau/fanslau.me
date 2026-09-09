import type { Service } from "./types";

export const services = [
  {
    id: "web",
    title: "Websites & Web Apps",
    short: "Websites",
    icon: "web",
    description:
      "Fast, search-friendly websites for local businesses, and web apps when you need more — logins, dashboards, customer portals. Built to load quickly and turn visitors into enquiries, then handed over with hosting set up.",
    fit: "your current site is a template, out of date or not bringing in enquiries — or you've outgrown it and need logins, bookings or a customer portal.",
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
    fit: "someone on your team spends hours a week copying data between systems, chasing files or running the same report by hand.",
    highlights: [
      "Jobs that run on a schedule, or the moment a file lands (AWS S3, EventBridge)",
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
    fit: "you're a tech team that needs another pair of hands on AWS, CI/CD or infrastructure-as-code without a full-time hire.",
    highlights: [
      "Serverless building blocks — Lambda, S3, queues, events, user sign-in (Cognito)",
      "Infrastructure as code with Pulumi across dev and prod",
      "Integration tests against real AWS, OpenAPI contracts, zero-downtime deploys",
    ],
  },
] satisfies Service[];
