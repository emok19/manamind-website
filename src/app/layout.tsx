import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { GA_MEASUREMENT_ID } from "@/lib/constants";
import { getRoles } from "@/lib/content/roles";
import "./globals.css";

const swiza = localFont({
  variable: "--font-swiza",
  src: [
    { path: "../../public/fonts/swiza-regular-webfont.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/swiza-medium-webfont.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/swiza-semibold-webfont.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/swiza-bold-webfont.woff2", weight: "700", style: "normal" },
  ],
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ManaMind",
  url: "https://manamind.ai",
  logo: "https://manamind.ai/manamind-logo.png",
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
  title: "ManaMind - Autonomous AI Quality Assurance for Video Games",
  description:
    "Human-like testing at machine scale. ManaMind delivers fully autonomous QA testing for video games - zero-shot, no code access, infinitely scalable.",
  openGraph: {
    title: "ManaMind - Autonomous AI Quality Assurance for Video Games",
    description:
      "Human-like testing at machine scale. ManaMind delivers fully autonomous QA testing for video games - zero-shot, no code access, infinitely scalable.",
    url: "https://manamind.ai",
    siteName: "ManaMind",
    images: [
      {
        url: "/product-screenshot.png",
        width: 1920,
        height: 1080,
        alt: "ManaMind Command Centre dashboard showing automated game QA results.",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ManaMind - Autonomous AI Quality Assurance for Video Games",
    description:
      "Human-like testing at machine scale. ManaMind delivers fully autonomous QA testing for video games - zero-shot, no code access, infinitely scalable.",
    images: ["/product-screenshot.png"],
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
      </head>
      <body className={`${swiza.variable} font-sans antialiased`}>
        <Navbar openRoles={getRoles().length} />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
