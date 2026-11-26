# Demo public copy and proof pass

Branch: `demo-public-copy-proof`

Batch plan for issues [#61](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/61) through [#70](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/70). One plan file per issue also lives in this folder (`28`–`37`). **No code until Benji approves this plan in chat.**

Stack note: this is Vite + React + Tailwind (not Next.js). Deploy target stays Vercel preview via PR. Do not push to `main` or deploy production from this work.

## Shared demo config (do first)

Extend `src/config/business.ts` (do not invent a second facts file unless a rename is approved). Add typed demo fields with `isDemoData: true`:

| Field | Proposed sample (replace before live) |
|---|---|
| `owner` / `son` | Mike Kramer / Jake Kramer |
| `foundedYear` | 1998 |
| `yearsServing` | derived or explicit from founded year |
| `license` | `000000` |
| `rating` / `reviewCount` | 4.8 / 47 |
| `sameDayCutoff` | 12:00 noon, `America/Denver` |
| `hours` structured | weekdays 8–5 (keep display string in sync) |
| `closedHolidays` | Thanksgiving, Christmas Day, New Year's Day (+ list) |
| `aboutPhoto` | `{ src: "/photos/crew-van.jpg", alt: "..." }` |

Owner-confirm claims (generic on site; checklist on PR): flat price before work; one tech start to finish; parts on the truck; shoe covers / clean leave-behind.

Out of scope unless Benji says otherwise: `business.reviews` named quotes and unused `ReviewsSection.tsx`; `tel:` hrefs; untouched sections; new dependencies; new imagery.

## Booking submit (report only; do not change)

`BookingForm` submit validates, calls `sendVisitEmails(visit)`, then `onConfirm(visit)`. No change in this batch.

## Work order

1. **Config foundation** (supports #61–#69) → verify: TypeScript still builds; demo flag present.
2. **#61 Hero** → `HeroSection.tsx`, `business.hero` → one subtext, two CTAs.
3. **#62 + #70 Trust strip** → `TrustStrip.tsx` labels + aria-label together.
4. **#63 Proof row** → new section or inline under strip on `HomePage.tsx`.
5. **#64 Typical windows** → `business.serviceCategories` / `services` hedged strings; search FAQ/areas/detail and **report only**.
6. **#65 Book a visit labels** → header, hero, cards, detail, dialog submit, mobile bar; report leftovers.
7. **#66 About** → `ReasonsSection.tsx` body + photo from config.
8. **#67 Reason cards** → `business.reasons` + card styles in `ReasonsSection.tsx`.
9. **#68 Process** → `ProcessSection.tsx` + `business.process` step 1–2 bodies.
10. **#69 Booking dates** → `visitDayOptions` in `BookingDialog.tsx` (+ small helper if needed).
11. **Verify** → `npm run build`; lint/typecheck if scripts exist; screenshots 1280 / 375 of changed sections; mobile sticky bar; no hydration/console noise.
12. **PR** → preview deploy; description ends with **REPLACE BEFORE THIS GOES LIVE** checklist.

## Files likely touched

- `src/config/business.ts`
- `src/sections/HeroSection.tsx`
- `src/sections/TrustStrip.tsx`
- `src/pages/HomePage.tsx` (proof row mount)
- New small section component for proof row (if cleaner than inline)
- `src/sections/ServicesSection.tsx` (label only if still hardcodes book text)
- `src/pages/ServiceDetailPage.tsx`
- `src/components/BookingDialog.tsx`
- `src/components/MobileCtaBar.tsx` / `SiteHeader.tsx` (labels if needed)
- `src/sections/ReasonsSection.tsx`
- `src/sections/ProcessSection.tsx`

## Risks

- **Hydration / timezone:** date options must be client-stable in `America/Denver`.
- **Contrast:** process numerals cannot stay light gold on white.
- **Scope creep:** hedged copy in FAQ/areas reported, not auto-rewritten.
- **Fake credibility:** license all zeros; no new named testimonials; van photo TODO.
- **Em dashes:** strip any `—` from new copy.

## Done for the batch when

- Each issue’s Done when checks pass.
- Build succeeds; changed sections checked at 1280px and 375px.
- PR opened from `demo-public-copy-proof` with replace-before-live checklist.
- Benji approved this plan before coding started.
