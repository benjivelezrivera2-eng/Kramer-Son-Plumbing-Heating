# Issue 8 — Reusable public trades site

## Outcome
Outreach-ready public demo. Kramer branding is gone. Name, niche, and contact come from one config. Public pages only.

## Decisions
- Display name: `Business Name`
- Filled niche: Plumbing & Heating
- Placeholders only in identity/contact slots (name, niche, city). Do not wrap service copy in `[BRACKETS]`.
- Skip policies, login, admin, and client portal.
- Milestone `Demo ready for Monday calls` is not on the repo; issue opened without it.

## Files
- Add `src/config/business.ts`
- Add public routes in `src/app/App.tsx` and pages under `src/pages/`
- Add `src/layouts/SiteShell.tsx` (banner, header, footer, mobile call bar)
- Update existing sections to read from the config
- Update `src/index.tsx`, `index.html`, `vercel.json` for SPA routes
- Extract the request form for the Contact page and Confirmation redirect

## Steps
1. Centralize copy and contact details.
2. Wire Home, Services, About, Contact, Confirmation.
3. Clean header/footer/nav so it reads as a shop site, not an export.
4. Verify build plus desktop and mobile flows.

## Verify
- Kramer does not appear in the UI or page title.
- Changing `business.name` would change the header, footer, and title.
- `/`, `/services`, `/about`, `/contact`, `/confirmation` render.
- Request form on Contact leads to Confirmation.
- No account or policy pages exist.
