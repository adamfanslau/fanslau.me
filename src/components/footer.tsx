import { siteConfig } from "@/content/site";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 py-8 font-mono text-xs text-muted sm:flex-row">
        <p data-scramble="mono">
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.location}
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
