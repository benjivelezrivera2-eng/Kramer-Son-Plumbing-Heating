# Unify booking CTAs to “Book a visit”

Issue: [#65](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/65)  
Branch: `demo-public-copy-proof`  
Batch: see `27-demo-public-copy-proof.md`

## Outcome

All booking CTAs say “Book a visit”. Call and commercial untouched. Other inconsistencies reported only.

## Files

- `src/sections/ServicesSection.tsx` (“Book this visit”)
- `src/pages/ServiceDetailPage.tsx`
- `src/components/BookingDialog.tsx` (submit “Book this job”, other book strings)
- `src/components/MobileCtaBar.tsx`, `SiteHeader.tsx`, hero (already “Book a visit” where correct)

## Steps

1. Normalize book labels to “Book a visit”.
2. Leave call CTAs and “Ask about commercial”.
3. Comment leftover inconsistencies on #65.

## Verify

- Grep for Book this / Book a job / Book this visit returns none on public book paths (or listed as intentional leftovers).
