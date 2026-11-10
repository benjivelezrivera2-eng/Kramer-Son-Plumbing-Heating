# One hover tip at a time, then the same tip on the rest of the site

Local issue draft: `.issue-12-site-wide-tips.md` (file 12).
GitHub issue: [#43](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/43). Numbers 1 through 42 are already used, so this cannot be GitHub issue 12.

No application code until this plan exists, issue 43 exists, and Benji says yes in chat.

## Outcome

Hovering New clients and then clicking Revenue leaves Revenue's tip stuck open. The card is focusable, and the tip stays up because the click leaves focus on that card. A second card can show its own tip at the same time.

Clicking a card opens that card's tip and closes any other. Clicking outside, or leaving the card, closes it. The short line under the number stays. The info mark stays by the title. The tip stays the small one above the card. It does not cover the number, and it does not come back as a block inside the card.

That same tip is then used on the rest of the site, wherever a number or a label needs one sentence. Office pages and public pages. Headings that are already plain do not get a tip.

The counts do not change. Nothing is read from or written to the database.

## Why it sticks

`Stat` in `src/pages/admin/MockDashboardPage.tsx` shows the tip on hover and also while the card contains focus. The card has `tabIndex={0}`, so a click focuses it. The tip stays after the pointer leaves.

## Files

- `src/pages/admin/MockDashboardPage.tsx` — the stuck tip on the four cards
- One shared tip, used by the dashboard and by the other pages that need one sentence

Do not change visit counts, prices, or service copy.

## Steps

1. On the dashboard, one tip open at a time. A click opens that card's tip and closes the others. Clicking outside, or leaving the card, closes it.
2. Keep the short line under the number and the info mark by the title.
3. Use that same small tip on the other office pages and the public pages where a number or a label needs one sentence.

## Verify

- On `/admin`, hover New clients, then click Revenue. Revenue's tip is open. New clients' tip is closed. The number stays visible. Only Revenue has the teal edge.
- Click outside. The tip closes.
- Hover Active jobs, then Pending. Only the card under the pointer is open.
- Keyboard focus still shows the tip for the focused card, and it does not leave a second tip behind.
- A page that did not need a tip still looks the same.
