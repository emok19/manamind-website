import Link from "next/link";
import type { Role } from "@/data/roles";

const offers = [
  { label: "Salary", body: "Competitive salary." },
  { label: "Perks", body: "High trust, high impact: ship real product fast, work directly with founders." },
  { label: "Equity", body: "Meaningful equity ownership. You'll share in the upside you help create." },
  { label: "Benefits", body: "Flexible hours, and a culture built on trust and output." },
];

export function RoleDetail({ role }: { role: Role }) {
  return (
    <article className="relative">
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-24 md:pb-32 md:pt-28">
        <Link
          href="/careers#open-roles"
          className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-text-muted transition-colors hover:text-primary"
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All open roles
        </Link>

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
            ManaMind
          </span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-text-muted">
            {role.date}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-text-muted">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-primary">
            <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest">
            {role.location}
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-foreground md:text-6xl">
          {role.title}
        </h1>

        <div className="mt-8 space-y-4 text-lg leading-relaxed text-text-muted md:text-xl">
          {role.hookQuestions.map((q, i) => (
            <p key={i}>{q}</p>
          ))}
        </div>

        <Section eyebrow="// ABOUT_US" title="About us">
          <div className="space-y-3 text-[15px] leading-relaxed text-text-muted md:text-base">
            {role.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Section>

        <Section eyebrow="// THE_ROLE" title="The role">
          <div className="space-y-4 text-[15px] leading-relaxed text-text-muted md:text-base">
            {role.roleParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Section>

        <Section eyebrow="// RESPONSIBILITIES" title="Key responsibilities">
          <ul className="space-y-5">
            {role.responsibilities.map((r, i) => (
              <li
                key={r.label}
                className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-4"
              >
                <span className="font-mono text-sm font-bold leading-tight text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-base font-bold text-foreground md:text-lg">
                    {r.label}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-text-muted md:text-base">
                    {r.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section eyebrow="// FIT" title="You're a good fit if you...">
          <p className="text-[15px] leading-relaxed text-text-muted md:text-base">
            {role.fitIntro}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {role.fitBoxes.map((box) => (
              <div
                key={box.label}
                className="rounded-2xl border border-white/[0.07] bg-bg-card/40 p-5"
              >
                <p className="text-[13px] font-bold uppercase tracking-wider text-primary">
                  {box.label}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-text-muted">
                  {box.body}
                </p>
              </div>
            ))}
          </div>
          {role.bonus && (
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/[0.03] p-5">
              <p className="text-[13px] font-bold uppercase tracking-wider text-primary">
                {role.bonus.label}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-text-muted">
                {role.bonus.body}
              </p>
            </div>
          )}
        </Section>

        <Section eyebrow="// OFFER" title="What's on offer">
          <div className="grid gap-4 md:grid-cols-2">
            {offers.map((o) => (
              <div
                key={o.label}
                className="rounded-2xl border border-white/[0.07] bg-bg-card/40 p-5"
              >
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                  {o.label}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-foreground/90">
                  {o.body}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <div className="mt-16 rounded-3xl border border-primary/20 bg-primary/[0.04] p-8 text-center md:p-12">
          <h2 className="text-2xl font-black tracking-tight text-foreground md:text-4xl">
            Get on board. Apply now.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted md:text-base">
            Think you have the skill and drive to thrive in this role? We can&rsquo;t wait to meet you and get a taste of your work.
          </p>
          <a
            href={role.applyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-primary px-10 py-3.5 text-sm font-bold uppercase tracking-widest text-background transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(0,255,150,0.4)]"
          >
            Apply
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 border-t border-white/[0.06] pt-10 md:mt-16">
      <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
