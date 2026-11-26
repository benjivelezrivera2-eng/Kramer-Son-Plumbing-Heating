# 39 — FAQ nav + homepage testimonials

**Issue:** [#74](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/74)  
**Branch:** `faq-nav-testimonials`

## Outcome

Visitors can jump to FAQ from the top nav. The homepage shows three demo testimonials so the site reads like a local Sterling shop. Testimonials stay off the navbar.

## Files

- `src/components/SiteHeader.tsx` — add FAQ to `sectionNav`
- `src/sections/FaqSection.tsx` — add `id="faq"` and `scroll-mt-24`
- `src/pages/HomePage.tsx` — mount `ReviewsSection` after About, before FAQ
- `src/config/business.ts` — refresh `reviews`; mark demo data
- `src/sections/ReviewsSection.tsx` — keep on-brand; ensure demo notice is clear

## Steps

1. Add `{ label: "FAQ", to: "/#faq", hash: "faq" }` to `sectionNav` (desktop + mobile already map the array).
2. On `FaqSection` root `<section>`, set `id="faq"` and `scroll-mt-24` to match About/Contact.
3. Import and render `ReviewsSection` on `HomePage` between `AboutSection` and `FaqSection`.
4. Refresh review quotes for Sterling-area feel; no em dashes; keep claims generic. Add `isDemoData: true` (or equivalent) plus a REPLACE BEFORE LIVE comment/TODO.
5. Keep ReviewsSection navy/gold/Gabarito/Geist; only light copy polish if needed.
6. `npm run build`, then PR → merge → wait for Vercel production READY.

## Verify

- Desktop and mobile nav show FAQ; click scrolls to FAQ on `/`.
- Testimonials visible on homepage; not in navbar.
- Build passes; production URL shows the changes.

## Notes for Benji

- Quotes are fictional demo samples — replace before any live/client use.
- Optional later: Google reviews embed when GBP is live.
