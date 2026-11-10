import { HeroSection } from "@/components/home/HeroSection";
import { KeyPoints } from "@/components/home/KeyPoints";
import { BotTeaser } from "@/components/home/BotTeaser";
import { LinkBand } from "@/components/shared/LinkBand";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { DemoReel } from "@/components/home/DemoReel";
import { JsonLd } from "@/components/seo/JsonLd";
import { HomeHowItWorks, NoSourceCode } from "@/components/home/HomeSeoSections";
import { FAQ } from "@/components/shared/FAQ";
import { HOME_FAQ } from "@/data/faqs";
import { SOFTWARE_APPLICATION } from "@/lib/schema";

export const metadata = {
  title: "AI Game Testing & Automated Game QA | ManaMind",
  description:
    "ManaMind's AI agents play your game like real players and report bugs automatically. Automated game QA with no source code access. Book a demo.",
  alternates: {
    canonical: "https://manamind.ai",
  },
  openGraph: {
    title: "AI Game Testing & Automated Game QA | ManaMind",
    description:
      "ManaMind's AI agents play your game like real players and report bugs automatically. Automated game QA with no source code access. Book a demo.",
    url: "/",
    images: [
      {
        url: "/og/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "ManaMind, the model for games QA.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Game Testing & Automated Game QA | ManaMind",
    description:
      "ManaMind's AI agents play your game like real players and report bugs automatically. Automated game QA with no source code access. Book a demo.",
    images: ["/og/og-home.jpg"],
  },
};

const softwareApplicationJsonLd = SOFTWARE_APPLICATION;

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd} />
      <HeroSection />
      <KeyPoints />
      <HomeHowItWorks />
      <BotTeaser />
      <NoSourceCode />
      <LinkBand
        label="How it works"
        title="Can you spot the bug our bot found?"
        text="Try it on a real frame from Husk Protocol, then see the report Wayfinder wrote."
        href="/how-it-works#spot-the-bug"
        cta="Play spot the bug"
      />
      <ProductShowcase />
      <FAQ title="AI game testing FAQ" intro="Straight answers about game QA, AI testing and how ManaMind works." items={HOME_FAQ} />
      <DemoReel />
    </>
  );
}
