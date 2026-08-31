import type { Certification, EducationEntry, ExperienceEntry } from "./types";

export const experience = [
  {
    id: "net-feasa",
    company: "Net Feasa",
    role: "Software Engineer",
    start: "Jul 2024",
    location: "Dingle, Ireland",
    summary:
      "Full-stack engineer across cross-platform apps and serverless cloud services — UI lead on two production apps, CI/CD built from scratch, and event-driven AWS pipelines.",
    highlights: [
      "Built most of the UI for two production apps in React Native + Expo (TypeScript), shipping one codebase to iOS, Android, Web, and Windows desktop.",
      "Designed a reusable ~18-component library and theme system with NativeWind/Tailwind and headless @rn-primitives.",
      "Implemented offline-first architecture: local SQLite with a sync service handling network detection, queued sync, and gzip compression.",
      "Built GitHub Actions CI/CD from scratch: PR validation, automated semantic versioning and changelogs, and a multi-platform build matrix (Windows Electron installers, Android EAS builds).",
      "Added API integration testing on Pulumi-provisioned AWS via GitHub OIDC, plus OpenAPI linting and contract tests.",
      "Built a serverless telecom roaming-billing pipeline — Python Lambdas on S3 events and EventBridge schedules, Pulumi IaC across multi-region dev/prod stacks.",
      "Built event-driven alerting (SNS email and Microsoft Teams) and partner file delivery over SFTP via AWS Transfer Family.",
    ],
    tech: [
      "TypeScript",
      "React Native",
      "Expo",
      "Node.js",
      "Python",
      "AWS",
      "Pulumi",
      "GitHub Actions",
      "Jest",
    ],
  },
  {
    id: "ecreation-media",
    company: "eCreation Media Technology",
    role: "Software Engineer",
    start: "Dec 2021",
    end: "Jul 2024",
    summary:
      "Consultancy delivering software to video service providers worldwide — clients include Nokia, BBC Studios, Virgin Media, Sky, and Verizon.",
    highlights: [
      "Developed content-scraping automation in Node.js and image-recognition software in Python (OpenCV, Tesseract OCR) running on AWS Lambda, with a TDD approach.",
      "Optimized CI workflows from 1h+ down to 5–15 min running time, saving the project both time and money.",
      "Implemented transparent zero-downtime production deployments.",
      "Recognized multiple times for best improvement/optimization across all project teams.",
      "Reviewed code and helped train new developers on the team.",
    ],
    tech: [
      "Node.js",
      "Python",
      "OpenCV",
      "Tesseract OCR",
      "AWS",
      "Docker",
      "GitHub Actions",
      "PyTest",
    ],
  },
] satisfies ExperienceEntry[];

export const education = [
  {
    id: "nci-hdip",
    institution: "National College of Ireland",
    credential: "Higher Diploma in Computing: Software Development (Level 8)",
    detail: "First Class Honours",
    start: "2023",
    end: "2025",
  },
] satisfies EducationEntry[];

export const certifications = [
  { name: "MTA: Software Development", issuer: "ecollege.ie", year: 2020 },
  {
    name: "MTA: Computer Systems Networking & Telecommunications",
    issuer: "ecollege.ie",
    year: 2020,
  },
  {
    name: "Java Foundations Certified Junior Associate",
    issuer: "Oracle",
    year: 2020,
  },
] satisfies Certification[];
