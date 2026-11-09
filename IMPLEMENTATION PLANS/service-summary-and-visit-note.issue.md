# Show each service summary in a column, and a note on each visit

This file is the draft for one GitHub issue. An issue is the ticket that says what to build. This ticket is not on GitHub yet. Nothing gets built until Benji says yes.

Plan: `IMPLEMENTATION PLANS/12-service-summary-and-visit-note.md`

## Goal

On the office Services sample, the short description of each job sits in a paragraph under the name. Move that existing description into a column right after the name, so the office can read down the list. Do not write new descriptions.

On the bookings sample, each visit gets a note. The note shows in a column right after the service name, and in the visit dialog, where the office can change the words. Most visits start from that service's description. Elena Ruiz's sample visit already says "Tank is leaking at the base," so the list also shows a note written for one house. A refresh puts the sample notes back. Nothing is saved in the database.

Switching a visit to another service replaces the note with that service's description, and still clears that visit's own price. The public website does not change.

## Steps

- [ ] Turn the Services sample into a table with the existing summary in the column after the name.
- [ ] Give each sample visit a note, and show it after the service on the bookings list and in the visit dialog.
- [ ] Let the office edit that note. On a service change, replace the note with the new service's summary and keep clearing the visit's own price.
- [ ] Include the note in search, and sort the Note heading with the other headings.

## Done when

- [ ] Services lists Name, Summary, Plumbing or Heating, and Starting price. Drain Cleaning's summary is still "Clear stubborn clogs and get sinks, tubs, and main lines flowing again."
- [ ] Elena Ruiz's row shows "Tank is leaking at the base." The other visits show their service summary.
- [ ] Changing Elena from Water Heater Repair to Furnace & Heating Repair shows that service, $189, and "Get heat back on, check the system, and tell you what it will take." Recent activity still says Service changed.
- [ ] A refresh restores the sample notes. The public homepage is unchanged. Nothing is written to Supabase.
