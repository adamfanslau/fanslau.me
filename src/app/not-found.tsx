import type { Metadata } from "next";
import Link from "next/link";
import { heroStep } from "@/components/stagger";

export const metadata: Metadata = {
  title: "404",
  description: "Page not found.",
  robots: { index: false },
};

// The static export writes this as 404.html; Cloudflare serves it for every
// unknown path (deploy/wrangler.jsonc `not_found_handling: "404-page"`).
export default function NotFound() {
  return (
    // First child of <main>: HeaderFx uses it for the scrolled state, BackToTop for #top.
    <section
      id="top"
      className="relative mx-auto max-w-4xl scroll-mt-14.25 px-6 py-24 sm:py-32"
    >
      <div className="neon-card neon-card--solid hero-in" data-reveal>
        <div className="term-bar">
          <span aria-hidden="true" className="term-dots">
            <span />
            <span />
            <span />
          </span>
          <span>~$ ls ./this-page</span>
        </div>
        <div className="p-6 sm:p-8">
          <p className="font-mono text-sm text-accent-2">
            ls: cannot access &apos;./this-page&apos;: No such file or directory
          </p>
          <h1
            className="neon-heading hero-in mt-4 text-5xl font-semibold tracking-tight sm:text-7xl"
            style={heroStep(1)}
          >
            404
          </h1>
          <p
            className="hero-in mt-4 max-w-xl text-lg text-foreground/90"
            style={heroStep(2)}
          >
            Nothing here. Either the link is out of date or it points at
            something I never built. Both are fixable.
          </p>
          <div
            className="hero-in mt-8 flex flex-wrap items-center gap-4"
            style={heroStep(3)}
          >
            <Link href="/" className="btn-primary">
              Back to the homepage
            </Link>
            <Link href="/#contact" className="btn-secondary">
              Start a project
            </Link>
          </div>
          <p
            className="hero-in mt-8 font-mono text-xs text-muted"
            style={heroStep(4)}
          >
            Consolation prize:{" "}
            <a
              href="https://bugblaster.fanslau.me"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-accent"
            >
              play Bug Blaster{" "}
              <span aria-hidden="true" className="link-arrow">
                ↗
              </span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
