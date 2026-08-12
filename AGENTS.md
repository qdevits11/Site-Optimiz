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

## Copy: no em dashes

Never use the em dash character (`—`, U+2014) anywhere in site-facing
copy (pages, components, emails, articles, SEO text, `llms*.txt`, etc.).
Prefer a comma, period, colon, parentheses, or a normal hyphen `-` instead.
En dashes in ranges like `1–10` are also avoided when writing new UI
labels; use `1-10` or `1 à 10`.

## Layout: clear the fixed nav on every page

The site nav is `position: fixed`. Page content must never sit under it or
be clipped by it.

- Use the CSS variable `--site-nav-clearance` (defined in `globals.css`) for
  top padding / scroll offset on first-screen sections (`.page-shell`,
  `.visit-manage-section`, `.hero`, confirmation, etc.).
- Do not reduce top padding below `--site-nav-clearance` on mobile.
- New pages and sections that start below the nav must include at least
  `padding-top: var(--site-nav-clearance)` (or equivalent via `.page-shell`).
- For in-page anchors (except `/#devis` on the homepage hero), use
  `scroll-margin-top: var(--site-nav-clearance)` or rely on
  `html { scroll-padding-top: var(--site-nav-clearance) }`.

## Buttons: order and colors

Action button groups must follow this order and styling everywhere
(LeadQualifier, confirmation, `/visite/gerer`, etc.):

1. **Primary action** first: green `btn-primary-glow` / `--accent` (confirm,
   modify, choose date, etc.).
2. **Retour** next: gray `btn-ghost`, always after the primary action.
3. **Destructive / suppression** last: classic UX critical red via
   `btn-danger-glow` / `--danger` (`#dc2626`). Use it for Annuler,
   supprimer, confirmer une annulation, or any irreversible/critical
   action. Never use green for destructive actions, and never place a
   destructive button before primary/retour.

If the screen’s main action *is* destructive (e.g. “Confirmer
l’annulation”), use `btn-danger-glow` as that primary, then Retour after
it. Do not place Retour before the primary CTA.
