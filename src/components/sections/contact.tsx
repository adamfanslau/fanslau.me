import { Section } from "@/components/section";
import { SocialLinks } from "@/components/social-links";
import { StatusChip } from "@/components/status-chip";
import { CopyEmail } from "@/components/copy-email";
import { stagger } from "@/components/stagger";
import { siteConfig } from "@/content/site";

const MAILTO = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Project enquiry")}`;

export function Contact() {
  const { contact } = siteConfig;
  return (
    <Section id="contact" title="Contact" index="04">
      <div className="neon-card neon-card--solid" data-reveal>
        <div className="term-bar">
          <span aria-hidden="true" className="term-dots">
            <span />
            <span />
            <span />
          </span>
          <span>~$ ./start-project</span>
        </div>
        <div className="p-6 sm:p-8">
          <StatusChip />
          <p className="mt-4 max-w-2xl text-muted">{contact.intro}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={MAILTO}
              data-scramble="hover mono"
              className="font-mono text-xl font-semibold text-accent drop-shadow-[0_0_10px_var(--glow-cyan)] hover:underline sm:text-2xl"
            >
              {siteConfig.email}
            </a>
            <CopyEmail email={siteConfig.email} />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href={MAILTO} className="btn-primary">
              Start a project
            </a>
            <SocialLinks />
          </div>

          <h3
            data-scramble="mono"
            className="mt-10 font-mono text-sm uppercase tracking-wide text-muted"
          >
            How it works
          </h3>
          <ol className="stepper mt-5">
            {contact.steps.map((step, i) => (
              <li key={step} data-reveal style={stagger(i)}>
                <span aria-hidden="true" className="stepper-node">
                  0{i + 1}
                </span>
                <p className="text-sm text-muted">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 font-mono text-xs text-muted">{contact.note}</p>
        </div>
      </div>
    </Section>
  );
}
