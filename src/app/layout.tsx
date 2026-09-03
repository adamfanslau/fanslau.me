import type { Metadata, Viewport } from "next";
import { Geist, Orbitron, Share_Tech_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TronBackground } from "@/components/background/tron-background";
import { IntroOverlay } from "@/components/intro/intro-overlay";
import { ScrambleFx } from "@/components/scramble-fx";
import { BackToTop } from "@/components/back-to-top";
import { siteConfig } from "@/content/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    locale: "en_US",
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  email: `mailto:${siteConfig.email}`,
  url: siteConfig.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Killarney",
    addressRegion: "County Kerry",
    addressCountry: "IE",
  },
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
};

// Runs synchronously before first paint: returning visitors (and users
// preferring reduced motion) never see a frame of the intro overlay.
const introSkipScript = `try{if(sessionStorage.getItem("af-intro")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="skip"}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${orbitron.variable} ${shareTechMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: introSkipScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <IntroOverlay />
        <TronBackground />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrambleFx />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
