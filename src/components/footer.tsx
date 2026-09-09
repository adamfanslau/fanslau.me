import Link from "next/link";
import { siteConfig } from "@/content/site";
import { mailto } from "@/components/mailto";
import { AfMark } from "./af-mark";
import { SocialLinks } from "./social-links";

export function Footer() {
  // Section links only — the CTA lives in the header, the CV gets its own slot.
  const links = siteConfig.nav.filter((item) => item.kind !== "cta");

  return (
    <footer className="border-t border-border/60 bg-background/60 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-6 py-8 font-mono text-xs text-muted">
        {/* Row 1: the email is the thing people scroll down to find. */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <a
            href={mailto()}
            className="link-underline text-sm text-accent"
          >
            {siteConfig.email}
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 uppercase tracking-widest">
                {links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="link-underline transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <SocialLinks />
          </div>
        </div>

        {/* Row 2: © line and the one dry footer note. */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-5 text-center sm:flex-row sm:text-left">
          <p className="flex items-center gap-2">
            <AfMark className="size-5 shrink-0 opacity-70" />
            <span data-scramble="mono">
              © {new Date().getFullYear()} {siteConfig.name} ·{" "}
              {siteConfig.location}
            </span>
          </p>
          <p className="max-w-sm sm:text-right">{siteConfig.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
