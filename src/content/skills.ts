import type { SkillCategory } from "./types";

export const skills = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    category: "Mobile & Cross-Platform",
    items: [
      "React Native",
      "Expo",
      "NativeWind",
      "Offline-first SQLite sync",
      "Electron",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "AWS (Lambda, S3, SQS, SNS, EventBridge, Cognito, Transfer Family)",
      "Pulumi",
      "GitHub Actions",
      "CI/CD",
      "Serverless",
      "Docker",
    ],
  },
  {
    category: "Web",
    items: ["Next.js", "React", "Node.js", "Tailwind CSS"],
  },
  {
    category: "Tooling & Practice",
    items: [
      "Jest",
      "PyTest / TDD",
      "OpenAPI",
      "AI-assisted dev (Copilot, Claude Code)",
    ],
  },
] satisfies SkillCategory[];
