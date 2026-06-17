import { AboutHero } from "@/components/about/AboutHero";
import { OriginStory } from "@/components/about/OriginStory";
import { Philosophy } from "@/components/about/Philosophy";
import { TeamSection } from "@/components/about/TeamSection";
import { BackedBy } from "@/components/about/BackedBy";
import { Vision } from "@/components/about/Vision";
import { getTeam } from "@/lib/content/team";
import { getInvestors, getPartners } from "@/lib/content/backers";
import { getPress } from "@/lib/content/press";

export const metadata = {
  title: "About | ManaMind",
  description:
    "Our mission, team, and the story behind ManaMind - building the autonomous testing infrastructure for interactive worlds.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | ManaMind",
    description:
      "Our mission, team, and the story behind ManaMind - building the autonomous testing infrastructure for interactive worlds.",
    url: "/about",
    images: [
      {
        url: "/manamind-logo.png",
        width: 179,
        height: 33,
        alt: "ManaMind logo.",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "About | ManaMind",
    description:
      "Our mission, team, and the story behind ManaMind - building the autonomous testing infrastructure for interactive worlds.",
    images: ["/manamind-logo.png"],
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
      <Vision />
    </>
  );
}
