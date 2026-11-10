import { PageHero } from "@/components/shared/PageHero";
import { CTAButton } from "@/components/shared/CTAButton";
import { BotSection } from "@/components/home/BotSection";
import { QAParty } from "@/components/home/QAParty";

const TITLE = "Game QA Services: Functional, Compliance & Localisation QA | ManaMind";
const DESCRIPTION =
  "Functional, compliance, compatibility, localisation and network QA for games, delivered by ManaMind's specialist AI bots. No SDK, no scripts, no source code.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Game QA Services | ManaMind",
    description: DESCRIPTION,
    url: "/services",
    images: [{ url: "/og/og-default.jpg", width: 1200, height: 630, alt: "ManaMind, the model for games QA." }],
  },
  twitter: { card: "summary_large_image", title: "Game QA Services | ManaMind", description: DESCRIPTION, images: ["/og/og-default.jpg"] },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Game QA services,"
        accent="delivered by AI bots"
        intro="Five areas of game QA: functional, compliance, compatibility, localisation and network. Pick the one you need to see what it covers, then meet the bots that do the work."
        seed={113}
      >
        <CTAButton href="#services">Explore the services</CTAButton>
        <CTAButton href="#choose" variant="outline">Choose what you need</CTAButton>
      </PageHero>
      <BotSection />
      <div id="choose" className="scroll-mt-16"><QAParty /></div>
    </>
  );
}
