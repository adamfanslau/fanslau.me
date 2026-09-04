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
    <section
      id={id}
      className="section-divider relative scroll-mt-20 overflow-x-clip"
    >
      <div className="relative mx-auto max-w-4xl px-6 py-16 sm:py-20">
        {index && (
          <span aria-hidden="true" className="section-ghost">
            {index}
          </span>
        )}
        {/* Heading + rule reveal together; the rule then draws itself in. */}
        <div data-reveal className="relative">
          <h2 className="neon-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            {index && (
              <span className="mr-3 font-mono text-base font-normal text-accent sm:text-lg">
                {index} /
              </span>
            )}
            <span data-scramble="">{title}</span>
          </h2>
          <div className="section-bar mt-3 h-0.5 w-24 bg-linear-to-r from-accent to-accent-2" />
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
