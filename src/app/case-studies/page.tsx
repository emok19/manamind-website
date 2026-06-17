import { CaseStudiesHero } from "@/components/case-studies/CaseStudiesHero";
import { CaseStudyGrid } from "@/components/case-studies/CaseStudyGrid";
import { CaseStudyCTA } from "@/components/case-studies/CaseStudyCTA";
import { ComingSoon } from "@/components/layout/ComingSoon";
import { CASE_STUDIES_LIVE } from "@/config/flags";
import { getCaseStudies } from "@/lib/content/case-studies";

export const metadata = {
  title: "Case Studies | ManaMind",
  description:
    "See how studios use ManaMind to uncover issues earlier, increase test coverage, and reduce QA costs.",
  robots: CASE_STUDIES_LIVE ? undefined : { index: false, follow: true },
};

export default function CaseStudiesPage() {
  if (!CASE_STUDIES_LIVE) {
    return (
      <ComingSoon
        title="Case Studies"
        description="Real studio results, coming soon."
      />
    );
  }

  return (
    <>
      <CaseStudiesHero />
      <CaseStudyGrid studies={getCaseStudies()} />
      <CaseStudyCTA />
    </>
  );
}
