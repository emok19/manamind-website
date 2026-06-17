import { CareersHero } from "@/components/careers/CareersHero";
import { WhyManaMind } from "@/components/careers/WhyManaMind";
import { HowWeWork } from "@/components/careers/HowWeWork";
import { Roles } from "@/components/careers/Roles";
import { WhoThrives } from "@/components/careers/WhoThrives";
import { Perks } from "@/components/careers/Perks";
import { getRoles } from "@/lib/content/roles";

export const metadata = {
  title: "Careers | ManaMind",
  description:
    "Help us build the future of autonomous testing. Open roles, principles, and perks at ManaMind.",
  alternates: {
    canonical: "/careers",
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
