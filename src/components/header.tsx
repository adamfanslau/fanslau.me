import { siteConfig } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        <a href="#top" className="font-semibold tracking-tight">
          {siteConfig.name}
        </a>
        <nav aria-label="Main">
          <ul className="flex items-center gap-5 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted transition-colors hover:text-foreground"
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
