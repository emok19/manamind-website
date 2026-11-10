import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { GA_MEASUREMENT_ID } from "@/lib/constants";
import { getRoles } from "@/lib/content/roles";
import "./globals.css";

const retni = localFont({
  variable: "--font-retni",
  display: "swap",
  src: [
    { path: "../../public/fonts/brand/retni-light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/brand/retni-regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/brand/retni-medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/brand/retni-medium.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/brand/retni-bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/brand/retni-bold.woff2", weight: "800", style: "normal" },
  ],
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ManaMind",
  url: "https://manamind.ai",
  logo: "https://manamind.ai/manamind-logo.png",
  description: "ManaMind builds AI agents that test video games the way real players do, with no source code, SDK or scripting.",
  foundingDate: "2025",
  address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  email: "sales@manamind.ai",
  founder: [
    { "@type": "Person", name: "Emil Kostadinov", jobTitle: "Co-Founder & CEO", sameAs: ["https://www.linkedin.com/in/emilkostadinov/"] },
    { "@type": "Person", name: "Sabtain Ahmad", jobTitle: "Co-Founder & CTO", sameAs: ["https://www.linkedin.com/in/sabtainahmad/"] },
  ],
  // TODO before go-live: add the official Discord, X and Crunchbase URLs (SEO fix 12).
  sameAs: [
    "https://www.linkedin.com/company/manamind",
    "https://www.youtube.com/@ManaMindAI",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ManaMind",
  url: "https://manamind.ai",
  publisher: {
    "@type": "Organization",
    name: "ManaMind",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://manamind.ai"),
  title: "AI Game Testing & Automated Game QA | ManaMind",
  description:
    "ManaMind's AI agents play your game like real players and report bugs automatically. Automated game QA with no source code access. Book a demo.",
  openGraph: {
    title: "AI Game Testing & Automated Game QA | ManaMind",
    description:
      "ManaMind's AI agents play your game like real players and report bugs automatically. Automated game QA with no source code access. Book a demo.",
    url: "https://manamind.ai",
    siteName: "ManaMind",
    images: [
      {
        url: "/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "ManaMind, the model for games QA.",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Game Testing & Automated Game QA | ManaMind",
    description:
      "ManaMind's AI agents play your game like real players and report bugs automatically. Automated game QA with no source code access. Book a demo.",
    images: ["/og/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {process.env.NEXT_PUBLIC_PREVIEW === "1" ? null : (<>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
            });
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        </>)}
      </head>
      <body className={`${retni.variable} font-sans antialiased`}>
        {/* Blog link shown from launch (team decision, 9 Nov 2026). The blog index itself stays noindex until three posts are live. */}
        <Navbar openRoles={getRoles().length} showBlog />
        <main>{children}</main>
        <Footer showBlog />
        <StickyCTA />
        <CookieBanner />
      </body>
    </html>
  );
}
