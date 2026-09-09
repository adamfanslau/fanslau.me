import { siteConfig } from "@/content/site";

/**
 * Every mailto: link on the site, prefilled with the subject and the
 * "what to include" body template from site.ts. Webmail handlers drop the
 * body, which is why Contact also lists the same hints visibly.
 */
export const mailto = (subject = siteConfig.contact.email.subject) =>
  `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(siteConfig.contact.email.body)}`;
