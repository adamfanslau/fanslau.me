import { siteConfig } from "@/content/site";

/** "● Open to a small number of new projects" — pulsing dot + mono label. */
export function StatusChip({ className }: { className?: string }) {
  return (
    <p className={`status-chip ${className ?? ""}`}>
      <span aria-hidden="true" className="status-dot" />
      <span>{siteConfig.availability}</span>
    </p>
  );
}
