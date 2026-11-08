# Issue #23 — Change header CTA from call to Book a service

**Issue:** [#23](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/23)  
**Branch:** `booking-crm`

## Outcome
Header primary CTA says **Book a service** and links to `/book`. Call stays in the hero and mobile Call + Book bar.

## Files
- `src/components/SiteHeader.tsx` — replace CallButton CTAs with a Book link

## Steps
1. Merge design PR #21 into `booking-crm` (already merged).
2. Merge remaining `design` commits into `booking-crm` (homepage copy #22).
3. Replace mobile and desktop header call buttons with a `Button` + `Link` to `/book` labeled Book a service.
4. Drop unused `Phone` / `CallButton` imports from the header.
5. Verify: header → `/book`; hero Call and mobile bar Call still work.

## Verify
- Desktop: gold header button reads Book a service and goes to `/book`.
- Mobile header: Book a service instead of phone icon; MobileCtaBar still has Call + Book.
- Hero still shows Call Kramer & Son.
