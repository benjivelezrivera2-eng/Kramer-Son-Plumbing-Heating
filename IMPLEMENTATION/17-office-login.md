# Issue 17 — Office login (forgot password)

**Issue:** [#17](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/17)  
**Branch:** `booking-crm`

## Outcome

`/login` stays the shop sign-in page. The only extra link is **Forgot password**, and it is a real reset flow. No sign-up. No extra “Log in” link — this page already is the login.

## Files

- `src/pages/LoginPage.tsx` — Forgot password link
- `src/pages/ForgotPasswordPage.tsx` — send the reset email
- `src/pages/ResetPasswordPage.tsx` — set a new password from that email
- `src/lib/AuthProvider.tsx` — keep the recovery session long enough to save a new password
- `src/lib/supabase.ts` — read the recovery token from the URL
- `src/app/App.tsx` — `/forgot-password`, `/reset-password`

## Verify

- Sign in still opens `/admin` for an admin.
- Forgot password sends a reset to an existing Auth email (owner Gmail included). Safe copy if the email is unknown.
- The email link opens `/reset-password` and a new password can be saved.
- No Sign up link. No extra Log in link on `/login`.
