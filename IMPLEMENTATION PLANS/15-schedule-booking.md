# Schedule a new visit from Bookings

Local plan 15.

GitHub issue: [#46](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/46). GitHub assigned 46, not 15.

The Booking branch already exists. No application code until Benji says yes in chat.

## Outcome

This lives on the Bookings page the office already uses.

- File: `src/pages/admin/MockBookingsPage.tsx`
- Route: `/admin/bookings`
- Nav label: Bookings

The office already opens a visit in a dialog on that page. Scheduling a new visit uses a dialog there too. It does not add a page, and it does not add a menu item.

New booking already exists in two places, and both only say a booking was not created. Those two open this dialog:

- The New booking line in the header quick actions, in `src/layouts/AdminShell.tsx`
- The New booking button on the dashboard, in `src/pages/admin/MockDashboardPage.tsx`

The dialog collects the service, the date, a start time, and the other fields a visit already has: the client, Morning or Afternoon, and the status. A new visit starts as Requested. If the office leaves the price blank, the list uses that service's starting price, the same way a visit with no price of its own already does.

Saving adds the visit to the sample list the dashboard already counts. Closing without saving adds nothing. A refresh brings back the five seed visits. This is sample data only. It does not read or write Supabase.

Out of scope: the old Book a window page at `/admin/bookings/new`, the week view, service capacity, the public site, and a new menu item. The list, the filters, the sort, and the dialog that opens an existing visit stay as they are.

## Files

- `src/pages/admin/MockBookingsPage.tsx` — the schedule dialog on Bookings
- `src/layouts/AdminShell.tsx` — the existing New booking line opens that dialog
- `src/pages/admin/MockDashboardPage.tsx` — the existing New booking button opens that dialog

The sample list already lives in memory on the office shell, and the seed stays in `src/lib/adminMock.ts`. A new visit is held in that memory until refresh. Do not write it to Supabase. Do not change `src/pages/admin/AdminBookingNewPage.tsx`.

## Steps

1. On Bookings, add a dialog that asks for the client, the service, the date, a start time, and Morning or Afternoon. Status starts as Requested. Price can be left blank.
2. Point the header New booking line and the dashboard New booking button at that dialog on `/admin/bookings`.
3. Saving adds the visit to the sample list. Closing without saving adds nothing.
4. Leave the existing visit dialog, the filters, and the sort as they are.
5. Do not send the office to `/admin/bookings/new`. Do not add a menu item.

## Verify

- From Bookings, the header, or the dashboard, New booking opens the schedule dialog on `/admin/bookings`.
- The dialog asks for the client, the service, the date, a start time, and Morning or Afternoon.
- A saved visit shows on the Bookings list and in the dashboard counts. Refresh restores the five seed visits.
- Opening an existing row still confirms, marks pending, cancels, or corrects the service.
- The menu is still Dashboard, Services, Team, and Bookings. Nothing is written to Supabase. The public site is unchanged.
