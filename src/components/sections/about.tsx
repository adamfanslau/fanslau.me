import Image from "next/image";
import { Section } from "@/components/section";
import { siteConfig } from "@/content/site";
import adamPhoto from "@/content/adam.jpeg";

export function About() {
  return (
    <Section id="about" title="About" index="01">
      <div className="grid gap-8 sm:grid-cols-[1fr_16rem] sm:items-start">
        <div className="max-w-2xl space-y-4 text-muted">
          {siteConfig.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <figure className="neon-card relative self-start p-0">
          <Image
            src={adamPhoto}
            alt="Adam Fanslau"
            placeholder="blur"
            sizes="(min-width: 640px) 16rem, 100vw"
            className="cyber-photo-img rounded-lg"
          />
          <div aria-hidden="true" className="cyber-photo-overlay" />
        </figure>
      </div>
    </Section>
  );
}
