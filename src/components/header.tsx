import Link from "next/link";
import { siteConfig } from "@/content/site";
import { MobileMenu } from "./mobile-menu";
import { TerminalLogo } from "./terminal-logo";

export function Header() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-accent/15 bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        <Link href="/#top" className="text-sm tracking-tight">
          <TerminalLogo />
        </Link>
        {/* Inline nav from `sm` up; below that MobileMenu renders the hamburger. */}
        <nav aria-label="Main" className="max-sm:hidden">
          <ul className="flex items-center gap-5">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                {item.kind === "page" ? (
                  <Link href={item.href} className="nav-pill">
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    data-scramble="hover mono"
                    className="nav-link font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <MobileMenu items={siteConfig.nav} />
      </div>
      {/* Scroll progress (CSS scroll-driven animation; hidden where unsupported). */}
      <span aria-hidden="true" className="scroll-progress" />
    </header>
  );
}
