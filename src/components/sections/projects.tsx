import { Section } from "@/components/section";
import { projects } from "@/content/projects";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="flex flex-col rounded-lg border border-border bg-surface p-6"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              {project.year && (
                <span className="font-mono text-xs text-muted">
                  {project.year}
                </span>
              )}
            </div>
            <p className="mt-2 flex-1 text-sm text-muted">
              {project.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
            {(project.url || project.repoUrl) && (
              <div className="mt-4 flex gap-4 text-sm font-medium">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Live site
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Source
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
