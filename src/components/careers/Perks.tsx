"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";

type Perk = {
  title: string;
  tagline: string;
  body: string;
  color: string;
  icon: React.ReactNode;
};

// Featured perk (gets the wide hero treatment)
const featured: Perk = {
  title: "Company retreats",
  tagline: "We don't do generic off-sites",
  body: "Through our network, the team has worked and travelled from places like a 16th-century French château, remote locations in the Moroccan desert, and private island environments in Hawaii. These trips are an opportunity to step away from daily work, think long-term, and spend time with other builders in our ecosystem.",
  color: "#00FF96",
  icon: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
    >
      <path
        d="M3 21h18M5 21V8l7-5 7 5v13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 21v-6h6v6" strokeLinecap="round" />
    </svg>
  ),
};

type RetreatPhoto = { src: string; caption: string; wide?: boolean };

const retreatPhotos: RetreatPhoto[] = [
  { src: "/retreats/chateau-exterior.jpeg", caption: "Loire Valley, France" },
  { src: "/retreats/morocco-pool.jpeg", caption: "Marrakech, Morocco" },
  { src: "/retreats/outdoor-coast.jpeg", caption: "Sweden" },
  { src: "/retreats/chateau-team.jpeg", caption: "Loire Valley, France" },
  { src: "/retreats/morocco-fez.jpeg", caption: "Marrakech, Morocco" },
  { src: "/retreats/chateau-staircase.jpeg", caption: "Loire Valley, France" },
  { src: "/retreats/sweden-team.jpeg", caption: "Sweden", wide: true },
];

const others: Perk[] = [
  {
    title: "Early access to unreleased games",
    tagline: "See games before they release",
    body: "Because we work directly with studios, we often get access to unreleased builds months before launch. In this job, playing games isn't procrastination, it's literally part of the work!",
    color: "#A78BFA",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6"
      >
        <rect x="2" y="6" width="20" height="12" rx="3" />
        <path d="M7 12h4M9 10v4" strokeLinecap="round" />
        <circle cx="16" cy="11" r="1" fill="currentColor" />
        <circle cx="18" cy="13" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Work with the coolest tech available",
    tagline: "Cutting-edge AI infrastructure",
    body: "As part of the Nvidia Inception program, we get early and priority access to new GPUs, tooling, and technical support. This allows our team to experiment with and deploy state-of-the-art AI infrastructure without the constraints that often slow down smaller companies.",
    color: "#38BDF8",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path
          d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "The coolest merch ever",
    tagline: "Milestones become physical artefacts",
    body: "We are all nerds here so when we had the opportunity to start making our own merch, of course, we went all in. As we build out ManaMind's ecosystem of autonomous agents, we're creating a line of physical collectibles to represent them. Each major milestone unlocks unique velcro patches for your company jacket, and contributors to new bot releases receive a physical figure of that agent.",
    color: "#F59E0B",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6"
      >
        <circle cx="12" cy="12" r="9" />
        <path
          d="M8 8l8 8M16 8l-8 8"
          strokeLinecap="round"
          opacity="0.4"
        />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Central London office",
    tagline: "Heart of the UK games industry",
    body: "We operate from UKIE's offices near Farringdon, surrounded by other game studios and startups. The space is filled with industry history, gaming memorabilia, and people building the next generation of interactive entertainment.",
    color: "#EC4899",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6"
      >
        <path
          d="M12 22s8-7 8-13a8 8 0 10-16 0c0 6 8 13 8 13z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9" r="3" />
      </svg>
    ),
  },
  {
    title: "Competitive compensation",
    tagline: "Salary and equity aligned with impact",
    body: "We offer competitive salaries and meaningful equity packages so that the people building ManaMind share in the long-term value they help create.",
    color: "#22D3EE",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6"
      >
        <circle cx="12" cy="12" r="9" />
        <path
          d="M12 7v10M9 9.5c0-1 1-2 3-2s3 1 3 2-1 1.5-3 2-3 1-3 2 1 2 3 2 3-1 3-2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Health and dental coverage",
    tagline: "Support beyond the workplace",
    body: "Staying healthy is a key priority for our team. That's why we offer optional top-tier health and dental covers for our team.",
    color: "#34D399",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function Perks() {
  return (
    <section className="relative border-t border-white/5 py-24 md:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,255,150,0.04)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
              {`// PERKS`}
            </span>
            <h2 className="text-3xl font-bold text-foreground md:text-5xl">
              How we look after the team
            </h2>
          </div>
        </FadeInView>

        <div className="mx-auto mt-16 max-w-6xl">
          {/* Featured retreat card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-[#00FF9610] via-bg-card/40 to-transparent p-8 md:p-12"
            style={{ borderColor: `${featured.color}30` }}
          >
            {/* Top gradient line */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${featured.color}99, transparent)`,
              }}
            />

            {/* Top: text content */}
            <div className="grid gap-6 md:grid-cols-[auto,1fr] md:items-start md:gap-8">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  color: featured.color,
                  backgroundColor: `${featured.color}15`,
                }}
              >
                {featured.icon}
              </div>
              <div>
                <span
                  className="font-mono text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: featured.color }}
                >
                  Featured
                </span>
                <h3 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
                  {featured.title}
                </h3>
                <p
                  className="mt-2 text-base font-medium"
                  style={{ color: featured.color }}
                >
                  {featured.tagline}
                </p>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-muted">
                  {featured.body}
                </p>
              </div>
            </div>

            {/* Bottom: photo grid (3x2 + wide hero) */}
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {retreatPhotos.map((photo, i) => (
                <motion.div
                  key={photo.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className={`group relative overflow-hidden rounded-xl border border-white/[0.08] ${
                    photo.wide
                      ? "col-span-2 aspect-[16/9] md:col-span-3 md:aspect-[21/9]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes={
                      photo.wide
                        ? "(max-width: 768px) 100vw, 100vw"
                        : "(max-width: 768px) 50vw, 33vw"
                    }
                  />
                  {/* Bottom gradient for caption legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {/* Caption */}
                  <span className="absolute bottom-2.5 left-3 font-mono text-[10px] font-bold uppercase tracking-widest text-white/90">
                    {photo.caption}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Grid of other perks */}
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.07 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-bg-card/40 p-7 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top accent on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${perk.color}99, transparent)`,
                  }}
                />

                {/* Number badge */}
                <span
                  className="absolute right-5 top-5 font-mono text-[10px] font-bold tracking-widest opacity-50"
                  style={{ color: perk.color }}
                >
                  0{i + 2}
                </span>

                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    color: perk.color,
                    backgroundColor: `${perk.color}15`,
                  }}
                >
                  {perk.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold text-foreground">
                  {perk.title}
                </h3>
                <p
                  className="mt-1.5 text-xs font-medium"
                  style={{ color: perk.color }}
                >
                  {perk.tagline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">
                  {perk.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing line */}
        <FadeInView delay={0.3}>
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="relative rounded-2xl border border-primary/20 bg-primary/[0.03] p-8 text-center">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-primary/30 bg-background px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                {`// CLOSING`}
              </span>
              <p className="text-base leading-relaxed text-text-muted md:text-lg">
                Great work happens when people feel supported, inspired, and
                excited to show up every day. These perks are one way in which
                we make that possible.
              </p>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
