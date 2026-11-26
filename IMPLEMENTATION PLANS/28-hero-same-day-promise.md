# Hero: one same-day promise and two CTAs only

Issue: [#61](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/61)  
Branch: `demo-public-copy-proof`  
Batch: see `27-demo-public-copy-proof.md`

## Outcome

Hero keeps headline, one subtext from config (cutoff + call-now), and two CTAs. Duplicate “Same-day windows when we can” is gone.

## Files

- `src/config/business.ts` — `hero.body`, `sameDayCutoff`
- `src/sections/HeroSection.tsx` — remove second line; body from config only

## Steps

1. Add cutoff to config; set hero body to the approved sentence.
2. Delete the hardcoded second `<p>` in the hero.
3. Confirm Call + Book a visit remain the only CTAs.

## Verify

- Desktop/mobile: no duplicate line; copy has no em dash.
