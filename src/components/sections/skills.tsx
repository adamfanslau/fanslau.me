import { Section } from "@/components/section";
import { skills } from "@/content/skills";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-8 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {group.category}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border bg-surface px-3 py-1 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
