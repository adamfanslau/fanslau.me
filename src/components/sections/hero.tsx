import { siteConfig } from "@/content/site";
import { TerminalLogo } from "@/components/terminal-logo";
import { SocialLinks } from "@/components/social-links";

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-center px-6 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[-1]"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 35% 50%, rgb(5 6 10 / 0.85), transparent 70%)",
        }}
      />
      <p
        data-scramble="mono"
        className="font-mono text-sm uppercase tracking-widest text-accent"
      >
        {siteConfig.role} · {siteConfig.location}
      </p>
      <h1 className="mt-4 text-[clamp(1.5rem,7vw,3.75rem)] tracking-tight">
        <TerminalLogo commands={siteConfig.terminalCommands} />
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-foreground/90">
        {siteConfig.tagline}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="#contact"
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-[0_0_20px_var(--glow-cyan)] transition-all hover:shadow-[0_0_32px_var(--glow-cyan)]"
        >
          Get in touch
        </a>
        <a
          href="#services"
          className="rounded-md border border-accent/40 px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent/10"
        >
          What I do
        </a>
        <SocialLinks className="ml-2" />
      </div>
    </section>
  );
}
