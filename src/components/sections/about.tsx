import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/section";
import { stagger } from "@/components/stagger";
import { siteConfig } from "@/content/site";
import { experience } from "@/content/experience";
import adamPhoto from "@/content/adam.jpeg";

// "Jul 2024" -> "2024"
const year = (date: string) => date.split(" ").pop();

export function About() {
  return (
    <Section id="about" title="About" index="03">
      <div className="grid gap-8 sm:grid-cols-[1fr_16rem] sm:items-start">
        <div className="neon-card neon-card--solid" data-reveal>
          <div className="term-bar">
            <span aria-hidden="true" className="term-dots">
              <span />
              <span />
              <span />
            </span>
            <span>~$ whoami</span>
          </div>
          <div className="space-y-4 p-6 text-muted">
            {siteConfig.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {/* Career strip: the only trace of the CV on the home page. */}
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-accent/15 px-6 py-4 font-mono text-xs text-muted">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {experience.map((entry) => (
                <li key={entry.id}>
                  {entry.role}
                  <span className="text-accent/60"> @ </span>
                  {entry.company}
                  <span className="text-accent/60"> · </span>
                  {year(entry.start)}–{entry.end ? year(entry.end) : "present"}
                </li>
              ))}
            </ul>
            <Link href="/cv" className="link-underline text-accent">
              Full CV{" "}
              <span aria-hidden="true" className="link-arrow">
                →
              </span>
            </Link>
          </div>
        </div>
        <figure
          className="neon-card relative self-start p-0"
          data-reveal
          style={stagger(1)}
        >
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
