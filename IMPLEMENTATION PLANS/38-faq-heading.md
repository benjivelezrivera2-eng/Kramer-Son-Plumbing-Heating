# FAQ heading

Issue: [#72](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/72)  
Branch: `faq-heading`

## Outcome

Public FAQ section heading reads exactly `FAQ` instead of `Questions we get a lot`.

## Files

- `src/sections/FaqSection.tsx`

## Steps

1. Change the `h2` text in `FaqSection` to `FAQ`.
2. Build to confirm no breakage.
3. Merge to main and confirm production.

## Verify

- Local/build: heading text is `FAQ`.
- Production: https://kramer-son-plumbing-heating.vercel.app shows `FAQ` in the FAQ section.
