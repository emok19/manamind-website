# AEO Notes

Reviewed against repository source on 2 November 2026. The published file is [`public/llms.txt`](../public/llms.txt); it is maintained by hand, not generated from content.

## What /llms.txt Is For

`/llms.txt` gives AI assistants and retrieval agents a compact, human-readable summary of the canonical public pages and positioning for ManaMind. It is intended to reduce ambiguity when a model or crawler is trying to understand the site from a small number of high-signal URLs.

## What It Does Not Guarantee

`/llms.txt` does not guarantee inclusion, ranking, citation, or correct summarisation in any AI product. It is advisory metadata, not a directive. Search engines, AI crawlers, and assistant products may ignore it, crawl other pages, or apply their own ranking and safety systems.

## Why We Are Not Adding /llms-full.txt Yet

The current file covers the main canonical pages, three career pages, and the published Husk Protocol case study. Blog and How It Works remain thin/noindex, and three case-study drafts remain unpublished. There is no `/llms-full.txt` in this checkout. A larger summary would require substantive, approved public content and a maintenance owner; it should not include drafts or unsupported claims.

## Maintaining the Current File

- Update `public/llms.txt` when publishing, renaming, or removing a career page or case study, or changing public product positioning.
- Update `public/sitemap.xml` and affected links/redirects in the same change. Neither file updates automatically from `content/`.
- Husk Protocol is already live and included; other case-study drafts must be completed and published before being listed.
- Check each summary against visible public content. Do not treat `/llms.txt` as evidence of search indexing, crawler adoption, or inclusion in an AI answer.

## Future AEO Opportunities

As additional case studies, substantive blog posts, or deeper product pages become public and indexable, ManaMind can expand AEO coverage by:

- Adding those pages to `/llms.txt` only when they are canonical and substantive.
- Creating `/llms-full.txt` with richer page summaries and source groupings.
- Publishing concise explainer pages for product concepts such as Hivemind, Command Centre, Legion, and Bots.
- Adding FAQ-style content based on real buyer and candidate questions.
- Keeping AI-facing summaries aligned with sitemap, robots, canonical metadata, and visible public page content.
