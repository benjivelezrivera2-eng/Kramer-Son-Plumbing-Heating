# Office header: quick actions, then bell, then profile

GitHub issue: [#44](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/44). GitHub assigned 44, not 13. The issue lives on GitHub. There is no local issue file.

Benji asked for this header. The work is the office header only. The full notifications page is not part of it.

## Outcome

On a wide office header, the right side reads left to right: quick actions, then the bell, then the profile picture on the far right.

The top-right profile picture does not show a name or a chevron beside it. The name stays on the profile picture at the bottom left of the sidebar. Opening the top-right picture still shows the same list: name, email, Profile, Settings, and Sign out.

Quick actions is a menu immediately left of the bell. Opening it shows four lines:

- New booking. Same sample line the dashboard already uses: a booking was not created. It stays on the page. It does not save anything.
- Services. Opens the Services page that is already in the office.
- Team. Opens the Team page that is already in the office.
- Bookings. Opens the Bookings page that is already in the office.

The bell is a plain icon, the same idea as the gym lesson: no box around it, and no number on it. Opening it shows a short list titled Notifications. Each line has a title, the message, and the time under the message. Unread lines are dark. Read lines are light. Clicking a line marks it read. The bottom line says View all activity. That line closes the list. It does not open a new page.

Clicking outside a list, or pressing Escape, closes it. Search, the small-screen menu button, and the sidebar stay as they are.

## Files

- `src/layouts/AdminShell.tsx` — header order and the quick actions menu
- `src/components/ProfileMenu.tsx` — the top-right picture hides the name; the sidebar keeps it
- `src/components/admin/NotificationBell.tsx` — the plain bell and the short list

## Steps

1. Put quick actions immediately left of the bell, and the profile picture immediately right of the bell.
2. Hide the name beside the top-right picture. Leave the name on the sidebar picture.
3. Make the bell a plain icon and shape its list like the gym lesson: title, message, time, then View all activity.
4. New booking shows the sample line. Services, Team, and Bookings open the pages that already exist.
5. Do not add a notifications page.

## Verify

- On a wide office page, the right side is quick actions, then the bell, then the picture alone.
- The sidebar picture at the bottom left still shows the name.
- Open quick actions. The list is New booking, Services, Team, Bookings.
- New booking shows the sample line and the page does not change.
- Open the bell. The list is titled Notifications. Each line has a title, a message, and a time. The bottom line says View all activity and does not leave the page.
- Search and the small-screen menu button are still there.
