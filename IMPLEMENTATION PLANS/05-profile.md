# Issue 31 — Admin profile page and header dropdown (live Supabase data)

**Issue:** [#31](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/31)  
**Parent:** [#16](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/16) · plan `02-profiles.md`  
**Depends on:** [#29](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/29), [#30](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/30), gates [#27](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/27) / [#28](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/28)  
**Order:** 05  
**Status:** plan ready; implement after #29–#30

## Outcome

Header dropdown + `/admin/profile` read and write real `profiles` data. Nothing stubbed. Navy/gold shop look. Email read-only from Auth.

## Files

- `src/lib/AuthProvider.tsx` — full profile + `refreshProfile`
- `src/components/ProfileMenu.tsx`
- `src/pages/admin/AdminProfilePage.tsx`
- `src/layouts/AdminShell.tsx` / `src/app/App.tsx` — `/admin/profile` route

## Steps

1. Load full admin profile after login; refresh after save.
2. Dropdown: avatar/initials, name, email, Profile, Office, Log out.
3. Form: name, phones, address, camera + presets + default; email read-only.
4. Save → Supabase → survive refresh.

## Done when

- Dropdown opens `/admin/profile`
- Edits persist in UI and `profiles`
- Email cannot be changed on the form
- Logout still works
