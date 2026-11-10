# Admin bookings sample

Issue: [#39](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/39)

## Outcome

The office Bookings page stays a sample. It does not read or write the database.

Today the sample list is a set of leads. The rows use the names Elena Ruiz, Priya Shah, Owen Brooks, Marcus Hale, and Hannah Cole. Their statuses are Requested, Confirmed, and Done.

This change keeps a sample list, and it keeps a mix that includes Requested, Confirmed, and Done so the status filter has those to show. The person on each visit changes. Each visit is tied to one of the two people who already have the client role. Do not invent new people, and do not use the Team list. The Team list is staff. Repeat those two client-role people across the visits.

Each visit is also tied to one service from the office services sample.

## Price

If a visit has its own price, show that price.

If it does not, show the starting price already saved on that service. Drain cleaning is $149, sewer line repair is $425, water heater repair is $189, water heater installation is $399, leak detection is $249, toilet and fixture repair is $129, furnace and heating repair is $189, and pipe and water line repair is $275.

A visit with no price of its own, on a service that also has no starting price, shows no number.

These prices stay on the office sample. The public website does not pick them up.

The visit dialog can correct a visit's service to another service already on the office catalog. Doing so drops that visit's own price, so the row, the dialog, and revenue use the new service's starting price.

## What the page does

The list can be narrowed three ways:

- Status, including Requested, Confirmed, Done, and the Pending and Cancelled states the visit actions set.
- Service, using the services already on the sample.
- Date: today, this week, this month, or a custom range. Each sample visit needs a real date so these choices can work. The date stays inside the sample file.

Clicking a row opens that visit. From there the office can confirm it, mark it pending, or cancel it. The list updates to the new status. Closing the visit does not change the status.

Search already on the office header keeps working with the filters.

## Missed item — column sorting

The first pass left out sorting. The list is a table with five headings: Client, Service, Date, Price, and Status.

Clicking a heading reorders the rows by that column. Clicking the same heading again flips the order. The heading that is sorting the list is underlined. The other headings are not.

Date starts as the underlined column, earliest visit first. Price uses the number on the row, which is the visit's own price or the service starting price. A row with no number sorts after the priced rows.

## Files

- `src/lib/adminMock.ts` — sample visits, the two client-role names, the service link, the date, and any visit price
- `src/pages/admin/MockBookingsPage.tsx` — filters, the clickable row, the visit actions, and the column sort
- `src/pages/admin/MockDashboardPage.tsx` — only if the dashboard search still reads the old booking fields

Do not change the public site. Do not connect this screen to Supabase.

## Steps

1. Give each sample visit a date, a service, and one of the two existing client-role people.
2. Give some visits their own price, and leave the others to use the service starting price.
3. Add the status, service, and date filters.
4. Open a visit from its row. Confirm, mark pending, or cancel, and show the new status on the list.
5. Sort by Client, Service, Date, Price, and Status. Underline the heading that is active.

## Verify

- Open `/admin/bookings` while signed in as the admin. The rows are the two client-role people, not the old lead names, and the statuses still include Requested, Confirmed, and Done.
- Filter by status, by service, and by today, this week, this month, and a custom range. The list narrows.
- Open a row, mark it pending, and confirm the list shows Pending. Confirm another, and cancel another. The list matches.
- A visit with its own price shows that price. A visit without one shows the service starting price.
- The public homepage service cards still show no prices.
- The browser network calls for this screen do not include a Supabase read or write for bookings.
- Click Date, then Client, Service, Price, and Status. Each click reorders the rows, and only the heading you clicked is underlined. Click that heading again and the order flips.
