import { Section } from "@/components/section";
import { stagger } from "@/components/stagger";
import { services } from "@/content/services";
import type { ServiceIcon } from "@/content/types";

// 24x24 line icons, stroked with currentColor by the wrapping <svg>.
const ICONS: Record<ServiceIcon, React.ReactNode> = {
  web: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9.5h18M6.5 7h.01M9.5 7h.01" />
    </>
  ),
  automation: (
    <>
      <circle cx="12" cy="12" r="9.5" strokeDasharray="3 3" />
      <path d="M13 5.5 8 13.5h4l-1 5 5-8h-4l1-5Z" />
    </>
  ),
  cloud: (
    <path d="M17.5 18.5a4.5 4.5 0 0 0 .4-8.98A6.5 6.5 0 0 0 5.2 11.6a3.5 3.5 0 0 0 1.3 6.9h11Z" />
  ),
};

export function Services() {
  return (
    <Section id="services" title="Services" index="01">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <article
            key={service.id}
            id={`service-${service.id}`}
            className="neon-card scroll-mt-24 p-6"
            data-reveal
            style={stagger(i)}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="icon-frame" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[service.icon]}
                </svg>
              </span>
              <span className="font-mono text-xs text-accent-2">
                0{i + 1} /
              </span>
            </div>
            <h3 data-scramble="" className="mt-4 text-lg font-semibold">
              {service.title}
            </h3>
            <p className="mt-2 text-sm text-muted">{service.description}</p>
            {service.highlights && (
              <ul className="mt-4 space-y-1.5 text-sm text-muted">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span aria-hidden="true" className="text-accent">
                      ›
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
