import { ProductHero } from "@/components/product/ProductHero";
import { ArchitectureSection } from "@/components/product/ArchitectureSection";
import { FeatureBreakdown } from "@/components/product/FeatureBreakdown";
import { ZeroShotExplainer } from "@/components/product/ZeroShotExplainer";
import { BotTeaser } from "@/components/home/BotTeaser";
import { LinkBand } from "@/components/shared/LinkBand";
import { ValueProps } from "@/components/home/ValueProps";

import { SecuritySection } from "@/components/product/SecuritySection";
import { ProductCTA } from "@/components/product/ProductCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ } from "@/components/shared/FAQ";
import { PRODUCT_FAQ } from "@/data/faqs";
import { SOFTWARE_APPLICATION } from "@/lib/schema";

export const metadata = {
  title: "Automated Game Testing Software | ManaMind",
  description:
    "HiveMind, Command Centre and Services: the three layers of ManaMind's automated game testing software. No scripting, no SDK, no source code.",
  alternates: {
    canonical: "/product",
  },
  openGraph: {
    title: "Automated Game Testing Software | ManaMind",
    description:
      "HiveMind, Command Centre and Services: the three layers of ManaMind's automated game testing software. No scripting, no SDK, no source code.",
    url: "/product",
    images: [
      {
        url: "/og/og-product.jpg",
        width: 1200,
        height: 630,
        alt: "ManaMind, the model for games QA.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automated Game Testing Software | ManaMind",
    description:
      "HiveMind, Command Centre and Services: the three layers of ManaMind's automated game testing software. No scripting, no SDK, no source code.",
    images: ["/og/og-product.jpg"],
  },
};

const softwareApplicationJsonLd = SOFTWARE_APPLICATION;

export default function ProductPage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd} />
      <ProductHero />
      <BotTeaser
        label="Our services"
        title="An autonomous game QA team, on demand"
        description="Five specialist bots deliver five QA services: functional, compliance, compatibility, localisation and network QA."
        cta="Explore our services"
      />
      <ArchitectureSection />
      <LinkBand
        label="How it works"
        title="Automated bug reports from every play session"
        text="Bots see the screen, reason about what is happening, plan the next action and report what they find, with the evidence attached. See it on a real game in the Husk Protocol game localization testing case study."
        href="/how-it-works"
        cta="See how it works"
      />
      <FeatureBreakdown />
      <ZeroShotExplainer />

      <ValueProps />
      <SecuritySection />
      <FAQ title="Automated game testing FAQ" items={PRODUCT_FAQ} />
      <ProductCTA />
    </>
  );
}
