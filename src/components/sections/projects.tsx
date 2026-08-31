import { Section } from "@/components/section";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

const KIND_LABELS: Record<NonNullable<Project["kind"]>, string> = {
  client: "Client work",
  professional: "Professional",
  personal: "Personal",
};

export function Projects() {
  return (
    <Section id="projects" title="Projects" index="04">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="neon-card flex flex-col p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              {project.year && (
                <span className="font-mono text-xs text-muted">
                  {project.year}
                </span>
              )}
            </div>
            {project.kind && (
              <span className="mt-1.5 self-start rounded-sm border border-accent-2/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent-2">
                {KIND_LABELS[project.kind]}
              </span>
            )}
            <p className="mt-3 flex-1 text-sm text-muted">
              {project.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-accent/25 bg-accent/5 px-2.5 py-0.5 font-mono text-xs text-accent/90"
                >
                  {tech}
                </li>
              ))}
            </ul>
            {(project.url || project.repoUrl) && (
              <div className="mt-4 flex gap-4 font-mono text-sm">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Live site ↗
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Source ↗
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
