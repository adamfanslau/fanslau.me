import type { Metadata, Viewport } from "next";
import { Geist, Orbitron, Share_Tech_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TronBackground } from "@/components/background/tron-background";
import { IntroOverlay } from "@/components/intro/intro-overlay";
import { ScrambleFx } from "@/components/scramble-fx";
import { RevealFx } from "@/components/reveal-fx";
import { PointerFx } from "@/components/pointer-fx";
import { HeaderFx } from "@/components/header-fx";
import { BackToTop } from "@/components/back-to-top";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-mono",
  subsets: ["latin"],
  weight: "400",
});

const SITE_TITLE = `${siteConfig.name} · Websites, Automation & AWS Cloud · Killarney`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: SITE_TITLE,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: SITE_TITLE,
    description: siteConfig.description,
    locale: "en_IE",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
};

const address = {
  "@type": "PostalAddress",
  addressLocality: "Killarney",
  addressRegion: "County Kerry",
  addressCountry: "IE",
};

// A service business in Kerry, founded by a person — not just "a person exists".
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#business`,
      name: `${siteConfig.name} — Websites, Automation & AWS Cloud`,
      url: siteConfig.url,
      email: `mailto:${siteConfig.email}`,
      description: siteConfig.description,
      address,
      areaServed: { "@type": "Country", name: "Ireland" },
      founder: { "@id": `${siteConfig.url}/#adam` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
          },
        })),
      },
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#adam`,
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      email: `mailto:${siteConfig.email}`,
      url: siteConfig.url,
      address,
      alumniOf: "National College of Ireland",
      knowsAbout: [
        "TypeScript",
        "React Native",
        "AWS",
        "Serverless",
        "CI/CD",
        "Next.js",
      ],
      sameAs: siteConfig.socials
        .filter((social) => social.platform !== "email")
        .map((social) => social.href),
    },
  ],
};

// Runs synchronously before first paint:
//  - returning visitors (and users preferring reduced motion) never see a
//    frame of the intro overlay;
//  - `data-reveal` arms the scroll-reveal hidden state only when JS runs and
//    motion is welcome, so no-JS visitors see everything immediately.
const prePaintScript = `try{var d=document.documentElement,r=matchMedia("(prefers-reduced-motion: reduce)").matches;if(sessionStorage.getItem("af-intro")==="1"||r)d.dataset.intro="skip";if(!r)d.dataset.reveal=""}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the pre-paint script stamps data-* on <html>.
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${orbitron.variable} ${shareTechMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: prePaintScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <IntroOverlay />
        <TronBackground />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrambleFx />
        <RevealFx />
        <PointerFx />
        <HeaderFx />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
