import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/data/case-studies";
import { DetailHero } from "@/components/case-studies/DetailHero";
import { DetailSections } from "@/components/case-studies/DetailSections";
import { CaseStudyCTA } from "@/components/case-studies/CaseStudyCTA";

export function generateStaticParams() {
  return CASE_STUDIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
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
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) notFound();

  return (
    <>
      <DetailHero study={study} />
      <DetailSections study={study} />
      <CaseStudyCTA />
    </>
  );
}
