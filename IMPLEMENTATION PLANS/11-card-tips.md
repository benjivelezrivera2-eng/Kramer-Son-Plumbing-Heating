# Dashboard card tips

Issue: [#42](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/42)

## Outcome

The four dashboard cards explain themselves the way the lesson does. A short line sits under the number. An info mark sits by the title. Hovering or focusing a card shows a small tip above that card, and that card is the one that lifts and picks up a teal edge.

The tip does not open as a block inside the card, and it does not cover the number. There is no "What this is" label.

The counts stay as they are. This does not change revenue, clients, active jobs, or pending. It does not read or write the database.

## Lines

- Revenue: Confirmed visits only.
- New clients: Different customers on these visits.
- Active jobs: Visits still ahead, not finished or cancelled.
- Pending: Visits the office marked pending.

## Files

- `src/pages/admin/MockDashboardPage.tsx` — the four cards and the tip

Do not change the public site.

## Steps

1. Remove the in-card block and the "What this is" label.
2. Put the short line under the number, and an info mark by the title.
3. On hover or focus, show that same line in a small tip above the card, and mark the card under the pointer.

## Verify

- On `/admin`, hover Revenue, then New clients, Active jobs, and Pending. Each tip sits above its own card. The number stays visible. The card under the pointer is the one with the teal edge.
- The other three cards stay plain while one is hovered.
- Keyboard focus shows the same tip.
