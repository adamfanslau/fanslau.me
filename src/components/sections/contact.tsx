import { Section } from "@/components/section";
import { SocialLinks } from "@/components/social-links";
import { siteConfig } from "@/content/site";

export function Contact() {
  return (
    <Section id="contact" title="Contact" index="06">
      <p className="max-w-2xl text-muted">
        Have a project in mind, or want to talk about how I can help? The
        fastest way to reach me is by email — I usually reply within a day.
      </p>
      <a
        href={`mailto:${siteConfig.email}`}
        data-scramble="hover mono"
        className="mt-6 inline-block font-mono text-xl font-semibold text-accent drop-shadow-[0_0_10px_var(--glow-cyan)] hover:underline sm:text-2xl"
      >
        {siteConfig.email}
      </a>
      <SocialLinks className="mt-8" />
    </Section>
  );
}
