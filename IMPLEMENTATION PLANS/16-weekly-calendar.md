# Week view of visits on Bookings

Local plan 16.

GitHub issue: [#47](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/47). GitHub assigned 47, not 16.

The Booking branch already exists. No application code until Benji says yes in chat.

## Outcome

This lives on the same Bookings page as the list. It is a second view of the same sample visits. The list stays, and the list is what opens first.

- File: `src/pages/admin/MockBookingsPage.tsx`
- Route: `/admin/bookings`
- Nav label: Bookings

The office gets a List and Week choice on Bookings. Week shows seven days. Each sample visit sits on the date it already has, with the client, the service, and Morning or Afternoon. The five sample visits are not all in one week, so the office can move to the previous week and the next week. Clicking a visit opens the same dialog the list already uses.

The This week filter on the list stays a filter. It is not this view. The rows control from plan 14 stays on the list. The week view is not a paged table.

This is sample data only. A refresh brings back the seed visits. It does not read or write Supabase.

Out of scope: a new menu item, the old week board at `/admin/schedule` (that page is off the menu and reads Supabase), the public site, and any change to the visit seed just to fill an empty day.

## Files

- `src/pages/admin/MockBookingsPage.tsx` — the List and Week choice, and the week of the same sample visits

Do not change `src/pages/admin/AdminSchedulePage.tsx`. Do not add Week to the office menu in `src/layouts/AdminShell.tsx`. Leave the seed rows in `src/lib/adminMock.ts` as they are.

## Steps

1. On Bookings, add a List and Week choice. List remains the default.
2. Week lays the sample visits on the days already stored on those visits.
3. Add previous week and next week.
4. Clicking a visit in the week opens the same visit dialog as the list.
5. Leave the list filters, the sort, the This week filter, and the menu as they are.

## Verify

- `/admin/bookings` still opens on the list. The menu is still Dashboard, Services, Team, and Bookings.
- Week shows Elena Ruiz, Priya Shah, Owen Brooks, Marcus Hale, and Hannah Cole on the dates the sample already uses. Previous week and next week move that grid.
- Opening a visit from the week still confirms, marks pending, cancels, or corrects the service.
- Refresh restores the seed visits. `/admin/schedule` stays off the menu. Nothing is written to Supabase. The public site is unchanged.
