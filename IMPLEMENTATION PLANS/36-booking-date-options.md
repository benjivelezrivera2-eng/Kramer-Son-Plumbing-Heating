# Booking date dropdown: hours, holidays, cutoff

Issue: [#69](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/69)  
Branch: `demo-public-copy-proof`  
Batch: see `27-demo-public-copy-proof.md`

## Outcome

Next 6 bookable days from shop hours in America/Denver. Skip today after close. Omit closed holidays. Labels like “Monday, Nov 30”. No hydration mismatch. Submit unchanged.

## Files

- `src/config/business.ts` — structured hours + `closedHolidays`
- `src/components/BookingDialog.tsx` — `visitDayOptions` (and/or small `src/lib/` helper)

## Steps

1. Encode weekday 8–5 + holiday list in config.
2. Rewrite `visitDayOptions` for Denver “now”, post-close today skip, holiday omit.
3. Client-only compute (useMemo on mount) to avoid date drift.
4. Comment on #69: submit still validates → `sendVisitEmails` → `onConfirm`.

## Verify

- After-hours / holiday scenarios omit correctly; six options; no console hydration warnings; submit path untouched.
