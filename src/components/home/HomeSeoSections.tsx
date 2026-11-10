import Link from "next/link";

// Two compact homepage sections from "ManaMind SEO v1" (homepage H2 plan).
// Copy reuses facts already on the site: the four steps (BotInteraction) and the no-SDK / NDA positioning.

const STEPS = [
  { n: "01", t: "See the screen", d: "The bot watches the game exactly as a player sees it: HUD, menus, characters and the world behind them.", c: "#8AE9D0" },
  { n: "02", t: "Reason", d: "HiveMind, our game-native model, works out what is happening and what the player is trying to do.", c: "#DA97FF" },
  { n: "03", t: "Plan the next action", d: "The bot decides what a real player would do next, instead of following a fixed script.", c: "#FFFEBA" },
  { n: "04", t: "Log and report issues", d: "Anything wrong becomes a verified bug report with the frame, the steps and a clear explanation.", c: "#F3DEFF" },
];

export function HomeHowItWorks() {
  return (
    <section className="relative border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">How it works</span>
          <h2 className="text-3xl font-bold text-foreground md:text-5xl">How AI game testing works: from gameplay to bug reports</h2>
          <p className="mt-5 text-lg text-text-muted">
            Every ManaMind bot runs the same four-step loop on your build, the way a real player would.
          </p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-2xl border border-white/10 bg-bg-card/70 p-6">
              <span className="font-display text-sm font-bold" style={{ color: s.c }}>{s.n}</span>
              <h3 className="mt-3 text-lg font-bold text-foreground">{s.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-center text-sm text-text-muted">
          <Link href="/how-it-works" className="font-semibold text-primary hover:underline">See the full walkthrough and a real bug report →</Link>
        </p>
      </div>
    </section>
  );
}

export function NoSourceCode() {
  return (
    <section className="relative border-t border-white/5 bg-bg-card py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Zero integration</span>
          <h2 className="text-3xl font-bold text-foreground md:text-5xl">Game testing without source code or SDKs</h2>
          <p className="mt-6 text-lg leading-relaxed text-text-muted">
            Traditional test automation needs engineers to wire scripts into your engine, and those scripts break every time the UI changes. ManaMind works the other way round. Our bots test through the screen, the same way your players do, so there is nothing to install inside your game.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            You share a build and your reference material. The bots start playing, with no scripting and no training on your game, and they move from one title to the next without being rebuilt. That makes <Link href="/product" className="font-semibold text-primary hover:underline">automated game testing</Link> practical for small teams and safe for unreleased games under NDA.
          </p>
        </div>
        <ul className="grid gap-4">
          {[
            ["No source code access", "The bots test the build you already have, through the screen, like a player."],
            ["No SDK or engine integration", "Nothing to install or maintain inside your game, whatever engine it runs on."],
            ["No scripting", "Describe the test in plain language and the bots work out how to do it."],
          ].map(([t, d]) => (
            <li key={t} className="flex gap-4 rounded-2xl border border-white/10 bg-background/60 p-6">
              <span aria-hidden="true" className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">✓</span>
              <div>
                <h3 className="text-lg font-bold text-foreground">{t}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-text-muted">{d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
