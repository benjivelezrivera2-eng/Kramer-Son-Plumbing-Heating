# Issue 16 — Profiles (Part 1 plan)

**Issue:** [#16](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/16)  
**Folder order:** `02-profiles.md` (after `01-Dashboard.md`)  
**Children / order:** [#27](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/27) login · [#28](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/28) protect `/admin` · [#29](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/29) → `03-extend-profiles-table.md` · [#30](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/30) → `04-avatars-bucket.md` · [#31](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/31) → `05-admin-profile-page.md`  
**Lesson source:** Profiles Part 1 (avatar → storage → profile page → admin shortcut)  
**Status:** track plan. Implement child issues in order; no product code until the active child is confirmed.

Inspiration from `01-Dashboard.md` (old backend reference): one office login for the demo, `profiles` tied to `auth.users`, role stored in the table (not editable user metadata), homeowners do **not** get accounts.

---

## 1. Outcome (plain English)

The shop owner signs in, opens a profile menu, and edits a real office profile: name, phone, address, and a portrait. That row is what the app uses to know “this session is the admin.” A second Auth user with `role = user` exists only to prove the office gate works — not as a homeowner portal.

Sales-call success for this slice:

1. Log in as admin → office opens.
2. Open profile → change name / phone / picture → refresh → still there.
3. Log in as the test (non-admin) user → blocked from `/admin`.

---

## 2. Decision: one admin vs staff logins

| Option | What it means | Fit for this prototype |
|---|---|---|
| **A. One admin login (recommended for demo)** | One Auth user + one `profiles` row with `role = admin`. Owner uses it on the laptop during sales calls. | Matches the old plan (“one admin login”). Fastest path. Still keep the test `user` row for gate testing. |
| **B. Small staff logins later** | Extra Auth users + `profiles` rows (`admin` or a future `staff`). Same table; no customer portal. | Issue #16 already says “leave room for a small team.” Do **not** build staff invite UI in Part 1. |
| **C. Full multi-role product now** | Staff management, per-tech permissions, customer accounts. | Out of scope for the Monday demo. Lesson’s fitness CRM had “User” + “Admin”; Kramer only needs the **office** side. |

**Plan default:** Option A for what we ship now. Schema stays ready for Option B (extra rows later). Reject Option C for v1.

If Benji wants a demo story of “the office manager and a tech both log in,” we can seed a second `admin` (or later `staff`) row after Part 1 works — without building a user-admin UI.

---

## 3. What Profiles Part 1 taught (map to Kramer)

| Lesson move | Kramer translation |
|---|---|
| Profiles page with name + email | `/admin/profile` — name editable, email read-only from Auth |
| Flaticon / temp PNG → upload | Presets in `public/profile-presets/` + optional upload to Storage |
| Private `avatars` bucket + RLS | Same bucket idea; signed URLs; own-file policies; admin can read |
| Header dropdown: Profile / Admin / Log out | Profile menu in admin shell; Office link; keep existing logout |
| Log in as admin → admin shortcut | Already covered by #27 / #28 + `profiles.role` |

---

## 4. Live state before this plan’s remaining work

**Supabase (`xyqinfifyptthukekidx`):**

- `public.profiles` exists, RLS on, **2 rows**: admin (Benji), user (Test User).
- Columns today: `id` (uuid = `auth.users.id`), `role`, `full_name`, `created_at`.
- **No** `avatars` storage bucket yet.
- Only public table so far: `profiles`.

**App code (partial / drifted):**

- `AuthProvider` reads `profiles.role` and only keeps `admin` sessions.
- `AdminProfilePage`, `ProfileMenu`, `profile.ts` expect a richer shape (and historically a singular `profile` table). Align everything to **`public.profiles`**.

---

## 5. Schema to add (extend `profiles`, do not invent a second table)

Keep `id` = `auth.users.id`. Add only what the office form needs:

| Column | Notes |
|---|---|
| `first_name`, `last_name` | Prefer these over relying only on `full_name` (or derive `full_name` on save) |
| `job_title` | Optional shop flavor (Owner / Office) |
| `phone_prefix`, `phone`, `after_hours_phone` | Shop contact |
| `license_number` | Optional Colorado plumbing license line |
| `address_line1`, `address_line2`, `city`, `county`, `post_code`, `country` | Office / shop address |
| `avatar_path`, `avatar_kind` | `default` \| `preset` \| `upload` |

Role values for v1: `admin` | `user` (test gate only). No public sign-up. Do not store role in `user_metadata`.

**Storage:** private bucket `avatars`. Path pattern `{user_id}/{timestamp}-{safeName}`. Policies: authenticated user can upload/update/delete own folder; own or admin can read; signed URLs for display.

---

## 6. Files to touch

- `supabase/migrations/` — alter `profiles`, RLS if needed, `avatars` bucket + storage policies
- `src/lib/AuthProvider.tsx` — load full profile row for admin; expose `profile` + `refreshProfile`
- `src/lib/profile.ts` — types/save/upload against **`profiles`** (not `profile`)
- `src/components/ProfileMenu.tsx` — dropdown: avatar/initials, name, email, Profile, Office, Log out
- `src/pages/admin/AdminProfilePage.tsx` — live form, no placeholders
- `src/layouts/AdminShell.tsx` / `src/app/App.tsx` — route `/admin/profile` if not already wired
- `public/profile-presets/` — navy/gold-friendly presets (no Flaticon attribution debt if we use local SVGs)

Constraint from issue #16 comments: **nothing static or stubbed** — save must hit Supabase and survive refresh.

---

## 7. Steps (implementation order)

1. Confirm Option A vs B with Benji (section 2).
2. Migration: extend `profiles` + private `avatars` bucket/policies.
3. Point `profile.ts` / Auth at `profiles`; load row after admin login.
4. Wire profile page + dropdown to real read/write (name, phones, address, avatar).
5. Verify with admin + test user (see below).
6. Comment progress on #16; close child issues as each finishes.

---

## 8. Verify

- [ ] Admin login reaches `/admin`; test user does not.
- [ ] Dropdown shows name/email; Profile opens `/admin/profile`.
- [ ] Name / phone / address save → refresh → same values in DB and UI.
- [ ] Email field is read-only.
- [ ] Upload appears under `avatars/{user_id}/` and shows via signed URL; preset/default work.
- [ ] Sidebar/header logout still works.
- [ ] No homeowner sign-up path was added.

---

## 9. Out of scope for this plan

- Staff invite / password-reset admin UI
- Customer accounts or client dashboard
- Changing Auth email from the profile form
- Broader shop tables (leads, bookings) — later phases of the old backend plan
