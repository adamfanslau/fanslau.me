import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { TerminalLogo } from "@/components/terminal-logo";
import { SocialLinks } from "@/components/social-links";
import { StatusChip } from "@/components/status-chip";
import { heroStep } from "@/components/stagger";

export function Hero() {
  // scroll-mt-14.25 = header height (h-14 + 1px border) so `#top` lands at scrollY 0.
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-center scroll-mt-14.25 px-6 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[-1]"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 35% 50%, rgb(5 6 10 / 0.85), transparent 70%)",
        }}
      />
      <StatusChip className="hero-in" />
      <p
        data-scramble="mono"
        className="hero-in mt-4 font-mono text-sm uppercase tracking-widest text-accent"
        style={heroStep(1)}
      >
        {siteConfig.role} · {siteConfig.location}
      </p>
      <h1
        className="hero-in mt-4 text-[clamp(1.5rem,7vw,3.75rem)] tracking-tight"
        style={heroStep(2)}
      >
        <TerminalLogo
          commands={siteConfig.terminalCommands}
          label={`${siteConfig.name} — websites, automation and AWS cloud, Killarney`}
        />
      </h1>
      <p
        className="hero-in mt-6 max-w-2xl text-lg text-foreground/90"
        style={heroStep(3)}
      >
        {siteConfig.tagline}
      </p>
      <ul
        aria-label="Services"
        className="hero-in mt-6 flex flex-wrap gap-3"
        style={heroStep(4)}
      >
        {services.map((service, i) => (
          <li key={service.id}>
            <a href={`#service-${service.id}`} className="hero-tile">
              <span className="hero-tile-index">0{i + 1}</span>
              {service.short}
            </a>
          </li>
        ))}
      </ul>
      <div
        className="hero-in mt-8 flex flex-wrap items-center gap-4"
        style={heroStep(5)}
      >
        <a href="#contact" className="btn-primary">
          Start a project
        </a>
        <a href="#services" className="btn-secondary">
          See services
        </a>
        <SocialLinks className="ml-2" />
      </div>
      <a href="#services" className="scroll-cue" aria-label="Scroll to services">
        scroll
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          aria-hidden="true"
          className="size-3.5"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
