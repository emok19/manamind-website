import Link from "next/link";
import type { ReactNode } from "react";

// Minimal markdown renderer for our own blog files: ## / ### headings, paragraphs,
// "- " lists, **bold**, [links](/path) and standalone ![images](/path). Output is plain server-rendered HTML.

function inline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={`${key}-b${i++}`} className="font-semibold text-foreground">{m[1]}</strong>);
    else {
      const href = m[3];
      const cls = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";
      out.push(
        href.startsWith("/") ? (
          <Link key={`${key}-l${i++}`} href={href} className={cls}>{inline(m[2], `${key}-li${i}`)}</Link>
        ) : (
          <a key={`${key}-l${i++}`} href={href} className={cls} target="_blank" rel="noopener noreferrer">{m[2]}</a>
        ),
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\s*\n/);
  return (
    <div className="space-y-6 text-[17px] leading-[1.75] text-text-muted">
      {blocks.map((block, bi) => {
        const b = block.trim();
        const key = `b${bi}`;
        const img = b.match(/^!\[(.*?)\]\((\S+?)\)$/);
        if (img) {
          return (
            <figure key={key} className="py-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img[2]} alt={img[1]} loading="lazy" decoding="async" className="mx-auto w-full max-w-xl rounded-2xl border border-white/10" />
            </figure>
          );
        }
        if (b.startsWith("### ")) return <h3 key={key} className="pt-2 text-xl font-bold text-foreground">{inline(b.slice(4), key)}</h3>;
        if (b.startsWith("## ")) return <h2 key={key} id={b.slice(3).toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="scroll-mt-24 pt-6 text-2xl font-bold text-foreground md:text-3xl">{inline(b.slice(3), key)}</h2>;
        if (b.split("\n").every((l) => l.trim().startsWith("- "))) {
          return (
            <ul key={key} className="space-y-3 pl-1">
              {b.split("\n").map((l, li) => (
                <li key={li} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{inline(l.trim().slice(2), `${key}-${li}`)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={key}>{inline(b.replace(/\n/g, " "), key)}</p>;
      })}
    </div>
  );
}
