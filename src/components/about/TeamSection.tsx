import Image from "next/image";
import { FadeInView } from "@/components/animations/FadeInView";
import type { TeamMember } from "@/lib/content/team";

// Team grid: photo, name, role and LinkedIn. No bios (decided 9 Nov 2026).
export function TeamSection({ team }: { team: TeamMember[] }) {
  return (
    <section className="border-t border-white/5 bg-bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              The Team
            </span>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              The people behind ManaMind
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-text-muted">
              A small team of outliers: AI researchers, engineers and games industry veterans, and lifelong gamers
              to the core. We build the testing tools we always wished game teams had.
            </p>
            <p className="mt-4 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-widest text-text-muted/70">
              <span>Founded 2025</span>
              <span className="h-1 w-1 rounded-full bg-text-muted/40" aria-hidden />
              <span>HQ London</span>
            </p>
          </div>
        </FadeInView>

        <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {team.map((member) => (
            <li key={member.name} className="flex flex-col items-center text-center">
              <div className="mb-4 h-36 w-36 overflow-hidden rounded-2xl border border-white/[0.07] bg-background/60 sm:h-40 sm:w-40">
                <Image src={member.photo} alt={member.name} width={160} height={160} className="h-full w-full object-cover" />
              </div>
              <h3 className="text-base font-bold text-foreground">{member.name}</h3>
              <p className="mt-0.5 text-xs text-text-muted">{member.role}</p>
              {member.linkedin ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-text-muted transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
                  LinkedIn
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
