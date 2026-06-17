import { HeroSection } from "@/components/home/HeroSection";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { BotInteraction } from "@/components/product/BotInteraction";
import { ValueProps } from "@/components/home/ValueProps";
import { DemoReel } from "@/components/home/DemoReel";

export const metadata = {
  alternates: {
    canonical: "https://manamind.ai/",
  },
  openGraph: {
    title: "ManaMind - Autonomous AI Quality Assurance for Video Games",
    description:
      "Human-like testing at machine scale. ManaMind delivers fully autonomous QA testing for video games - zero-shot, no code access, infinitely scalable.",
    url: "/",
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
    title: "ManaMind - Autonomous AI Quality Assurance for Video Games",
    description:
      "Human-like testing at machine scale. ManaMind delivers fully autonomous QA testing for video games - zero-shot, no code access, infinitely scalable.",
    images: ["/product-screenshot.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductShowcase />
      <BotInteraction />
      <ValueProps />
      <DemoReel />
    </>
  );
}
