# Trust strip: label above value

Issue: [#62](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/62)  
Branch: `demo-public-copy-proof`  
Batch: see `27-demo-public-copy-proof.md`

## Outcome

Dark strip shows “Service area” and “Hours” above their values; small uppercase gold labels.

## Files

- `src/sections/TrustStrip.tsx`

## Steps

1. Swap DOM order to label then value.
2. Rename labels; keep `proposalNote` and `hours` values.
3. Style labels small, uppercase, gold.

## Verify

- Visual match at 1280 and 375.
