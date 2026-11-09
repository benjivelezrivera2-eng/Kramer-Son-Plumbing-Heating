# Choose how many rows the office lists show

GitHub issue: [#45](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/45). GitHub assigned 45, not 14.

The Booking branch already exists. This plan comes after that branch and after issue 45. No application code until Benji says yes in chat.

## Outcome

On the office sample lists, the office can choose how many rows to show and move between pages. Bookings comes first. Ten rows is the default.

The five sample visits all fit on a page of 10, so the rows choice also includes a smaller number. Picking that smaller number puts only that many visits on the page. The next page shows the rest of the visits that match the current filters and sort. Changing a filter or a sort returns to the first page.

After Bookings, the same control goes on the other office tables that are long lists. The dashboard recent lists use that same count and those same pages when a list runs past the chosen count. Recent bookings and recent activity stay recent lists.

Services stays a card grid. Team stays a short staff table. Do not page those two just to match Bookings.

This is sample data only. Do not add class capacity, calendars, or recurring sessions. Do not change prices, visit actions, or the public site. Do not add visits just to fill a page.

## Files

- `src/pages/admin/MockBookingsPage.tsx` — the rows choice and the pages, on the filtered and sorted sample list
- `src/pages/admin/MockDashboardPage.tsx` — the same control on Recent bookings and Recent activity when those lists run past the chosen count

Do not change `src/pages/admin/MockServicesPage.tsx`, `src/pages/admin/MockClientsPage.tsx`, prices, visit actions, or the public site. Leave the sample rows in `src/lib/adminMock.ts` as they are.

## Steps

1. On Bookings, add a rows choice that starts at 10, and a way to move between pages.
2. Include a smaller choice so the five sample visits can spill onto a second page.
3. Page the rows that already match the filters and the sort. A new filter or a new sort goes back to page one.
4. Use that same control on the other office tables that are long lists, and on the dashboard recent lists when they run past the chosen count.
5. Leave Services as a card grid and Team as a short staff table.

## Verify

- Open `/admin/bookings`. The list starts at 10 rows, so the five sample visits are all on page one.
- Choose the smaller count. Only that many rows show. The next page shows the rest. Prices and statuses are unchanged.
- Filter or sort, and the list returns to page one. Opening a row still confirms, marks pending, cancels, or corrects the service.
- Recent bookings and recent activity on `/admin` use the same count when they run past it.
- Services is still a card grid. Team is still the short staff table. The public site still shows no office prices.
