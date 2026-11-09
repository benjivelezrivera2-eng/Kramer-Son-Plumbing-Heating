# Capacity, date, time, and a description on Services

Local plan 17.

GitHub issue: [#48](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/48). GitHub assigned 48, not 17.

The Booking branch already exists. No application code until Benji says yes in chat.

## Outcome

This lives on the Services page the office already uses. The cards stay a grid. There is no new page and no new menu item.

- File: `src/pages/admin/MockServicesPage.tsx`
- Route: `/admin/services`
- Nav label: Services

Each card already shows Plumbing or Heating, the name, the starting price, and a short summary. Keep those. This plan adds four office fields on the card:

- Capacity: how many visits that service can take. It is a number on the service. It is not a list of people.
- A date.
- A time.
- A description. The short summary already on the card is that description, and the office can change it.

Where a service is already on a sample visit, the date on the card uses that visit's date, and the time matches Morning or Afternoon. Every service gets a capacity number in the sample, including a service that has no visit yet. The office can change the four fields on the card. The change lasts until refresh. Refresh restores the seed.

Starting prices stay the numbers already on the cards. This is sample data only. It does not read or write Supabase. The public site does not show these fields.

Out of scope: a new product area, the old service detail page at `/admin/services/:id`, Bookings, Team, and any change to the starting prices.

## Files

- `src/pages/admin/MockServicesPage.tsx` — the four fields on each service card
- `src/lib/adminMock.ts` — the sample capacity, date, time, and description on each service

Do not change `src/pages/admin/AdminServiceDetailPage.tsx`. Do not change the public site.

## Steps

1. On each service card, show how many visits that service can take, a date, a time, and the description.
2. Fill them from the sample. Use a visit date the office already has when that service is on a visit.
3. Let the office change those four fields on the card. Refresh puts the seed back.
4. Keep the card grid, the Plumbing and Heating filters, the names, and the starting prices.
5. Do not add a menu item, and do not open the old service detail page.

## Verify

- `/admin/services` still opens the card grid. The menu label is still Services.
- Each card shows a capacity number, a date, a time, and a description. Changing one lasts until refresh, and refresh restores the seed.
- Starting prices are unchanged. Plumbing and Heating still filter the cards.
- The public site does not show these fields. Nothing is written to Supabase.
