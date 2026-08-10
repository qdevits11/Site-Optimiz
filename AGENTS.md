<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Optmiz project rules

## SEO: notify search engines after content changes

Whenever a change is made that affects indexable content — a new page, a new
article in `src/lib/articles.ts`, a new/updated route in `src/app/`, or an
edit to existing page copy/metadata that changes `sitemap.xml` — run the
IndexNow submission **after the change is deployed to production**
(`www.optmiz.be`), since the script reads the live sitemap:

```bash
npm run submit:indexnow
```

This pushes every URL in `sitemap.xml` to Bing, Yandex, Naver, Seznam.cz and
Yep via the IndexNow protocol (see `scripts/submit-indexnow.mjs`). It
requires no login. Google does not support IndexNow — sitemap changes for
Google still need Search Console (property already verified for
`optmiz.be`; see README.md "SEO & GEO" section for the manual steps).

Do this automatically, without waiting to be asked, any time you ship
content changes for this site.
