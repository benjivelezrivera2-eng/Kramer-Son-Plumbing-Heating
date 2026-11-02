# Kramer & Son — Backend + Admin Dashboard Implementation Plan

**Status:** plan only. Do not write product code until this file is approved and a GitHub issue is confirmed (see `GITHUB_ISSUES_GUIDE.md`).  
**This plan replaces** the old files that used to live in `IMPLEMENTATION/`.

---

## 1. What we are building (plain English)

The website today is a brochure. The contact form checks a name and phone, then pretends it worked. Nothing is saved. Nothing is emailed. An owner on a sales call cannot see a lead arrive.

We will add a **shop office** behind the brochure:

1. A customer (or the owner acting as a customer) fills out a request or picks a visit window.
2. That information is saved in a database.
3. The admin laptop **updates by itself** — a toast in the top-left and a new row on the dashboard, no refresh.
4. The shop gets an email. The customer gets a confirmation email with a private link to reschedule or cancel.
5. The admin can turn that into a booked job, put it on a simple week board with one or two techs, and run a few reports.

Think of it like a paper dispatch board and a voicemail pad, but on the phone and the laptop.

**Sales-call success (this is the finish line for the first build):**

- Phone in one hand: public site, fill the form or book a window.
- Laptop in front of the owner: admin dashboard.
- Within a second or two, the laptop shows the lead/booking, a toast, and an email in the inbox.
- Owner can open the lead, mark it contacted, book it onto a morning/afternoon window, and see it on the week view.

If that loop works on a phone and a laptop, the demo works. Everything else is support for that loop.

---

## 2. Decisions already made (do not reopen unless you say so)

| Topic | Decision |
|---|---|
| Demo setup | Two screens, **live**. Form on a phone, admin dashboard on the laptop updates itself (toast + new row). |
| Booking | Customer picks an **arrival window** (morning / afternoon / after-hours) from what the shop has open. No account. |
| Technician board | **Simple week view** with 1–2 sample techs. Not a full per-tech hours system. |
| Customer logins | **None.** Confirmation email includes a private link to view / reschedule / cancel that one booking. |
| Lead sources in v1 | Contact/service-request form, click-to-call (log the tap), admin can type a lead by hand. |
| Logins | **One admin login.** You create it. No public sign-up. |
| Supabase | You have a **Supabase account**, but **no project yet**. This plan includes creating one. |
| Email sending | You do not have a sender yet. Plan uses **Resend** (simple, cheap, works with Supabase Edge Functions). |
| Payments | Not now. Pay on-site. Stripe later. |
| Quote-request form | **Out of v1.** Not selected. |
| Automatic inbound-email-to-lead | **Out of v1.** If someone “emailed the shop,” type the lead in by hand during the demo. |

### Decisions this plan is making for you (called out so you can override)

| Topic | Choice in this plan | Why |
|---|---|---|
| Customer email on forms | **Required** (along with name and phone) | Confirmation + private manage-link have to go somewhere. Phone stays required because shops call back. |
| Time zone | `America/Denver` | `(970)` is Colorado. Windows and “after hours” are meaningless without a zone. |
| How public forms save data | **Edge Function**, not a direct database insert from the browser | One place to validate, save, email, and stay spam-resistant. Easier to test than “the page writes to the table and a second job sends mail.” |
| User ban / reject | **Out of v1** | There is no public sign-up. Nobody to ban. |
| Job photos | **After the demo loop works** (Phase 6) | Storage is useful; it is not what sells the call. |
| Reset between calls | **Yes** — a “Reset demo data” action in Settings | You will run this demo more than once. You need a clean board without rebuilding the database. |

Related GitHub issue: [#4 Service request form doesn't send anywhere](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/4). That issue originally suggested texting you through Twilio. **This plan uses email + the live dashboard for web leads.** Caller-summary **texts** for the phone line stay on issue #3 (Vapi/Twilio, not this website). Do not mix those two.

---

## 3. What a plumbing shop actually needs (and what we skip)

### In v1 (demo)

- Capture a lead from the website form.
- Capture a lead when someone taps **Call**.
- Let the office type a lead (covers “they called in” / “they emailed”).
- Book a morning / afternoon / after-hours window without an account.
- Instant admin email + customer confirmation email.
- Live admin dashboard (new items appear; toast top-left).
- Lead statuses: new → contacted → booked → won / lost.
- Booking statuses: pending → confirmed → completed / cancelled / no-show, with cancel reason + cancel time.
- Service types the office can add/edit (drain cleaning, water heater, furnace, AC, emergency, etc.).
- Business hours, after-hours windows, and days off.
- Simple week dispatch board with 1–2 techs.
- A customer **record** (name, phone, email, address) — not a customer **login**.
- Light reporting: leads by source, lead-to-booking conversion, bookings per week, after-hours volume.
- History of what happened to a lead/booking, plus admin logins.

### Out of v1 (a real shop might want these later; they do not help this demo)

- Customer accounts / “my jobs” portal.
- Quote-request as a separate form (the contact form + booking cover the pitch).
- Parsing incoming email into leads.
- Stripe / online cards.
- Multi-staff roles, technician logins, banning users.
- GPS, parts inventory, invoices, price books, SMS from this app.
- Drag-and-drop schedule, route optimization, time tracking.
- Exact clock times (“be there at 2:15”). Shops sell **windows**.

### Suggested improvements that *are* in v1 because they make the demo better

1. **Capacity per window** — e.g. 2 morning jobs, 2 afternoon. When a window is full it disappears. Owners understand that immediately.
2. **Emergency / after-hours flag** on the request — dashboard can highlight it.
3. **Match people by phone** — same homeowner submitting twice becomes one customer record with two leads.
4. **Demo reset** — wipe sample leads/bookings, keep services, hours, and techs.
5. **Service pages with slugs** (`/services/drain-cleaning`) — unique pages, not a modal. Each page can book that service.

---

## 4. Backend concepts in plain language

You will see these words in every step. Here is all they mean.

**Database (Postgres, hosted by Supabase)**  
A set of spreadsheets (tables) that keep leads, bookings, and settings. Unlike a spreadsheet, many people can write at once, and we can lock rows so random visitors cannot read the whole shop.

**Row Level Security (RLS)**  
Rules on each table: “who is allowed to see or change this row?” The public site should not be able to read every lead. Only the logged-in admin should.

**Anon key vs service role key**  
The website may include a **public** Supabase key. That is normal. It is not a password. The **service role** key is a password for the server. It lives only in Edge Functions. Never put it in React code.

**Auth**  
Supabase Auth is the lock on the office door. One user: you. Email + password. After login, the browser holds a session (a short-lived proof you are the admin).

**Edge Function**  
A small program that runs on Supabase’s servers when the website calls it. Example: “save this form, send two emails, return OK.” The visitor never talks to the database directly for those writes.

**Realtime**  
The admin page **listens**. When a new row appears in `leads` or `bookings`, Supabase pushes that fact to the laptop. That is how the toast appears without refresh.

**Storage bucket**  
A folder in the cloud for files (job photos). A table stores the file path; the bucket stores the picture.

**Migration**  
A saved SQL file that describes a table change. We never “click around” production tables as the source of truth. We add a migration, run it, and the database matches the file.

**Magic link (manage token)**  
A long random string in a URL, like a hotel key card for **one booking**. We store only a **hash** of it (a one-way fingerprint). If the database leaks, the raw links still do not work. If the customer forwards the email, whoever has the link can reschedule — same as whoever has the confirmation email. That is acceptable for this demo.

**Lead vs booking vs customer**

- **Customer** = the person (name, phone, email, address). Not a login.
- **Lead** = “someone asked for work” (form, tap-to-call, or typed in). Has a status.
- **Booking** = “we have them on the board for a window.” Usually created from a lead, or created in one step when they pick a window.

---

## 5. How the pieces connect

```
Phone (customer site)                    Laptop (admin)
---------------------                    --------------
/contact or /book                        /admin  (must be logged in)
        |                                      ^
        |  POST to Edge Function               |  Realtime + fetch
        v                                      |
Supabase Edge Function  -->  Database tables --+
        |
        +--> Resend  -->  shop email (you)
                     -->  customer email (with /b/TOKEN)
```

**Public visitors never read the leads table.** They only call functions: create lead, create booking, manage booking by token.

**Admin React pages** use the logged-in session to read/write tables under RLS.

**Click-to-call:** the button (1) calls `create-lead` with `source = click_to_call`, then (2) opens `tel:+1…`. We cannot know if the call connected. We only know they tapped Call. That is still a real lead source shops care about. Debounce: same browser, one click-to-call lead per minute so a double-tap does not clone rows.

---

## 6. Pages and URLs

Unique **pages** for anything a person needs to sit with. **Modals** only for “are you sure?” and tiny edits (rename a tech, change one status with confirm).

### Public (no login)

| URL | Purpose |
|---|---|
| `/` `/services` `/about` `/contact` | Existing brochure pages. Contact form actually saves a lead. |
| `/services/:slug` | One service (from the database). Primary action: Request or Book this. |
| `/book` | Pick service → pick day + window → name/phone/email/address → submit. |
| `/book/:slug` | Same wizard, service already chosen. |
| `/confirmation?type=lead\|booking&id=…` | Replaces the fake confirmation. Honest “we got it” + what happens next. |
| `/b/:token` | Magic page: see the booking, reschedule, cancel. |
| `/login` | Admin only. No “sign up” link. |

Hide the sticky mobile **Call** bar on `/login`, `/admin/*`, `/b/*`, and `/confirmation` so it does not cover office UI.

### Admin (login required)

| URL | Purpose |
|---|---|
| `/admin` | Dashboard: new leads, today’s windows, after-hours count, “needs a call.” |
| `/admin/leads` | List + filters (status, source, date). |
| `/admin/leads/new` | Type a lead by hand. |
| `/admin/leads/:id` | Full lead. Convert to booking, change status, notes. |
| `/admin/bookings` | List. |
| `/admin/bookings/:id` | Job page: window, tech, status, cancel, photos (Phase 6). |
| `/admin/schedule` | Week view, 1–2 techs, jobs in morning/afternoon/after-hours rows. |
| `/admin/customers` | People records. |
| `/admin/customers/:id` | One person: their leads and bookings. |
| `/admin/technicians` | List of sample techs. |
| `/admin/technicians/:id` | Edit name/color/active. |
| `/admin/services` | Service types. |
| `/admin/services/new` and `/admin/services/:id` | Create/edit a service. |
| `/admin/availability` | Hours, capacities, days off. |
| `/admin/reports` | The four demo charts/tables. |
| `/admin/settings` | Shop phone, notify email, timezone, **Reset demo data**. |
| `/admin/activity` | Login + lead + booking history feed. |

No separate “users and roles” app in v1. Settings can show “Signed in as …” and a change-password link (Supabase Auth).

---

## 7. Branding guide (keep new pages on-brand)

Taken from the current landing page. Admin should feel like the **same company**, quieter, more like an office than a billboard.

### Color

| Token | Hex | Use |
|---|---|---|
| Navy | `#142033` | Text, header bar, footer, admin sidebar, primary headings |
| Gold | `#c9a04a` | Primary buttons, the “money” action (Call, Save, Book) |
| Gold hover | `#b8903f` | Button hover |
| Teal | `#2a7a78` | Links, focus rings, success, icons |
| Page wash | `#f4f6f8` | Section backgrounds, table header, admin canvas |
| White | `#ffffff` | Cards, forms |
| Body text | `#334155` / `slate-700` | Paragraphs |
| Muted | `slate-500` | Labels, timestamps |
| Line | `slate-200` | Borders |
| Danger | `red-600` | Errors, cancel, lost lead |
| After-hours | navy background + gold label | Emergency / after-hours chips |

Do not introduce a new purple/blue “admin theme.” Map Shadcn `primary` → gold on navy text, `ring` → teal.

### Type

- Headings: **Gabarito** extra-bold (already in `index.html`).
- UI and body: **Geist**.
- Admin tables can stay Geist; do not switch to Inter.

### Shape and controls (Shadcn as the kit, our colors as the skin)

- Radius: `rounded-md` (already used). Not pills, not sharp rectangles.
- Buttons: height 44px (`h-11`) on mobile; gold filled = primary; navy/gold outline = secondary.
- Inputs: white, `border-slate-300`, teal focus ring (already in the contact form).
- Cards: white or `#f4f6f8`, `border-slate-200`, little or no drop shadow.
- Badges: status chips — New (teal), Contacted (slate), Booked (navy), Won (teal solid), Lost (red outline), After-hours (gold on navy).
- Toasts: **top-left**, short, one line + optional “View” link. Success = teal; error = red. Use a Shadcn/Sonner toaster with `position: top-left`.
- Modals: confirmations only (cancel booking, delete service, reset demo). Title + one sentence + two buttons.

### Mobile rules (most owners will hold a phone)

- One column by default. Tables become stacked cards under `md`.
- Admin nav: bottom bar or a header drawer on small screens, sidebar from `lg` up.
- Sticky Call bar stays on the **public** marketing pages only.
- Forms: `inputMode` for phone, large tap targets, no hover-only actions.
- Week view: horizontal scroll for days on a phone, not a squeezed 7-column grid.

---

## 8. Tables (the actual shop data)

Names are suggestions. One migration can create all of v1; later phases add columns rather than rewriting.

### `profiles`

One row, tied to `auth.users`. Fields: `id` (same as auth user), `full_name`, `role` (`admin` only in v1), `created_at`.

### `shop_settings`

One row. Fields: `shop_name`, `phone`, `notify_email`, `timezone` (default `America/Denver`), `city`, `hours_note`, `updated_at`.

### `service_types`

Fields: `id`, `slug`, `title`, `description`, `estimated_duration_minutes`, `service_area` (text, e.g. “Fort Collins and nearby towns”), `is_emergency` (boolean), `is_active`, `sort_order`, `created_at`, `updated_at`.

Seed from the current brochure list, plus **AC repair** and **Emergency / after-hours** so the demo has those cards.

### `technicians`

Fields: `id`, `name`, `color` (hex, for the week view), `is_active`, `sort_order`.

Seed two: e.g. **Alex** and **Sam**.

### `customers`

Fields: `id`, `name`, `phone`, `email`, `city`, `address_line`, `created_at`, `updated_at`.

Not a login. Match on normalized phone first, then email.

### `leads`

Fields: `id`, `customer_id`, `service_type_id` (nullable), `source` (`contact_form` \| `click_to_call` \| `admin_manual`), `status` (`new` \| `contacted` \| `booked` \| `won` \| `lost`), `name`, `phone`, `email`, `city`, `description`, `is_after_hours`, `lost_reason`, `created_at`, `updated_at`, `contacted_at`, `booked_at`, `closed_at`.

### `bookings`

Fields: `id`, `lead_id`, `customer_id`, `service_type_id`, `technician_id` (nullable until assigned), `status` (`pending` \| `confirmed` \| `completed` \| `cancelled` \| `no_show`), `window_date` (date in shop timezone), `window_slot` (`morning` \| `afternoon` \| `after_hours`), `cancel_reason`, `cancelled_at`, `notes`, `manage_token_hash`, `token_expires_at` (optional, long-lived for demo, e.g. 90 days), `created_at`, `updated_at`.

Duration comes from the service type; we do not need exact start/stop clocks in v1.

### `availability_rules`

Weekly pattern. Fields: `id`, `day_of_week` (0–6, Sunday = 0), `slot` (`morning` \| `afternoon` \| `after_hours`), `starts_at` (time), `ends_at` (time), `capacity` (integer, how many jobs), `is_active`.

Example seed: Mon–Fri morning 8–12 cap 2, afternoon 12–5 cap 2; after-hours 5–8 cap 1; Saturday morning cap 1; Sunday closed.

### `availability_exceptions`

Fields: `id`, `exception_date`, `kind` (`closed` \| `capacity_override` \| `extra_slot`), `slot` (nullable), `capacity` (nullable), `note`.

Days off = `closed` for that date.

### `activity_events`

One history table for the whole shop.

Fields: `id`, `entity_type` (`lead` \| `booking` \| `customer` \| `auth` \| `settings`), `entity_id` (uuid, nullable for logins), `action` (e.g. `lead.created`, `lead.status_changed`, `booking.cancelled`, `auth.login`), `actor_type` (`admin` \| `customer` \| `system`), `actor_id` (nullable), `metadata` (json: old/new status, source, ip), `created_at`.

This covers: lead history, booking history, login history. Also worth tracking here: emails sent, demo resets, availability changes.

### `notifications`

Fields: `id`, `kind` (`admin_new_lead` \| `admin_new_booking` \| `customer_confirm` \| `customer_reschedule` \| `customer_cancel`), `to_email`, `entity_type`, `entity_id`, `status` (`queued` \| `sent` \| `failed`), `provider` (`resend`), `provider_id`, `error`, `created_at`.

So you can prove “the email went out” during a demo if the inbox is slow.

### `booking_photos` (Phase 6)

Fields: `id`, `booking_id`, `storage_path`, `caption`, `created_at`.

---

## 9. Access rules (RLS) — who can do what

| Who | Can do |
|---|---|
| Public (not logged in) | Call Edge Functions only. Cannot `select` leads. |
| Magic-link visitor | Edge Function `manage-booking` with the raw token. Can read/update **that** booking only. |
| Admin | Full read/write on shop tables. |

Implementation notes (for whoever codes this):

- Enable RLS on every public table.
- Admin policies: `auth.uid()` exists in `profiles` with `role = 'admin'`.
- Do **not** store role in `user_metadata` (users can edit that). Use `profiles` or Auth `app_metadata`.
- Edge Functions use the service role **after** validating input (and a simple rate limit).
- Realtime: admin client subscribes to `leads` and `bookings` inserts/updates. Public clients do not.

---

## 10. Emails (Resend)

Create a free Resend account. Verify a sending domain if you have one; for the first tests Resend’s onboarding domain is enough if it only sends to **your** inbox. For a sales demo, use a real domain as soon as you can so the customer confirmation does not land in spam.

**Shop email (instant, on new lead or booking)**

- Subject: `New website lead — {name} — {source}` or `New booking — {name} — {date} {slot}`
- Body: name, phone, email, city, source, after-hours yes/no, description, link to `/admin/leads/:id` or `/admin/bookings/:id`.

**Customer email**

- Lead: “We got your request. We’ll call {phone} to confirm.”
- Booking: window + “Manage this visit” button → `/b/{token}`.
- Reschedule / cancel: short confirmation of the new state.

Store a row in `notifications` for each attempt.

---

## 11. UI behavior rules

- Toasts: top-left. Admin realtime toast includes a **View** link to the new record’s page.
- New lead/booking pages are **routes**, not modals.
- Cancel booking: modal (“Cancel this visit?”) with a reason field, then save `cancel_reason` + `cancelled_at`.
- Delete service type: modal. Prefer **deactivate** (`is_active = false`) over hard delete if any booking points at it.
- Empty states: one sentence + a button (“No leads yet. Open the contact page on your phone.”).

---

## 12. Build order — small steps you can test

Do these in order. Do not start the next step until the “Done when” checks pass. Each step is meant to be one sitting.

---

### Phase 0 — Empty shop in the cloud (no website changes yet)

**Step 0.1 — Create the Supabase project**  
In the Supabase dashboard, create a project (region: US West or closest to Colorado). Save the project URL and the **anon** and **service role** keys in a password manager. You will put the URL + anon key in a local `.env` later. Never commit the service role key.

**Done when:** you can open the project’s Table Editor (it will be empty).

**Step 0.2 — Install the Supabase CLI in this repo**  
Follow current CLI docs. Run `supabase init` so the repo has a `supabase/` folder. Link the project (`supabase link`).

**Done when:** `supabase/config.toml` exists and `supabase --help` works on your machine.

**Step 0.3 — Create a Resend account and API key**  
Save the API key next to the Supabase keys. You will add it as a Supabase Edge Function secret, not in the frontend.

**Done when:** Resend dashboard shows an API key, and you know which from-address you will use (even if it is the Resend test address).

**Step 0.4 — Env files**  
Add `.env.example` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (empty values). Add `.env` locally (gitignored). Confirm `.gitignore` already ignores `.env`.

**Done when:** a new clone would know which env vars to fill, and secrets cannot be committed by accident.

---

### Phase 1 — Tables, lock, first admin user

**Step 1.1 — First migration: all v1 tables + RLS**  
Create a migration (CLI: `supabase migration new init_shop`). Add the tables in section 8 except `booking_photos`. Enable RLS. Add admin policies. Do not allow anon `select` or `insert` on those tables.

**Done when:** migration applies to the linked project (`supabase db push`). Table Editor shows the tables. A request without a login cannot read `leads`.

**Step 1.2 — Seed shop data**  
SQL seed: shop_settings, 8–10 service types (current brochure + AC + Emergency), two technicians, weekly availability_rules.

**Done when:** you can query `service_types` and see Drain Cleaning, Water Heater, Furnace, AC, Emergency.

**Step 1.3 — Create the one admin user**  
In Supabase Auth, create a user with your email. Insert a matching `profiles` row with `role = admin`. Turn off public sign-ups in Auth settings.

**Done when:** you can log in to that user in the Auth dashboard, and a second email **cannot** self-register.

**Step 1.4 — Activity helper**  
A small SQL function `log_activity(...)` that inserts into `activity_events`. Call it from functions later.

**Done when:** you can insert one test activity row and see it in Table Editor.

---

### Phase 2 — The demo loop (highest priority)

This phase is the sales call. Stay here until it is boringly reliable.

**Step 2.1 — Supabase client in the React app**  
Add `@supabase/supabase-js`. One module that reads the Vite env vars and exports `supabase`.

**Done when:** the app still builds, and a throwaway log of `supabase.auth.getSession()` returns `null` for a public visitor.

**Step 2.2 — `/login` + `/admin` shell**  
Login page (email, password, gold button). On success, go to `/admin`. A route guard bounces anyone without a session to `/login`. Admin layout: navy sidebar (drawer on mobile), shop name, Sign out. Empty dashboard is fine.

**Done when:** on your phone you cannot see `/admin` without logging in; on the laptop you can log in and see a blank office page that matches the branding.

**Step 2.3 — Edge Function `create-lead`**  
Accept JSON: `source`, `name`, `phone`, `email`, `city`, `description`, `service_type_id` (optional), `is_after_hours` (optional). Validate. Upsert customer by phone. Insert lead `status = new`. Insert `activity_events`. Insert `notifications` rows. Send shop email + customer “we got it” email via Resend. Return `{ lead_id }`.

For `source = click_to_call`, name/email may be empty; store what you have (or “Unknown caller”) and skip the customer email.

**Done when:** calling the function with curl/Postman creates a row in `leads`, a row in `notifications`, and you receive the shop email.

**Step 2.4 — Wire the public contact form**  
Add required **email**. Keep name + phone required. On submit, call `create-lead` with `source = contact_form`. On success, go to `/confirmation` with a real message (remove “this demo only, nothing was sent”). Show errors with a top-left toast.

**Done when:** from the **phone**, submit the form; Table Editor shows the lead; you get two emails (shop + customer).

**Step 2.5 — Admin leads list + lead page**  
`/admin/leads` table (cards on mobile): name, phone, source, status, time. Click row → `/admin/leads/:id`. On the detail page, change status (new/contacted/booked/won/lost). Lost asks for a reason (modal). Each change writes `activity_events` and timestamps.

**Done when:** you can open the lead you just submitted and mark it Contacted.

**Step 2.6 — Live updates + toast**  
While logged into `/admin` or `/admin/leads`, subscribe to Realtime inserts on `leads` (and later `bookings`). On insert: prepend the row and fire a top-left toast “New lead from {source} — {name}” with a View link.

**Done when:** laptop on `/admin/leads`, phone submits the form, laptop updates **without refresh**. This is the demo moment. Practice it twice.

**Step 2.7 — Click-to-call lead**  
Every public Call button: fire `create-lead` with `source = click_to_call` (and a `session_id` in `metadata` for debounce), then `window.location = tel:`. If the function fails, still open the dialer — a missed log is better than a blocked emergency call.

**Done when:** tapping Call on the phone creates a lead on the laptop. A second tap within a minute does not create a duplicate.

**Step 2.8 — Admin “new lead” page**  
`/admin/leads/new` — type name, phone, email, city, notes, source default `admin_manual`. Same create path (either the function or a direct admin insert under RLS; prefer one path).

**Done when:** you can type “they called the shop” during a demo and it shows up like any other lead.

---

### Phase 3 — Booking windows

**Step 3.1 — Availability read API**  
Edge Function or admin-callable RPC: given a date range, return each day’s open slots after applying rules, exceptions, and current booking counts vs capacity. Hide full slots. Hide `closed` exception dates.

**Done when:** with seed hours, this week shows weekday morning/afternoon, after-hours where seeded, and nothing on a day you marked closed.

**Step 3.2 — Admin availability page**  
`/admin/availability`: edit weekday rules (times + capacity), add a day off, add an extra after-hours date. Unique page, not a modal (except “remove this day off?”).

**Done when:** you turn Saturday off and the public picker no longer offers Saturday.

**Step 3.3 — Edge Function `create-booking`**  
Input: service, date, slot, name, phone, email, city, address, description. Re-check capacity inside the function (two people should not take the last slot). Create/reuse customer + lead (`status = booked`, `booked_at` set) + booking (`pending` or `confirmed`). Generate manage token, store hash, return token only in the customer email (do not put it on the public confirmation URL if you can avoid it — the email is the key). Email shop + customer.

**Done when:** a curl booking fills `bookings`, decrements remaining capacity, and both emails arrive. The customer email contains `/b/...`.

**Step 3.4 — Public `/book` and `/book/:slug`**  
Mobile-first wizard:

1. Service (skip if slug in URL)  
2. Day + window chips (Morning, Afternoon, After-hours). After-hours visually distinct.  
3. Contact fields including address.  
4. Submit → confirmation page.

**Done when:** on the phone you book tomorrow afternoon; laptop (Realtime from 2.6, now also on `bookings`) shows it.

**Step 3.5 — Admin booking page**  
`/admin/bookings` and `/admin/bookings/:id`. Assign a technician (dropdown is a small control; saving can stay on the page). Status changes. Cancel modal with reason.

**Done when:** you assign **Alex**, confirm the job, and the week view (next step) will have something to show.

---

### Phase 4 — Customer manage-link (no account)

**Step 4.1 — Edge Function `manage-booking`**  
Actions: `get`, `reschedule`, `cancel`. Auth is the raw token. Hash and look up. Reschedule re-checks capacity. Cancel requires a reason string. Email shop + customer on change. Log activity.

**Done when:** using the token from the email, you can fetch the booking without logging in.

**Step 4.2 — Page `/b/:token`**  
Show service, date, window, shop phone. Buttons: Reschedule (goes to a slot picker on the same URL, e.g. `/b/:token/reschedule` — unique page), Cancel (modal + reason). Success toasts top-left.

**Done when:** from the phone, open the email link, reschedule to morning; laptop booking page updates live.

---

### Phase 5 — Dispatch week view (the “office wall”)

**Step 5.1 — `/admin/schedule`**  
One week at a time (prev/next). Rows = techs (Alex, Sam) plus an **Unassigned** row. Columns = days. Each cell lists jobs by slot (Morning / Afternoon / After-hours). Tap a job → `/admin/bookings/:id`. On mobile, days scroll sideways.

**Done when:** the booking from Phase 3 is visible under Unassigned or Alex, and after-hours jobs are visually louder.

**Step 5.2 — Technician pages**  
`/admin/technicians`, `/admin/technicians/new`, `/admin/technicians/:id`. Name, color, active. Deactivate instead of delete if they have jobs.

**Done when:** you can add a third sample tech and see a new row on the week view.

---

### Phase 6 — The rest of the office (after the demo loop is solid)

**Step 6.1 — Service type CRUD + public slugs**  
Admin pages for services. Public `/services/:slug` reads the database (fallback: keep brochure content if a slug is missing). Home/Services index can keep using `business.ts` until this step, then switch the grid to `service_types` where `is_active`.

**Done when:** you add “Garbage disposal” in admin, it appears on `/services`, and `/services/garbage-disposal` is a real page you can book from.

**Step 6.2 — Customers**  
`/admin/customers` and `/admin/customers/:id` (leads + bookings for that person). No passwords, no ban button.

**Done when:** two form submits with the same phone show as one customer with two leads.

**Step 6.3 — Dashboard home**  
`/admin` widgets: new leads today, unbooked new leads, today’s job count, after-hours this week, last 5 activity events. Each widget links to the list page with the right filter.

**Done when:** you can run the sales-call script in section 14 using only `/admin` plus one click through.

**Step 6.4 — Reports**  
`/admin/reports` (simple tables are fine; a bar chart is extra credit):

- Leads by source (contact_form / click_to_call / admin_manual)  
- Lead → booking conversion (booked ÷ leads, exclude click_to_call if those rarely book — show both overall and “form only”)  
- Bookings per week (last 8 weeks)  
- After-hours / missed: count of `is_after_hours` leads and `after_hours` bookings; “missed” = click_to_call or after-hours leads still `new` after 1 hour  

**Done when:** after a practice demo, numbers match the rows you created (you can count them on your fingers).

**Step 6.5 — Settings + demo reset**  
`/admin/settings`: notify email, shop phone, timezone. Button **Reset demo data** (modal). Deletes leads, bookings, customers created as demo, notifications, activity except auth; does **not** delete services, techs, availability, or you.

**Done when:** you can trash a messy board in one confirm and the next form submit still works.

**Step 6.6 — Activity page**  
`/admin/activity` filterable by type. Login events: record `auth.login` / `auth.logout` from the client (best effort) or an Auth hook if you add one later.

**Done when:** you can point at “form submitted → emailed → you marked contacted → booked” as a timeline on one lead.

**Step 6.7 — Job photos (optional, last)**  
Storage bucket `job-photos`, private. Admin-only upload on `/admin/bookings/:id`. RLS/storage policies: admin read/write. Skip a public customer gallery.

**Done when:** you upload a sample photo on a job and see it after reload.

---

### Phase 7 — Hardening for real calls

**Step 7.1 — Mobile pass**  
Walk every new route on a phone: login, dashboard, lead detail, book wizard, magic link, week view. Fix anything that needs pinch-zoom or is hidden under the Call bar.

**Step 7.2 — Empty, error, and slow states**  
Function timeout / Resend down: save the lead anyway, mark notification `failed`, toast the admin if they are online. Never tell a homeowner “try again” if we already saved.

**Step 7.3 — Rate limits**  
Function-level: e.g. 5 form posts per IP per 10 minutes. Click-to-call debounce as in 2.7.

**Step 7.4 — Practice the script twice**  
Use section 14. Reset demo data between runs.

---

## 13. Testing seams (how we know it works)

Prefer tests at the **edges**, not inside React components:

1. **Database:** RLS — anon cannot select `leads`; admin can.  
2. **`create-lead`:** valid payload inserts lead + customer + emails queued; missing phone rejected.  
3. **`create-booking`:** last slot cannot be double-booked (two overlapping requests; one fails).  
4. **`manage-booking`:** wrong token → 404; cancel writes reason + timestamp.  
5. **Browser (you):** the two-screen demo script.

You do not need a huge test suite for v1. Those four function checks plus the live demo are enough.

---

## 14. Sales-call script (what you will actually do)

Reset demo data that morning.

1. Laptop: logged into `/admin`, volume up if you use a toast sound later (optional). Inbox open on the notify email.  
2. Hand the owner the **phone** on `/`.  
3. They tap **Request service**, fill name / phone / **email** / city / “water heater leaking,” send.  
4. You do not touch the laptop. The toast and row appear. Open the lead. Mark Contacted.  
5. Optional: they tap **Call** once — a click-to-call lead appears. Hang up the dialer.  
6. Go to **Book a visit** (or convert the lead to a booking on the lead page). Pick **tomorrow afternoon**.  
7. Week view: job sits on the board. Assign Alex.  
8. Show the customer email on the phone → **Manage this visit** → reschedule or cancel (cancel is dramatic; reschedule is safer in a live pitch).  
9. Reports: “that form vs that tap-to-call.” Keep it to 20 seconds.

If anything in this script is flaky, fix that before adding photos or extra reports.

---

## 15. Out of scope (explicit)

- Stripe / deposits / online invoices  
- Customer passwords, sign-up, “ban user”  
- Quote form, inbound email parser  
- Twilio/Vapi caller-summary texts (issue #3)  
- Multi-admin roles, technician logins  
- Exact-minute calendar, routing, GPS  
- Replacing the AI receptionist  
- Turning this into a white-label SaaS (the old “reusable trades site” notes). One demo shop first.

---

## 16. Suggested GitHub issue (do not open until you say yes)

Per `GITHUB_ISSUES_GUIDE.md`, no code until an issue exists and you confirm it.

**Title:** Wire web leads + window booking into a live admin dashboard (Supabase)

**Goal:** On a sales call, a form submit or tap-to-call on a phone appears on the admin laptop without refresh, emails the shop, and can be booked into a morning/afternoon/after-hours window.

**Done when:**

- [ ] Phone form creates a lead the laptop sees live  
- [ ] Shop and customer emails send  
- [ ] Click-to-call logs a lead  
- [ ] Customer can book / reschedule / cancel a window without an account  
- [ ] Admin week view shows the job  
- [ ] Demo reset works  

Put it on milestone **Demo ready for Monday calls** if that milestone still exists.

---

## 17. How to use this file

1. Read sections 1–2. If a decision is wrong, say so before any code.  
2. Confirm whether to open the GitHub issue in section 16.  
3. Build **Phase 0 → 2** first. Stop and use it.  
4. Then Phase 3–4 (booking + magic link).  
5. Then 5–7 if the call still needs a dispatch board and reports.

Do not implement Phase 6 until the two-screen loop in Phase 2 has been practiced successfully.
