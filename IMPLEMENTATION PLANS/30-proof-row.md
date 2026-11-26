# Proof row under trust strip

Issue: [#63](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/63)  
Branch: `demo-public-copy-proof`  
Batch: see `27-demo-public-copy-proof.md`

## Outcome

One proof row under the dark strip: years serving Sterling, licensed/insured with CO #000000, rating + review count. Config-driven. No testimonials.

## Files

- `src/config/business.ts` — years, license, rating, reviewCount, `isDemoData`
- `src/pages/HomePage.tsx` — mount under `TrustStrip`
- New section component (e.g. `src/sections/ProofRow.tsx`) if cleaner

## Steps

1. Add demo proof fields to config.
2. Build three-item row with shared gutters; wrap on mobile.
3. No carousel, no named quotes.

## Verify

- Appears directly under strip; values from config; wraps at 375px.
