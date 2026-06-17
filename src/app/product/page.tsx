import { ProductHero } from "@/components/product/ProductHero";
import { ArchitectureSection } from "@/components/product/ArchitectureSection";
import { BotInteraction } from "@/components/product/BotInteraction";
import { FeatureBreakdown } from "@/components/product/FeatureBreakdown";
import { ZeroShotExplainer } from "@/components/product/ZeroShotExplainer";
import { BotSection } from "@/components/home/BotSection";

import { Benchmarks } from "@/components/product/Benchmarks";
import { SecuritySection } from "@/components/product/SecuritySection";
import { ProductCTA } from "@/components/product/ProductCTA";

export const metadata = {
  title: "Product | ManaMind",
  description:
    "Hivemind, Command Centre, Legion, and autonomous bots - four layers powering fully autonomous AI game testing at machine scale.",
  alternates: {
    canonical: "/product",
  },
  openGraph: {
    title: "Product | ManaMind",
    description:
      "Hivemind, Command Centre, Legion, and autonomous bots - four layers powering fully autonomous AI game testing at machine scale.",
    url: "/product",
    images: [
      {
        url: "/product-screenshot.png",
        width: 1920,
        height: 1080,
        alt: "ManaMind Command Centre dashboard showing automated game QA results.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product | ManaMind",
    description:
      "Hivemind, Command Centre, Legion, and autonomous bots - four layers powering fully autonomous AI game testing at machine scale.",
    images: ["/product-screenshot.png"],
  },
};

export default function ProductPage() {
  return (
    <>
      <ProductHero />
      <ArchitectureSection />
      <BotInteraction />
      <FeatureBreakdown />
      <BotSection />
      <ZeroShotExplainer />
      <Benchmarks />

      <SecuritySection />
      <ProductCTA />
    </>
  );
}
