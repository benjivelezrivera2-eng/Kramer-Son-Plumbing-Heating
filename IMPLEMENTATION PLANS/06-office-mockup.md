# Admin office mockup

Issue: [#32](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/32)

## Outcome

The office shows a short menu — Dashboard, Services, Clients, Bookings — with sample data only. Search, skeleton loaders, and a bell feed are part of the layout. The profile page stays as it is. Nothing on these four screens reads or writes shop records.

The bell feed uses a fixed item shape so a later n8n workflow can append a website-form event. This issue does not connect n8n. Calendar bookings, email automations, payments, and SEO stay in later lessons.

## Files

- `src/layouts/AdminShell.tsx` — menu, collapse, breadcrumbs, search, bell
- `src/app/App.tsx` — point the four screens at the mock pages; add `/admin/clients`
- `src/lib/adminMock.ts` — sample records and the notification shape
- `src/components/admin/MockBits.tsx` — sample label, skeletons, empty search
- `src/components/admin/NotificationBell.tsx` — bell and feed panel
- `src/pages/admin/MockDashboardPage.tsx`
- `src/pages/admin/MockServicesPage.tsx`
- `src/pages/admin/MockClientsPage.tsx`
- `src/pages/admin/MockBookingsPage.tsx`

Leave the profile page and the older office pages on disk. Leads, week board, technicians, hours, reports, and the live list pages stay reachable by their existing URLs and come off the menu.

## Steps

1. Replace the sidebar entries with Dashboard, Services, Clients, and Bookings. Keep the profile menu.
2. Build the four screens from `adminMock.ts` only.
3. Header search filters those samples. A date range on the dashboard only swaps the sample card numbers.
4. Each of the four screens shows skeletons, then the samples.
5. The bell opens the sample feed and can receive one extra sample item so the badge is visible. Marking an item read is local state.

## Verify

- Open `/admin` while signed in as the admin. The menu is the four items. Cards, lists, and the bell show sample copy, including the line that nothing is saved.
- Type a client name into search on Clients and on the dashboard. The lists narrow. A nonsense query shows the empty state.
- Reload a list page and confirm the skeleton appears before the rows.
- Open the bell, mark one item read, and confirm the badge count drops.
- Open `/admin/profile` and confirm the profile form is the existing page.
- Confirm the browser network calls for these four screens do not include Supabase table reads for leads, bookings, or customers.
