# Admin overview sample

Issue: [#40](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/40)

## Outcome

The office dashboard stays a sample. It does not read or write the database. This work does not use MCP.

The visits live in the office shell for this visit to the site. Confirm, mark pending, and cancel on Bookings change that same list, and the dashboard counts it. Refreshing the page restores the sample.

Kramer is a plumbing shop. There are no live clients yet. The sample visits stand in for them. A visit is one job. Do not count class slots, capacity, or session types.

The four cards today use invented totals. Replace those totals with numbers counted from the sample visits.

## Cards

- Revenue is the dollars on Confirmed visits only. Use the visit's own price when it has one. Otherwise use that service's starting price. Requested, Pending, Done, and Cancelled visits do not add to this number.
- People is the count of distinct names on the sample visits. Do not count the Team list. The Team list is staff.
- Upcoming visits is the count of visits dated today or later whose status is not Done and not Cancelled.
- Pending is the count of visits whose status is Pending. A Requested visit is still a new request, and it is not counted here until the office marks it pending.

Each card has a short line under the number and a small tip above the card on hover. The tip does not open inside the card. That tip is [#42](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/42).

## Date filter

The dashboard can show all visits, today, this week, or this month. The same choice narrows the four cards, the visit list, and recent activity. The dates stay inside the sample file.

## Recent activity

Activity can be shown three ways: admin actions, client bookings, or all activity. The section opens on admin actions. Admin actions are things the office did, including confirming a visit, marking it pending, or cancelling it. Client bookings are requests that arrived, such as the website form. The sample needs at least one client-booking row and one admin-action row so those choices are visible. A new status change is added as an admin action.

## Other office pages

Bookings already opens a visit from its row. Do not rebuild that here.

Services is the catalog. Plumbing and Heating are the groups. There is no categories page and no class schedule. Clicking a service opens that service on the sample: name, group, summary, and starting price. Closing it does not save anything.

Do not add row actions on Team.

## Files

- `src/lib/adminMock.ts` — the visit dates, prices, statuses, and activity kinds the cards count
- `src/pages/admin/MockDashboardPage.tsx` — the four cards, the hover lines, the date filter, and the activity filter
- `src/pages/admin/MockServicesPage.tsx` — open a service from its row

Do not change the public site. Do not connect this screen to Supabase.

## Steps

1. Count the four cards from the sample visits, using the rules above.
2. Add the hover line on each card.
3. Add the date filter and apply it to the cards, the visit list, and activity.
4. Tag activity as a client booking or an admin action, and filter the list.
5. Open a service from its row. Leave Team and the bookings visit dialog as they are.

## Verify

- Open `/admin` while signed in as the admin. The four cards match the sample visits for the date filter that is selected.
- Hover each card. The line says what the number means.
- Choose today, this week, and this month. The cards change.
- Show all activity, then only client bookings, then only admin actions.
- Open a service from its row. Team rows still do nothing.
- The public homepage is unchanged.
- The browser network calls for this screen do not include a Supabase read or write.
