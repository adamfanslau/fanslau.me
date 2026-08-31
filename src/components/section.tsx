export function Section({
  id,
  title,
  index,
  children,
}: {
  id: string;
  title: string;
  /** Mono section number rendered before the title, e.g. "01". */
  index?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border/60">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <h2 className="neon-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          {index && (
            <span className="mr-3 font-mono text-base font-normal text-accent sm:text-lg">
              {index} /
            </span>
          )}
          {title}
        </h2>
        <div className="mt-3 h-0.5 w-24 bg-linear-to-r from-accent to-accent-2" />
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
