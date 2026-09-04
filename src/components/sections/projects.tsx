import Image from "next/image";
import { Section } from "@/components/section";
import { stagger } from "@/components/stagger";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

const KIND_LABELS: Record<NonNullable<Project["kind"]>, string> = {
  client: "Client work",
  professional: "Employer project",
  personal: "Personal",
};

const PILL =
  "rounded-full border border-accent/25 bg-accent/5 px-2.5 py-0.5 font-mono text-xs text-accent/90 transition-[border-color,translate] hover:-translate-y-px hover:border-accent/60 motion-reduce:transition-none";

export function Projects() {
  return (
    <Section id="projects" title="Work" index="02">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <article
            key={project.id}
            className="neon-card group flex flex-col p-6"
            data-reveal
            style={stagger(i)}
          >
            {project.image && (
              <div className="project-shot relative -mx-6 -mt-6 mb-5 aspect-video overflow-hidden rounded-t-lg border-b border-accent/15">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(min-width: 640px) 26rem, 100vw"
                  className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="project-tint" />
              </div>
            )}
            <div className="flex items-baseline justify-between gap-4">
              <h3 data-scramble="" className="text-lg font-semibold">
                {project.title}
              </h3>
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
                <li key={tech} className={PILL}>
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
                    className="link-underline text-accent"
                  >
                    {project.urlLabel ?? "Live site"}{" "}
                    <span aria-hidden="true" className="link-arrow">
                      ↗
                    </span>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-accent"
                  >
                    Source{" "}
                    <span aria-hidden="true" className="link-arrow">
                      ↗
                    </span>
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
