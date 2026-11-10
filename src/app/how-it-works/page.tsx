import { PageHero } from "@/components/shared/PageHero";
import { CTAButton } from "@/components/shared/CTAButton";
import { BotInteraction } from "@/components/product/BotInteraction";
import { SpotTheBug } from "@/components/home/SpotTheBug";
import { ReportShowcase } from "@/components/how-it-works/ReportShowcase";
import { SecurityStrip } from "@/components/home/SecurityStrip";
import { DemoReel } from "@/components/home/DemoReel";

export const metadata = {
  title: "How ManaMind Works | AI Game Testing | ManaMind",
  description:
    "See how ManaMind's bots play your build through the screen, find issues and write verified bug reports. Try spotting a real bug from the Husk Protocol case study.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How ManaMind Works | ManaMind",
    description: "See how ManaMind's bots play your build, find issues and write verified bug reports.",
    url: "/how-it-works",
    images: [{ url: "/og/og-default.jpg", width: 1200, height: 630, alt: "ManaMind, the model for games QA." }],
  },
  twitter: { card: "summary_large_image", title: "How ManaMind Works | ManaMind", images: ["/og/og-default.jpg"] },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        label="How it works"
        title="From a build to"
        accent="verified bug reports"
        intro="You share a build and your reference material. Our bots play it through the screen, like real players, and report what they find. No SDK, no scripts, no source code."
        glow="elixir"
        seed={97}
      >
        <CTAButton href="/contact">Book a Demo</CTAButton>
        <CTAButton href="#spot-the-bug" variant="outline">Spot a real bug</CTAButton>
      </PageHero>
      <BotInteraction title="From gameplay to actionable bug reports" />
      <div id="spot-the-bug" className="scroll-mt-16"><SpotTheBug /></div>
      <ReportShowcase />
      <SecurityStrip />
      <DemoReel />
    </>
  );
}
