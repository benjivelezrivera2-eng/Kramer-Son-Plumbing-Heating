# Issue 19 — FAQ and trust proof on homepage

## Outcome
Homepage shows local trust cues under the hero and FAQ before the final CTA.

## Files
- `src/sections/TrustStrip.tsx` (new)
- `src/pages/HomePage.tsx`

## Steps
1. Add a compact trust strip (areas / hours / local cue) under the hero.
2. Render existing `FaqSection` before `CtaBand` on the homepage.
3. Keep Kramer light local-trade styling.

## Verify
- Home has trust strip + FAQ + CTA band in that order.
- About FAQ still works.
