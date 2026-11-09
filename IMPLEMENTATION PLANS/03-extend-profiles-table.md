# Issue 29 — Extend profiles table + sync office profile fields

**Issue:** [#29](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/29)  
**Parent:** [#16](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/16) · `02-profiles.md`  
**Order:** 03  
**Status:** implementing

## Outcome

`public.profiles` holds office fields. Auth loads the full row. `/admin/profile` reads and writes live data. Test values and the test avatar stay in **chat only** — not committed to the repo.

## Columns

`first_name`, `last_name`, `phone_prefix`, `phone_number`, `address_line1`, `address_line2`, `city`, `county`, `post_code`, `country`, `avatar_url`  
Keep `id`, `role`, `full_name`, `created_at`.

## Files

- Supabase migration (columns + private `avatars` bucket + RLS)
- `src/lib/profile.ts` — types/save/upload against `profiles`
- `src/lib/AuthProvider.tsx` — `profile` + `refreshProfile`
- `src/pages/admin/AdminProfilePage.tsx` — form + camera upload
- `src/components/ProfileMenu.tsx` — portrait + name in chrome

## Layout

- Page: portrait top-right; camera control bottom-right of avatar
- Shell menu: portrait + name bottom-left (Slack / Linear / Notion style)
- Email read-only with “cannot be changed currently”

## Verify

- Save name / phone / address / avatar → refresh → same values in UI and Supabase
- Test user still `role = user`
- Anon REST cannot list profiles
