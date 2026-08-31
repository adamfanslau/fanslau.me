import { siteConfig } from "@/content/site";
import { SocialLinks } from "@/components/social-links";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
      <p className="font-mono text-sm text-accent">{siteConfig.role}</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        {siteConfig.name}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{siteConfig.tagline}</p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="#contact"
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Get in touch
        </a>
        <a
          href="#services"
          className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
        >
          What I do
        </a>
        <SocialLinks className="ml-2" />
      </div>
    </section>
  );
}
