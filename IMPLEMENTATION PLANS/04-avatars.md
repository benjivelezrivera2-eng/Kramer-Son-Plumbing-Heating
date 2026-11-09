# Issue 30 — Public avatars Storage bucket

**Issue:** [#30](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/30)  
**Parent:** [#16](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/16) · plan `02-profiles.md`  
**Depends on:** [#29](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/29) (`avatar_url`)  
**Order:** 04  
**Status:** plan updated — public bucket (no signed URLs)

## Why public

Kramer & Son is a **single-admin demo**. Unlike the gym lesson’s multi-user privacy model, office portraits do not need private objects or signed URLs. Public `avatars` keeps the camera → file picker → upload UX the same and simplifies display (public object URL).

## Outcome

Public Storage bucket `avatars`. Authenticated admin uploads under `{user_id}/…`. UI reads the public URL from `avatar_url` — **no signed-URL step**.

## Files (when coding later)

- Supabase Storage: public `avatars` bucket + write policies for authenticated own folder
- `src/lib/profile.ts` — `uploadAvatar`; drop / skip `signedAvatarUrl` for display
- Profile UI still uses camera icon + file picker (unchanged UX)

## Steps

1. Make bucket `avatars` **public** (create or flip from private).
2. Keep upload/update/delete limited to authenticated user under `{user_id}/…`.
3. Upload path stays `{user_id}/{timestamp}-{safeName}`.
4. Store/public URL in `profiles.avatar_url`; render that URL directly (no signed URL).

## Done when

- Admin can upload a portrait and see it after refresh via public URL
- Object lives under that user’s folder in `avatars`
- Bucket is public; signed URLs are not required for display
