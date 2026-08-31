import type { SkillCategory } from "./types";

export const skills = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Swift", "Kotlin", "SQL"],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD",
      "Serverless",
    ],
  },
  {
    category: "Mobile",
    items: ["React Native", "iOS", "Android", "Offline-first sync"],
  },
  {
    category: "Web",
    items: ["Next.js", "React", "Node.js", "Tailwind CSS", "PostgreSQL"],
  },
] satisfies SkillCategory[];
