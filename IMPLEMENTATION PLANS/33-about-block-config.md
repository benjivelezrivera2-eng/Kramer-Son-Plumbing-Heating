# About block from demo config

Issue: [#66](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/66)  
Branch: `demo-public-copy-proof`  
Batch: see `27-demo-public-copy-proof.md`

## Outcome

About body uses owner, son, year, license from config. Van photo src/alt in config with TODO. No new imagery.

## Files

- `src/config/business.ts`
- `src/sections/ReasonsSection.tsx`

## Steps

1. Add owner/son/year/license/aboutPhoto to config (`isDemoData: true`).
2. Replace about paragraph with the approved template.
3. Wire image to config; add TODO for replace-before-live.

## Verify

- Copy matches template; image still `/photos/crew-van.jpg` via config; TODO present.
