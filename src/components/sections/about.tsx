import { Section } from "@/components/section";
import { siteConfig } from "@/content/site";

export function About() {
  return (
    <Section id="about" title="About" index="01">
      <div className="max-w-2xl space-y-4 text-muted">
        {siteConfig.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
