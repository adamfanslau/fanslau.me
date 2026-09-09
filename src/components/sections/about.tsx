import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/section";
import { stagger } from "@/components/stagger";
import { siteConfig } from "@/content/site";
import adamPhoto from "@/content/adam.jpeg";

export function About() {
  const { about } = siteConfig;
  return (
    <Section id="about" title="About" index="03">
      <div className="grid gap-6 sm:grid-cols-[1fr_16rem] sm:items-start">
        {/* whoami: two-sentence summary, then key/value facts. */}
        <div className="neon-card neon-card--solid" data-reveal>
          <div className="term-bar">
            <span aria-hidden="true" className="term-dots">
              <span />
              <span />
              <span />
            </span>
            <span>~$ whoami</span>
          </div>
          <div className="p-6">
            <p className="leading-relaxed text-foreground/90">{about.summary}</p>
            <dl className="mt-6 grid gap-y-2 font-mono text-sm sm:grid-cols-[max-content_1fr] sm:gap-x-6 sm:gap-y-1.5">
              {about.facts.map((fact) => (
                // Fragment keyed per row; dt/dd must stay direct grid children.
                <div key={fact.key} className="contents">
                  <dt data-scramble="mono" className="text-accent-2">
                    {fact.key}
                  </dt>
                  <dd className="text-muted max-sm:mb-1">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-accent/15 px-6 py-3 font-mono text-xs text-muted">
            <span aria-hidden="true">exit 0</span>
            <Link href="/cv" className="link-underline text-accent">
              Full CV{" "}
              <span aria-hidden="true" className="link-arrow">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Photo. Image + overlay are clipped inside their own wrapper (same
            pattern as the project cards) so the card's corner brackets stay
            intact and the caption sits below on the card surface. */}
        <figure
          className="neon-card self-start p-0 max-sm:mx-auto max-sm:w-full max-sm:max-w-xs"
          data-reveal
          style={stagger(1)}
        >
          <div className="relative overflow-hidden rounded-t-lg">
            <Image
              src={adamPhoto}
              alt="Adam Fanslau"
              placeholder="blur"
              sizes="(min-width: 640px) 16rem, 20rem"
              className="cyber-photo-img"
            />
            <div aria-hidden="true" className="cyber-photo-overlay" />
          </div>
          <figcaption className="border-t border-accent/15 px-4 py-2.5 font-mono text-xs text-muted">
            <span aria-hidden="true" className="text-accent/60">
              #{" "}
            </span>
            {about.photoCaption}
          </figcaption>
        </figure>

        {/* Proof strip: four figures, all backed by experience.ts. */}
        <ul
          aria-label="Track record"
          className="neon-card grid grid-cols-2 divide-y divide-accent/15 sm:col-span-2 sm:grid-cols-4 sm:divide-x sm:divide-y-0"
        >
          {about.stats.map((stat, i) => (
            <li
              key={stat.label}
              className="p-4 sm:p-5"
              data-reveal
              style={stagger(i + 2)}
            >
              <p className="neon-heading font-display text-2xl text-accent sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
