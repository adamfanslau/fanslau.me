import { Section } from "@/components/section";
import { certifications, education, experience } from "@/content/experience";

export function Experience() {
  return (
    <Section id="experience" title="Experience" index="03">
      <ol className="relative space-y-8 border-l-0 pl-8">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-px bg-linear-to-b from-accent to-accent-2"
        />
        {experience.map((entry) => (
          <li key={entry.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-9.25 top-7 size-2.5 rounded-full bg-accent shadow-[0_0_8px_var(--glow-cyan)]"
            />
            <article className="neon-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold">
                  <span data-scramble="">{entry.role}</span>{" "}
                  <span data-scramble="" className="text-accent">
                    @ {entry.company}
                  </span>
                </h3>
                <span className="font-mono text-xs text-muted">
                  {entry.start} — {entry.end ?? "Present"}
                  {entry.location ? ` · ${entry.location}` : ""}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{entry.summary}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-muted">
                {entry.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span aria-hidden="true" className="text-accent">
                      ›
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2">
                {entry.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-accent/25 bg-accent/5 px-2.5 py-0.5 font-mono text-xs text-accent/90"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <h3
            data-scramble="mono"
            className="font-mono text-sm uppercase tracking-wide text-muted"
          >
            Education
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {education.map((entry) => (
              <li key={entry.id}>
                <p className="font-medium">{entry.credential}</p>
                <p className="text-muted">
                  {entry.institution} · {entry.start}–{entry.end}
                  {entry.detail && (
                    <span className="text-accent"> · {entry.detail}</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3
            data-scramble="mono"
            className="font-mono text-sm uppercase tracking-wide text-muted"
          >
            Certifications
          </h3>
          <ul className="mt-3 space-y-1.5 text-sm text-muted">
            {certifications.map((cert) => (
              <li key={cert.name}>
                {cert.name} · {cert.issuer}, {cert.year}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
