# Collect the customer, then confirm in one path

Local plan 19. This one file is the issue and the plan. Plans 15 through 18 already exist, so this file is 19.

It follows plan 18. It does not replace that work. The Booking branch already exists. Build this on the Booking branch, then review.

## Issue

### Goal

A homeowner cannot finish a booking until the page has their name, phone, and service address. The confirmation then shows what was booked, when the visit is, and who to expect. The contact form, the visit-window step, and the services section no longer send the customer back and forth. One start leads to one done.

### Steps

- [x] Every booking path asks for name, phone, and service address before it can confirm. That includes the service-card modal, the contact form, and the buttons that currently jump to Book or Services.
- [x] The confirmation shows the service, the day and morning or afternoon, and who is coming.
- [x] Stop the contact form from sending the customer to the services section to pick a visit window. Finish on that same path.
- [x] Leave Calendly, customer accounts, the office week view, and public Office or Shop login links out.

### Done when

- [x] The booking cannot confirm while name, phone, or service address is empty.
- [x] The confirmation names the service, the day and window, and who is coming, plus the name, phone, and address just entered.
- [x] Submitting the contact form does not move the page to the services list or to a separate window picker.
- [x] Book a service, Book, and Book a window open that same booking and do not bounce between contact, windows, and services.

## Plan

### Outcome

A booking cannot confirm until the page has a name, a phone, and a service address. The same step also takes a day and Morning or Afternoon, because the confirmation has to say when. The confirmation then shows the service, that day and window, who is coming, and the name, phone, and address just entered.

Who is coming is a Kramer & Son tech. There is no named technician in the shop config, and this stays sample copy. Nothing is read from or written to Supabase. No customer account is created.

There is one booking dialog. These starts open it and stay there until Done:

- A What we fix card, with that service already chosen
- The header button Book a service
- The Book control in the header and the footer
- Book a window in the hero and in the bottom band
- Book on the mobile bar
- Book this on a service page

The contact form is the other start, and it finishes where it is. It asks for the name, the phone, and the service address, plus the service, the day, and Morning or Afternoon. Submitting it shows the confirmation in that same section. It does not navigate to `#book` or `#services`.

The loop that goes away: the contact form says to pick a visit window on the next page, then sends the customer to `#book`, and `#book` sits on the services section. Book a service also only scrolls to that section. Those jumps are not a second step.

### Files

- `src/components/BookingDialog.tsx` — the shared form and confirmation, and the one dialog
- `src/layouts/SiteShell.tsx` — holds that dialog so the other starts can open it
- `src/sections/ServicesSection.tsx` — a card opens the dialog with that service
- `src/components/SiteHeader.tsx` — Book a service and Book open the dialog
- `src/components/SiteFooter.tsx` — Book opens the dialog
- `src/sections/HeroSection.tsx` — Book a window opens the dialog
- `src/components/CtaBand.tsx` — Book a window opens the dialog
- `src/components/MobileCtaBar.tsx` — Book opens the dialog
- `src/pages/ServiceDetailPage.tsx` — Book this opens the dialog
- `src/components/ServiceRequestForm.tsx` — the same details, confirmation in place, no hash change
- `src/sections/ContactSection.tsx` — the line about the next page comes off
- `src/app/App.tsx` — `/book` no longer sends the customer to the services section

Do not open Calendly. Do not change `src/pages/admin/MockBookingsPage.tsx`. Do not put these bookings in `src/lib/adminMock.ts`. Do not add Office or Shop login on a public page.

### Steps

1. Add one booking dialog. It cannot confirm while name, phone, or service address is blank. It also takes the service, a day, and Morning or Afternoon.
2. Open that dialog from each card and from Book a service, Book, and Book a window. Do not send those clicks to another section.
3. On confirm, show the service, the day and window, who is coming, and the name, phone, and address.
4. On the contact form, collect those same details and show that same confirmation in the contact section. Remove the jump to `#book`.
5. Leave prices, customer sign-in, Calendly, the week grid, and the office screens out.

### Verify

- Open a service card, leave the name blank, and try to book. It does not confirm. Fill name, phone, and a street address, pick a day and Morning or Afternoon, then book. The confirmation shows that service, that day and window, a Kramer & Son tech, and the details just typed.
- From the contact section, Book a service opens the dialog. It does not leave the customer on a loop back through the services list.
- Submit the contact form with the details filled. The confirmation appears in that section. The address does not change to `#book` or `#services`.
- The public header and footer still have no Office link and no Shop login. `/admin/bookings` is unchanged.

### Stays out

A separate Book a Visit week, grid, calendar, or filter bar. Spots left, waitlists, recurring visits, memberships, and card payments. Customer sign-in and a customer dashboard. Calendly. Prices on the public site. The office week view (plan 16, issue 47) and the office service fields (plan 17, issue 48). An Office or Shop login link on any public page. Writing the booking to Supabase.
