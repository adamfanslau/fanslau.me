import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { SocialLinks } from "@/components/social-links";
import { PrintButton } from "@/components/print-button";
import { heroStep } from "@/components/stagger";
import { Education, Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "CV",
  description:
    "CV of Adam Fanslau, software engineer in Killarney, Ireland: experience at Net Feasa and eCreation Media, education, certifications and skills.",
  alternates: { canonical: "/cv" },
};

export default function CvPage() {
  return (
    <>
      {/* First child of <main>: HeaderFx uses it for the scrolled state, BackToTop for #top. */}
      <section
        id="top"
        className="relative mx-auto max-w-4xl scroll-mt-14.25 px-6 pb-10 pt-16 sm:pt-24"
      >
        {/* Dark scrim like the hero's, sized for this shorter block so the
            summary stays legible where it crosses the horizon band. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[-1]"
          style={{
            background:
              "radial-gradient(ellipse 95% 120% at 35% 45%, rgb(5 6 10 / 0.9), transparent 78%)",
          }}
        />
        <p
          data-scramble="mono"
          className="hero-in font-mono text-sm uppercase tracking-widest text-accent"
        >
          ~$ cat cv.md
        </p>
        <h1
          className="hero-in neon-heading mt-4 text-3xl font-semibold tracking-tight sm:text-5xl"
          style={heroStep(1)}
        >
          <span data-scramble="">{siteConfig.name}</span>
        </h1>
        <p
          className="hero-in mt-3 text-lg text-foreground/90"
          style={heroStep(2)}
        >
          {siteConfig.role} · Killarney, Ireland
        </p>
        <p className="hero-in mt-6 max-w-2xl text-muted" style={heroStep(3)}>
          {siteConfig.about[0]}
        </p>
        <div
          className="hero-in mt-8 flex flex-wrap items-center gap-4"
          style={heroStep(4)}
        >
          <a href={`mailto:${siteConfig.email}`} className="btn-primary">
            Email me
          </a>
          <PrintButton />
          <Link href="/" className="btn-secondary print-hidden">
            ← Back to services
          </Link>
          <SocialLinks className="ml-2" />
        </div>
      </section>

      <Experience index="01" />
      <Education index="02" />
      <Skills index="03" />

      <Section id="hire" title="Work with me" index="04">
        <div className="neon-card neon-card--solid p-6 sm:p-8" data-reveal>
          <p className="max-w-2xl text-muted">
            Looking for freelance help rather than a hire? I build websites,
            automations and AWS back-ends for small businesses and tech teams,
            and take on a small number of projects at a time.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link href="/#services" className="btn-primary">
              See what I offer
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="link-underline font-mono text-accent"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
