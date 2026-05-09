import { CaseStudiesHero } from "@/components/case-studies/CaseStudiesHero";
import { CaseStudyGrid } from "@/components/case-studies/CaseStudyGrid";
import { CaseStudyCTA } from "@/components/case-studies/CaseStudyCTA";

export const metadata = {
  title: "Case Studies | ManaMind",
  description:
    "See how studios use ManaMind to uncover issues earlier, increase test coverage, and reduce QA costs.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <CaseStudiesHero />
      <CaseStudyGrid />
      <CaseStudyCTA />
    </>
  );
}
