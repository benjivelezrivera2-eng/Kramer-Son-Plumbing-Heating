# Kramer & Son Plumbing & Heating

Sales-demo site for a local plumbing and heating shop. The public site is a brochure plus a real request/booking loop. Behind it is a one-login admin office: leads, bookings, a week dispatch board, and live toasts when something new lands.

This repo is the **website and shop office**. The AI receptionist (Vapi assistant, Twilio number, caller-summary texts) lives outside this repo. Track that work as GitHub issues, but do not put voice-agent logic in this app.

Production: [kramer-son-plumbing-heating.vercel.app](https://kramer-son-plumbing-heating.vercel.app)

## What this is for

The finish line is a two-screen sales call:

1. Phone: fill the contact form or book a morning / afternoon / after-hours window.
2. Laptop: `/admin` updates itself (toast + new row), a shop email arrives, and the customer gets a confirmation with a private manage link.

No customer accounts. No payments. Pay on-site. Copy in `src/config/business.ts` is still sample shop copy.

## Stack

| Layer | Choice |
|---|---|
| UI | React 18 + TypeScript |
| Build | Vite 7 |
| Routing | React Router 6 |
| Styles | Tailwind CSS 3, a few shadcn/Radix pieces, Lucide icons |
| Toasts | Sonner |
| Backend | Supabase (Postgres, Auth, Realtime, Edge Functions on Deno) |
| Email | Resend, sent from Edge Functions |
| Hosting | Vercel (SPA rewrite in `vercel.json`) |
| Analytics | Vercel Analytics |

Public writes go through Edge Functions (`create-lead`, `create-booking`, `get-availability`, `manage-booking`). The admin UI talks to Postgres under RLS with the logged-in session. Shop time zone is `America/Denver`.

## Repo map

```
src/
  app/App.tsx              routes
  config/business.ts       public copy, phone, OG meta
  pages/                   public site + /admin/*
  layouts/                 SiteShell, AdminShell
  lib/                     supabase client, auth, leads, shop, live toasts
  sections/                marketing homepage blocks
supabase/functions/        Deno Edge Functions
IMPLEMENTATION/            backend + admin plan
GITHUB_ISSUES_GUIDE.md     how we file and start work
```

## Local setup

Needs Node.js.

```bash
cp .env.example .env
npm install
npm run dev
```

App: [http://localhost:5173/](http://localhost:5173/)

`.env` needs:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Edge Functions also expect `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, and `RESEND_FROM` in the Supabase project (never in the Vite client).

```bash
npm run build
```

## Routes

**Public:** `/` `/services` `/services/:slug` `/book` `/book/:slug` `/about` `/contact` `/confirmation` `/b/:token` `/b/:token/reschedule`

**Office:** `/login` then `/admin` (dashboard, leads, bookings, schedule, customers, services, technicians, availability, reports, activity, settings). One admin user. No sign-up.

Click-to-call logs a `click_to_call` lead (debounced) then opens `tel:`. We only know they tapped Call.

## Working on this repo

See `GITHUB_ISSUES_GUIDE.md` before writing code. Longer backend/admin notes live in `IMPLEMENTATION/IMPLEMENTATION_PLAN.md`.
