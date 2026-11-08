# Issue 18 — Fixed mobile Call + Book CTA bar

## Outcome
Phone visitors keep Call and Book visible while scrolling marketing pages.

## Files
- `src/layouts/SiteShell.tsx`
- `src/components/MobileCtaBar.tsx` (new)

## Steps
1. Extract a fixed bottom bar for `md:hidden` with Call + Book.
2. Keep hiding it on `/confirmation` and `/b/*`.
3. Pad the main column so content clears the bar.

## Verify
- Phone width: bar stays fixed with both actions.
- Desktop: no bar.
- Confirmation / manage-booking routes: no bar.
