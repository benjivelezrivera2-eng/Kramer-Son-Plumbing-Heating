# Issue 20 — Brand tokens + shadcn where it fits

## Outcome
shadcn Button / Badge / Card use Kramer navy + gold, applied only on marketing CTAs, hero badge, and review cards.

## Files
- `tailwind.css`
- `src/sections/HeroSection.tsx`
- `src/components/CtaBand.tsx`
- `src/sections/ReviewsSection.tsx`

## Steps
1. Point `--primary` / related tokens at navy + gold.
2. Hero: Badge + Button asChild for CTAs.
3. CTA band: Button asChild.
4. Reviews: Card wrappers without changing layout language.

## Verify
- Marketing CTAs look on-brand via shared components.
- Admin UI not redesigned.
