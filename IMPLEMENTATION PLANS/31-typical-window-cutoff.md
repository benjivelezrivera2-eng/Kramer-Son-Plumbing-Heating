# Hedged typical windows → cutoff

Issue: [#64](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/64)  
Branch: `demo-public-copy-proof`  
Batch: see `27-demo-public-copy-proof.md`

## Outcome

Hedged card windows use “Same day if you call by {cutoff}.” Firm lines stay. Other hedging reported only.

## Files

- `src/config/business.ts` — `serviceCategories[].window`, `services[].window` as needed
- Comment on #64 with FAQ / areas / detail findings

## Steps

1. Replace hedged strings that feed service cards.
2. Keep “No-heat…” and “Weekday morning or afternoon window.” and other firm lines.
3. Grep FAQ, areas, service detail; report; do not change without ask.

## Verify

- Cards show cutoff line; firm lines intact; report posted on issue.
