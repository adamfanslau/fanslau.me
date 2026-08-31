import { siteConfig } from "@/content/site";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
