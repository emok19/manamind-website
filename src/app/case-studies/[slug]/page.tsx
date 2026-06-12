import { notFound } from "next/navigation";
import { getCaseStudies, getCaseStudy } from "@/lib/content/case-studies";
import { DetailHero } from "@/components/case-studies/DetailHero";
import { DetailSections } from "@/components/case-studies/DetailSections";
import { CaseStudyCTA } from "@/components/case-studies/CaseStudyCTA";
import { ComingSoon } from "@/components/layout/ComingSoon";
import { CASE_STUDIES_LIVE } from "@/config/flags";

export function generateStaticParams() {
  return getCaseStudies().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study | ManaMind" };
  return {
    title: `${study.game.title} - ${study.studio.name} | ManaMind`,
    description: study.challengeOneLiner,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

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
      <DetailHero study={study} />
      <DetailSections study={study} />
      <CaseStudyCTA />
    </>
  );
}
