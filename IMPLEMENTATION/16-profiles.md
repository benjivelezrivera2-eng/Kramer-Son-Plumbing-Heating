# Issue 16 — Profiles

**Issue:** [#16](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/16)  
**Branch:** `booking-crm`  
**Campus:** [Profiles Part 1](https://app.notion.com/p/408aaf8f026e81a2bc99d41eaff39a0d), [Profiles Part 2](https://app.notion.com/p/408aaf8f026e81fb8e42c5e9a7097c2a)

## Outcome

The shop admin (and later a small team) can open a header profile dropdown, edit their own profile, and set a portrait. Homeowners do not get accounts. Look stays Kramer navy / gold. Logout is left as-is.

## Live schema before this work

`public.profile`: `id`, `created_at`, `user_id`, `role`. RLS on. No `avatars` bucket.

## Files

- `src/lib/AuthProvider.tsx` — load the full profile; do not change sign-out
- `src/lib/profile.ts` — types, save, signed avatar URLs
- `src/components/ProfileMenu.tsx` — header dropdown
- `src/pages/admin/AdminProfilePage.tsx` — form
- `src/layouts/AdminShell.tsx` — mount the dropdown
- `src/app/App.tsx` — `/admin/profile`
- `public/profile-presets/` — default portraits
- `supabase/migrations/` — columns, RLS, private `avatars` bucket

## Steps

1. Add name, phone, address, and avatar columns on `profile`.
2. Private `avatars` bucket. Four storage policies: own upload / update / delete; own or admin read. Signed URLs.
3. Header dropdown: avatar or placeholder, name, email, Profile, Office (`/admin`), Log out.
4. Profile page: first / last name, prefix + phone, address block, read-only email, camera upload, presets or default.
5. Save, refresh page and table — same values.

## Verify

- Admin dropdown shows name + email and opens `/admin/profile`.
- Name save survives refresh and appears in the dropdown.
- Email cannot be edited.
- Upload lands in `avatars/{user_id}/`.
- Address and phone persist in `public.profile`.
- Logout still works from the sidebar.
