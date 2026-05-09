"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";

type RetreatPhoto = { src: string; caption: string; aspect?: string };

const retreatPhotos: RetreatPhoto[] = [
  { src: "/retreats/chateau-exterior.jpeg", caption: "Loire Valley, France" },
  { src: "/retreats/morocco-pool.jpeg", caption: "Marrakech, Morocco" },
  { src: "/retreats/outdoor-coast.jpeg", caption: "Floda, Sweden" },
  { src: "/retreats/chateau-team.jpeg", caption: "Loire Valley, France" },
  { src: "/retreats/morocco-fez.jpeg", caption: "Marrakech, Morocco" },
  { src: "/retreats/chateau-staircase.jpeg", caption: "Loire Valley, France" },
  { src: "/retreats/sweden-team.jpeg", caption: "Tenerife, Spain", aspect: "1 / 1" },
];

const merchPhotos: RetreatPhoto[] = [
  { src: "/merch/placeholder-1.svg", caption: "Patches" },
  { src: "/merch/placeholder-2.svg", caption: "Jacket" },
  { src: "/merch/placeholder-3.svg", caption: "Bot figures" },
  { src: "/merch/placeholder-4.svg", caption: "Stickers" },
];

type Perk = {
  id: string;
  title: string;
  tagline: string;
  body: string;
  color: string;
  icon: React.ReactNode;
  photos?: RetreatPhoto[];
};

const perks: Perk[] = [
  {
    id: "retreats",
    title: "Company retreats",
    tagline: "We don't do generic off-sites",
    body: "Through our network, the team has worked and travelled from places like a 16th-century French château, remote locations in the Moroccan desert, and private island environments in Hawaii. These trips are an opportunity to step away from daily work, think long-term, and spend time with other builders in our ecosystem.",
    color: "#00FF96",
    photos: retreatPhotos,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M3 21h18M5 21V8l7-5 7 5v13" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "merch",
    title: "The coolest merch ever",
    tagline: "Milestones become physical artefacts",
    body: "We are all nerds here so when we had the opportunity to start making our own merch, of course, we went all in. As we build out ManaMind's ecosystem of autonomous agents, we're creating a line of physical collectibles to represent them. Each major milestone unlocks unique velcro patches for your company jacket, and contributors to new bot releases receive a physical figure of that agent.",
    color: "#F59E0B",
    photos: merchPhotos,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 8l8 8M16 8l-8 8" strokeLinecap="round" opacity="0.4" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: "early-games",
    title: "Early access to unreleased games",
    tagline: "See games before they release",
    body: "Because we work directly with studios, we often get access to unreleased builds months before launch. In this job, playing games isn't procrastination, it's literally part of the work!",
    color: "#A78BFA",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <rect x="2" y="6" width="20" height="12" rx="3" />
        <path d="M7 12h4M9 10v4" strokeLinecap="round" />
        <circle cx="16" cy="11" r="1" fill="currentColor" />
        <circle cx="18" cy="13" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "tech",
    title: "Work with the coolest tech available",
    tagline: "Cutting-edge AI infrastructure",
    body: "As part of the Nvidia Inception program, we get early and priority access to new GPUs, tooling, and technical support. This allows our team to experiment with and deploy state-of-the-art AI infrastructure without the constraints that often slow down smaller companies.",
    color: "#38BDF8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "office",
    title: "Central London office",
    tagline: "Heart of the UK games industry",
    body: "We operate from UKIE's offices near Farringdon, surrounded by other game studios and startups. The space is filled with industry history, gaming memorabilia, and people building the next generation of interactive entertainment.",
    color: "#EC4899",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M12 22s8-7 8-13a8 8 0 10-16 0c0 6 8 13 8 13z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="3" />
      </svg>
    ),
  },
  {
    id: "comp",
    title: "Competitive compensation",
    tagline: "Salary and equity aligned with impact",
    body: "We offer competitive salaries and meaningful equity packages so that the people building ManaMind share in the long-term value they help create.",
    color: "#22D3EE",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9 9.5c0-1 1-2 3-2s3 1 3 2-1 1.5-3 2-3 1-3 2 1 2 3 2 3-1 3-2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "health",
    title: "Health and dental coverage",
    tagline: "Support beyond the workplace",
    body: "Staying healthy is a key priority for our team. That's why we offer optional top-tier health and dental covers for our team.",
    color: "#34D399",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function PhotoGallery({ photos }: { photos: RetreatPhoto[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ down: false, startX: 0, scrollLeft: 0, moved: false });

  const scroll = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    dragRef.current = {
      down: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    dragRef.current.down = false;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    el.style.cursor = "grab";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.down) return;
    const el = ref.current;
    if (!el) return;
    const delta = e.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 4) dragRef.current.moved = true;
    el.scrollLeft = dragRef.current.scrollLeft - delta;
  };

  return (
    <div
      className="relative mt-6 -mx-5 sm:-mx-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerMove={onPointerMove}
        className="flex cursor-grab gap-3 overflow-x-auto scroll-smooth px-5 pb-3 [&::-webkit-scrollbar]:hidden sm:px-6 md:gap-4"
        style={{ scrollbarWidth: "none" }}
      >
        {photos.map((photo, i) => (
          <div
            key={`${photo.src}-${i}`}
            className="group relative h-48 shrink-0 select-none overflow-hidden rounded-xl border border-white/[0.08] sm:h-56 md:h-64"
            style={{ aspectRatio: photo.aspect ?? "4 / 3" }}
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              draggable={false}
              className="pointer-events-none object-cover"
              sizes="(max-width: 768px) 280px, 360px"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="pointer-events-none absolute bottom-2.5 left-3 font-mono text-[10px] font-bold uppercase tracking-widest text-white/90">
              {photo.caption}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-black/80 hover:text-primary"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-black/80 hover:text-primary"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

function ExpandedBody({ perk }: { perk: Perk }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="pt-5">
        <p className="text-sm leading-relaxed text-text-muted md:text-base">
          {perk.body}
        </p>

        {perk.photos && <PhotoGallery photos={perk.photos} />}
      </div>
    </motion.div>
  );
}

export function Perks() {
  const [expanded, setExpanded] = useState<string | null>("retreats");

  return (
    <section className="relative border-t border-white/5 py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,255,150,0.04)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-primary md:text-4xl">
              {`// PERKS`}
            </h2>
            <p className="mt-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              How we look after the team
            </p>
          </div>
        </FadeInView>

        <div className="mx-auto mt-16 max-w-3xl">
          {perks.map((perk, i) => {
            const isExpanded = expanded === perk.id;
            return (
              <FadeInView key={perk.id} delay={i * 0.05}>
                <div className="relative">
                  {i < perks.length - 1 && (
                    <div className="absolute left-8 top-full z-0 h-4 w-px bg-gradient-to-b from-white/10 to-transparent" />
                  )}

                  <motion.button
                    type="button"
                    onClick={() => setExpanded(isExpanded ? null : perk.id)}
                    className="group relative mb-4 w-full cursor-pointer overflow-hidden rounded-2xl border text-left transition-colors"
                    style={{
                      borderColor: isExpanded ? `${perk.color}40` : "rgba(255,255,255,0.07)",
                      backgroundColor: isExpanded ? `${perk.color}06` : "rgba(30,13,38,0.6)",
                    }}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <motion.div
                      className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
                      style={{ backgroundColor: perk.color }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                            style={{
                              backgroundColor: `${perk.color}12`,
                              color: perk.color,
                            }}
                          >
                            {perk.icon}
                          </div>

                          <div>
                            <h3
                              className="text-lg font-bold transition-colors"
                              style={{ color: isExpanded ? perk.color : "var(--foreground)" }}
                            >
                              {perk.title}
                            </h3>
                            <p className="mt-0.5 text-xs text-text-muted">
                              {perk.tagline}
                            </p>
                          </div>
                        </div>

                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="shrink-0 text-text-muted"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                          </svg>
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && <ExpandedBody perk={perk} />}
                      </AnimatePresence>
                    </div>
                  </motion.button>
                </div>
              </FadeInView>
            );
          })}
        </div>

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
