# Book from a service card, then confirm

Local plan 18. Plans 15, 16, and 17 already exist, so this file is 18.

GitHub issue: [#49](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/49). GitHub assigned 49, not 18.

The Booking branch already exists. Benji confirmed this direction. Build it on the Booking branch, then review.

## Outcome

Booking uses the service cards in What we fix. It does not use the slots at the bottom of the page. A visitor clicks one of those cards. One modal opens. They book the job there. The same modal then shows the confirmation.

That is the whole flow. The Book a Visit section at the bottom, with its week of windows, grid, calendar, and filters, is not a booking path. Take that block off the landing page so the cards are the only way to book. Every card opens that same modal.

The booking finishes on our landing page. Nothing opens Calendly. There is no customer sign-in, no personal account, and no customer dashboard.

The point is a clean page and a clear confirmation. A homeowner picks the service, books it, and sees that it is booked, without a second schedule in the way.

The Office link does not belong on a public page. Take Office off the public header and Shop login off the public footer. No login check and no device check for this. That idea can be revisited later. The office screens themselves still use Dashboard, Services, Team, and Bookings.

- File: `src/sections/ServicesSection.tsx` — the What we fix cards. Each one opens the modal.
- File: `src/pages/HomePage.tsx` — route `/`. What we fix stays. The slots at the bottom do not.
- The header button that says Book a service still goes to the services list.

A booking from a card is sample copy on the public page. It does not show a client's name. Nothing is read from or written to Supabase.

## Where the lesson said this

Benji pointed at minute 4:11 of `16. Landing Page Bookings.mp4`. That file is 2 minutes 49 seconds, so there is no frame at 4:11. The same prompt is on screen at 2:04. The caption says the booking was made straight away, and the prompt asks for a confirmation with the details, because that is good for trust. There is no separate transcript track.

The frame is `C:\Users\247be\AppData\Local\Temp\watch-e5eapbyu\frames\cue_0005.jpg`.

## Files

- `src/sections/ServicesSection.tsx` — the book action on each card, and the one shared modal
- `src/pages/HomePage.tsx` — no separate book section
- `src/sections/BookSection.tsx` — removed from the home page. The file is gone.
- `src/components/SiteHeader.tsx` — no Office link on a public page
- `src/components/SiteFooter.tsx` — no Shop login on a public page

Do not open Calendly. Do not change `src/pages/admin/MockBookingsPage.tsx`. Do not put these bookings in `src/lib/adminMock.ts`.

## Steps

1. Keep What we fix. Each service card opens the same modal.
2. In that modal, book the job, then show the confirmation for that service.
3. Remove the Book a Visit slots at the bottom, including the week of windows, the grid, the calendar, and the filters for day, service, and town.
4. Leave prices, customer sign-in, personal accounts, a customer dashboard, Calendly, and the office week view out.
5. Remove Office from the public header and Shop login from the public footer.

## Verify

- What we fix is the only place to book. Clicking a card opens one modal. Booking in that modal shows the confirmation for that service.
- The bottom of the page has no Book a Visit slots, no week of windows, no grid, no calendar, and no day, service, or town filter bar.
- Calendly does not open. No account is created.
- `/admin/bookings` is unchanged. Nothing is written to Supabase.
- A public page shows no Office link and no Shop login.

## Stays out

A separate Book a Visit section. A public grid, calendar, or filter bar for days, services, and towns. Spots left, waitlists, recurring visits, memberships, and card payments. Customer sign-in, personal accounts, and a customer dashboard. Calendly. Prices on the public site. The signed-in customer home from the earlier lesson. The office week view (plan 16, issue 47) and the service fields on the office Services page (plan 17, issue 48). An Office or Shop login link on any public page.

## After this paperwork

Benji confirmed. Change the page on the Booking branch, then review.
