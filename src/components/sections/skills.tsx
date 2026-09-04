import { Section } from "@/components/section";
import { stagger } from "@/components/stagger";
import { skills } from "@/content/skills";

/** Tech tag cloud. Lives on /cv. */
export function Skills({ index = "03" }: { index?: string }) {
  return (
    <Section id="skills" title="Skills" index={index}>
      <div className="grid gap-8 sm:grid-cols-2">
        {skills.map((group, i) => (
          <div key={group.category} data-reveal style={stagger(i)}>
            <h3
              data-scramble="mono"
              className="font-mono text-sm uppercase tracking-wide text-muted"
            >
              {group.category}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-accent/20 bg-surface/80 px-3 py-1 text-sm backdrop-blur-sm transition-[border-color,box-shadow] hover:border-accent/50 hover:shadow-[0_0_10px_-2px_var(--glow-cyan)] motion-reduce:transition-none"
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
