import { siteConfig } from "@/content/site";
import { MobileMenu } from "./mobile-menu";
import { TerminalLogo } from "./terminal-logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-accent/15 bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        <a href="#top" className="text-sm tracking-tight">
          <TerminalLogo />
        </a>
        {/* Inline nav from `sm` up; below that MobileMenu renders the hamburger. */}
        <nav aria-label="Main" className="max-sm:hidden">
          <ul className="flex items-center gap-5">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  data-scramble="hover mono"
                  className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <MobileMenu items={siteConfig.nav} />
      </div>
    </header>
  );
}
