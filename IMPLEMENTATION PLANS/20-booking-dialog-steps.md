# Tighten the booking screens in eight small steps

Local plan 20. GitHub issue 50: https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/50

The Booking branch already exists. Build this on that branch. Do one step, review it on the site, then do the next. Do not land all eight at once.

This follows plan 19 and issue 49. It does not replace that work. The dialog already asks for a name, a phone, a street, a day, and Morning or Afternoon, and the confirmation stays on the page.

## Outcome

A homeowner still books on the public home page. The same dialog is easier to finish with a keyboard, the errors say what to type, and every Book control uses the same words. The leftover page that opens Calendly is retired. The office list, which is a separate screen, shows its status note and asks before a visit is cancelled.

No customer account. Nothing is read from or written to Supabase. Calendly stays closed. Navy, gold, Gabarito, and the town names stay.

## Steps

Do these in order. Stop after each one and look at the screen before starting the next.

1. **Same words.** Label every general Book control "Book a visit." On a service card or a service page, name the job, as in "Book drain cleaning." Header, footer, the mobile bar, the hero, and the service page all open the same dialog, so they should not say "Book," "Book this," or "Book a window."

2. **Easy to tap.** Make the header and footer Book controls as tall as the gold buttons. Lift the mobile bar off the phone's bottom edge so a thumb can hit it.

3. **Stay in the dialog.** When Book a visit opens, put the cursor in Name. Keep Tab inside the dialog until it closes. Stop the page behind it from scrolling.

4. **Say what to fix.** If name, phone, street, service, day, or Morning or Afternoon is empty, move to the first empty field and write the fix under that field. Use "Enter a phone number we can call," and require a real number of digits. Show the line when someone leaves the field, and again if they press Book this job. One letter is not a phone number.

5. **Say what the shop does.** In the dialog, say the listed days are weekdays. Name the Sterling shop and the towns it covers: Sterling, Fort Morgan, Brush, and Greeley. Say to call if it is a leak, a clog, or no heat.

6. **After the contact form.** When that form confirms a visit, offer Done or Book another visit. The dialog already has Done. The form should not leave the person on a confirmation with nowhere to go.

7. **One booking path.** Retire the leftover page that still says to open Calendly in a new tab. A direct link for one service opens the same visit dialog.

8. **Office list, last.** On the office bookings list, show each status note in the row, keep a visible focus ring on the row, and label the action "Cancel visit" with a confirm step. Cancel must not change the job the moment it is pressed. This list stays the shop's screen. It is not the public form.

## Done when

- Each step has been reviewed on its own before the next one starts.
- Book a visit, a service card, the header, the footer, and the mobile bar use the words in step 1, and those controls are easy to tap.
- Tab stays in the dialog, the cursor starts in Name, and an empty field gets a plain line under it.
- The dialog names the weekdays, the towns, and the call for a leak, a clog, or no heat.
- The contact form offers Done or Book another visit.
- The old Calendly page is gone.
- The office list shows the status note, a visible focus ring, and a confirm step before a visit is cancelled.

## Out

Prices, spots left, a waitlist, a customer account, Stripe, and email. The office week view stays on issue 47. The service catalog fields stay on issue 48. Code waits until Benji says yes, and then it lands one step at a time.
