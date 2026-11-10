import { CareersHero } from "@/components/careers/CareersHero";
import { WhyManaMind } from "@/components/careers/WhyManaMind";
import { HowWeWork } from "@/components/careers/HowWeWork";
import { Roles } from "@/components/careers/Roles";
import { WhoThrives } from "@/components/careers/WhoThrives";
import { Perks } from "@/components/careers/Perks";
import { getRoles } from "@/lib/content/roles";

export const metadata = {
  title: "Careers at ManaMind: AI Game Testing Jobs, London",
  description:
    "Help us build the future of autonomous testing. Open roles, principles, and perks at ManaMind.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers at ManaMind: AI Game Testing Jobs, London",
    description:
      "Help us build the future of autonomous testing. Open roles, principles, and perks at ManaMind.",
    url: "/careers",
    images: [
      {
        url: "/og/og-careers.jpg",
        width: 1200,
        height: 630,
        alt: "ManaMind, the model for games QA.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at ManaMind: AI Game Testing Jobs, London",
    description:
      "Help us build the future of autonomous testing. Open roles, principles, and perks at ManaMind.",
    images: ["/og/og-careers.jpg"],
  },
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <WhyManaMind />
      <HowWeWork />
      <Roles roles={getRoles()} />
      <WhoThrives />
      <Perks />
    </>
  );
}
