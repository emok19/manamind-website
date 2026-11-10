import { AboutHero } from "@/components/about/AboutHero";
import { OriginStory } from "@/components/about/OriginStory";
import { Philosophy } from "@/components/about/Philosophy";
import { TeamSection } from "@/components/about/TeamSection";
import { BackedBy } from "@/components/about/BackedBy";
import { Vision } from "@/components/about/Vision";
import { PressKit } from "@/components/about/PressKit";
import { getTeam } from "@/lib/content/team";
import { getInvestors, getPartners } from "@/lib/content/backers";
import { getPress } from "@/lib/content/press";

export const metadata = {
  title: "About ManaMind: AI Game Testing Company, London",
  description:
    "Our mission, team, and the story behind ManaMind - building the autonomous testing infrastructure for interactive worlds.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About ManaMind: AI Game Testing Company, London",
    description:
      "Our mission, team, and the story behind ManaMind - building the autonomous testing infrastructure for interactive worlds.",
    url: "/about",
    images: [
      {
        url: "/og/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "ManaMind, the model for games QA.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About ManaMind: AI Game Testing Company, London",
    description:
      "Our mission, team, and the story behind ManaMind - building the autonomous testing infrastructure for interactive worlds.",
    images: ["/og/og-about.jpg"],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OriginStory />
      <Philosophy />
      <TeamSection team={getTeam()} />
      <BackedBy
        investors={getInvestors()}
        partners={getPartners()}
        press={getPress()}
      />
      <PressKit />
      <Vision />
    </>
  );
}
