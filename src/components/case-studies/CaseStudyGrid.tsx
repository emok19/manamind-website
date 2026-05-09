import { CASE_STUDIES } from "@/data/case-studies";
import { CaseStudyCard } from "./CaseStudyCard";

export function CaseStudyGrid() {
  return (
    <section className="relative pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
