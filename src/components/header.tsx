import { siteConfig } from "@/content/site";
import { GlitchLogo } from "./glitch-logo";

// Nav anchors hidden on the smallest screens to keep the bar on one line.
const HIDDEN_ON_MOBILE = new Set(["#about", "#experience", "#skills"]);

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-accent/15 bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          <GlitchLogo />
        </a>
        <nav aria-label="Main">
          <ul className="flex items-center gap-3 sm:gap-5">
            {siteConfig.nav.map((item) => (
              <li
                key={item.href}
                className={
                  HIDDEN_ON_MOBILE.has(item.href) ? "max-sm:hidden" : undefined
                }
              >
                <a
                  href={item.href}
                  className="font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-accent sm:text-xs"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
