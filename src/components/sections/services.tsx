import { Section } from "@/components/section";
import { services } from "@/content/services";

export function Services() {
  return (
    <Section id="services" title="Services">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.id}
            className="rounded-lg border border-border bg-surface p-6"
          >
            <h3 className="text-lg font-semibold">{service.title}</h3>
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
