# ManaMind performance review

Source review: 2 November 2026. Original measurement date: 18 March 2026. The site has changed substantially since that audit. This document records current source behavior separately from historical measurements; it does not report a fresh build, bundle analysis, Lighthouse score, or production Core Web Vitals result.

## Current source findings

| Area | What the source shows | What still needs measurement |
|---|---|---|
| 3D bot catalogue | `src/app/product/page.tsx` renders `BotSection`; the homepage does not. `BotSection.tsx` imports Three.js/Drei and `BotModel` normally, preloads all catalogue GLB models at module load, and mounts card canvases when near the viewport (`rootMargin: "400px"`). | Product-route JavaScript cost, model request timing, GPU memory/context count, and whether viewport gating gives sufficient benefit on mobile. |
| Particle hero | `ParticleCanvas.tsx` uses 80 particles on desktop/35 on mobile, a 33 ms drawing interval, idle startup, hidden-tab pause, and skips animation for reduced motion. Pairwise connection checks remain. | Main-thread/paint cost on representative devices; the old 150-particle calculation is superseded. |
| Fonts | Root layout loads local Swiza normal weights 400/500/600/700. More font files exist in `public/fonts/`, but they are not all declared in the layout. | Actual font transfer/preload behavior and text rendering in the browser. The old Inter-weight recommendation no longer applies. |
| Command Centre image | `ProductShowcase.tsx` uses `/product-screenshot.webp` at declared dimensions 1920 x 1080, with `w-full` and priority loading. Static export disables Next.js runtime image optimization. | Actual transferred dimensions, LCP element, and loading priority on mobile/desktop. Social metadata still references the separate PNG. |
| Animation | Framer Motion is used across shared UI and page sections; CSS contains additional animations. Reduced-motion support exists in `FadeInView`, ParticleCanvas, and selected CSS rules. | Runtime cost, offscreen activity, and reduced-motion behavior across all components. Package installation alone is not evidence that GSAP is in every route bundle. |
| Analytics | Root GA scripts use Next.js `Script` with `afterInteractive` and remain in the layout's head. Default analytics storage is denied; the banner updates consent. | Network/main-thread cost and consent behavior. Placement in `head` alone does not establish render blocking; inspect actual script scheduling. |
| Case-study media | Husk Protocol includes local WebP images and a local MP4, with required asset validation in the content loader. | Video/image loading on constrained connections, poster timing, and transferred payload. |

## Historical measurements, not current budgets

The 18 March audit recorded roughly 908 KB for Three.js/R3F/Drei, 220 KB for Framer Motion, and 2.1 MB of `.next/static` output. These were estimates from an earlier version; they must not be used as current bundle sizes or promised savings.

That audit described seven eagerly mounted homepage WebGL canvases, Inter fonts, missing SEO files, and a product page without Three.js. Those descriptions are superseded by the source findings above and [current SEO status](../seo-audit.md). The old suggestions to add robots/sitemap/metadata have already been implemented.

## Recommended next review

1. Install locked dependencies with `npm ci` and build with `npm run build`. Record the commit, Node version, build output, and measurement date.
2. Measure Home, Product, and Husk Protocol on representative mobile and desktop profiles. Record LCP, CLS, interaction responsiveness, JavaScript, image/model/video transfer, and the conditions used.
3. Inspect the product route's model preloads and per-card canvases before choosing between dynamic imports, later asset loading, fewer active canvases, or static fallbacks. No exact savings are established by this source review.
4. Inspect ParticleCanvas, Framer Motion sections, and 3D animation in performance traces and with reduced motion enabled.
5. Check image sizing and loading priority against the actual LCP element. Keep locally optimized assets because `images.unoptimized` is enabled.
6. Verify analytics behavior for first visit, acceptance, rejection, and reload, including what downloads before consent.

For deployment and preview commands, use the [handover guide](../../README.md). For metadata, sitemap maintenance, and external Search Console checks, use [SEO status](../seo-audit.md).
