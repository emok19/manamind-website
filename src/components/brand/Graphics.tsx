// ManaMind brand graphics (Brand Playbook v0.1, chapter 05):
// The Cut, the Tiles pattern and Glows. Pure SVG/CSS, no images, deterministic output.

import { SYMBOL_PIECES } from "./Logo";

type Accent = "arcane" | "aether" | "elixir" | "lumen";

const ACCENT_RGB: Record<Accent, string> = {
  arcane: "126,77,185",
  aether: "218,151,255",
  elixir: "138,233,208",
  lumen: "255,254,186",
};

/* ------------------------------------------------------------------ Glow */

export function Glow({
  accent = "arcane",
  position = "bottom",
  strength = 0.5,
  className = "",
}: {
  accent?: Accent;
  position?: "bottom" | "center" | "top" | "bottom-left" | "bottom-right";
  strength?: number;
  className?: string;
}) {
  const at = {
    bottom: "50% 100%",
    center: "50% 50%",
    top: "50% 0%",
    "bottom-left": "15% 100%",
    "bottom-right": "85% 100%",
  }[position];
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background: `radial-gradient(ellipse 75% 65% at ${at}, rgba(${ACCENT_RGB[accent]},${strength}) 0%, rgba(23,0,85,0) 72%)`,
      }}
    />
  );
}

/* ------------------------------------------------------------------ Tiles */

// Normalise each of the four symbol pieces into its own unit box.
const PIECES = SYMBOL_PIECES.map((pts) => {
  const xy = pts.split(" ").map((p) => p.split(",").map(Number));
  const xs = xy.map((p) => p[0]);
  const ys = xy.map((p) => p[1]);
  const x0 = Math.min(...xs);
  const y0 = Math.min(...ys);
  const s = Math.max(Math.max(...xs) - x0, Math.max(...ys) - y0);
  return xy.map(([x, y]) => [(x - x0) / s, (y - y0) / s] as [number, number]);
});

function prng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildTiles(cols: number, rows: number, density: number, seed: number) {
  const rnd = prng(seed);
  const occ: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  const out: { points: string; key: string }[] = [];
  const tries = cols * rows * 3;
  for (let i = 0; i < tries; i++) {
    const sc = [1, 1, 2, 2, 3][Math.floor(rnd() * 5)];
    const cx = Math.floor(rnd() * (cols - sc + 1));
    const cy = Math.floor(rnd() * (rows - sc + 1));
    let free = true;
    for (let y = cy; y < cy + sc && free; y++) for (let x = cx; x < cx + sc; x++) if (occ[y][x]) { free = false; break; }
    if (!free || rnd() > density) continue;
    for (let y = cy; y < cy + sc; y++) for (let x = cx; x < cx + sc; x++) occ[y][x] = true;
    const piece = PIECES[Math.floor(rnd() * 4)];
    const rot = Math.floor(rnd() * 4);
    const pad = 0.08 * sc;
    const pts = piece
      .map(([px, py]) => {
        let x = px;
        let y = py;
        for (let r = 0; r < rot; r++) [x, y] = [1 - y, x];
        return `${(cx + pad + x * (sc - 2 * pad)).toFixed(3)},${(cy + pad + y * (sc - 2 * pad)).toFixed(3)}`;
      })
      .join(" ");
    out.push({ points: pts, key: `${i}` });
  }
  return out;
}

export function Tiles({
  cols = 24,
  rows = 12,
  density = 0.55,
  seed = 7,
  color = "#7E4DB9",
  opacity = 0.35,
  outlined = false,
  fade = "radial",
  className = "",
}: {
  cols?: number;
  rows?: number;
  density?: number;
  seed?: number;
  color?: string;
  opacity?: number;
  outlined?: boolean;
  fade?: "radial" | "right" | "left" | "bottom" | "none";
  className?: string;
}) {
  const tiles = buildTiles(cols, rows, density, seed);
  const mask = {
    radial: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 25%, black 85%)",
    right: "linear-gradient(90deg, transparent 35%, black 100%)",
    left: "linear-gradient(270deg, transparent 35%, black 100%)",
    bottom: "linear-gradient(180deg, transparent 30%, black 100%)",
    none: "none",
  }[fade];
  return (
    <div
      aria-hidden="true"
      className={`mm-tiles pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ WebkitMaskImage: mask, maskImage: mask }}
    >
      <svg viewBox={`0 0 ${cols} ${rows}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        {tiles.map((t) => (
          <polygon
            key={t.key}
            points={t.points}
            fill={outlined ? "none" : color}
            stroke={outlined ? color : "none"}
            strokeWidth={outlined ? 0.03 : 0}
            opacity={opacity}
          />
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ The Cut */

// A straight line and a 45° diagonal cross at one point; two opposite sections take colour.
export function TheCut({
  x = 0.62,
  y = 0.62,
  className = "",
  fill = "spectrum",
  lowerOpacity = 0.55,
}: {
  x?: number;
  y?: number;
  className?: string;
  fill?: "spectrum" | "aether" | "elixir" | "lumen" | "arcane";
  lowerOpacity?: number;
}) {
  const W = 1600;
  const H = 900;
  const X = W * x;
  const Y = H * y;
  // Diagonal through (X, Y) at 45°: points where it meets y=0 and y=H.
  const topX = X + Y; // going up-right
  const botX = X - (H - Y); // going down-left
  const upper = `${topX},0 ${W},0 ${W},${Y} ${X},${Y}`;
  const lower = `0,${Y} ${X},${Y} ${botX},${H} 0,${H}`;
  const solid: Record<string, string> = { aether: "#DA97FF", elixir: "#8AE9D0", lumen: "#FFFEBA", arcane: "#7E4DB9" };
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id="mm-spectrum-cut" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#7E4DB9" />
          <stop offset="0.33" stopColor="#DA97FF" />
          <stop offset="0.66" stopColor="#8AE9D0" />
          <stop offset="1" stopColor="#FFFEBA" />
        </linearGradient>
        <linearGradient id="mm-cut-lower" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DA97FF" />
          <stop offset="1" stopColor="#170055" />
        </linearGradient>
      </defs>
      <polygon points={upper} fill={fill === "spectrum" ? "url(#mm-spectrum-cut)" : solid[fill]} />
      <polygon points={lower} fill="url(#mm-cut-lower)" opacity={lowerOpacity} />
      <line x1="0" y1={Y} x2={W} y2={Y} stroke="#DA97FF" strokeOpacity="0.35" strokeWidth="1.5" />
      <line x1={botX} y1={H} x2={topX} y2="0" stroke="#DA97FF" strokeOpacity="0.35" strokeWidth="1.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ Section backdrop */

export function BrandBackdrop({
  accent = "arcane",
  tiles = true,
  seed = 11,
  outlined = true,
  fade = "right" as const,
}: {
  accent?: Accent;
  tiles?: boolean;
  seed?: number;
  outlined?: boolean;
  fade?: "radial" | "right" | "left" | "bottom" | "none";
}) {
  return (
    <>
      <Glow accent={accent} strength={accent === "arcane" ? 0.5 : 0.28} />
      {tiles ? <Tiles seed={seed} outlined={outlined} fade={fade} color={outlined ? "#7E4DB9" : "#7E4DB9"} opacity={outlined ? 0.55 : 0.18} /> : null}
    </>
  );
}
