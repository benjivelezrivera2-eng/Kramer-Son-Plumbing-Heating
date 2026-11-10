# Put the shop phone in the header and edit the public page

Local plan 23. GitHub issue 54: https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/54

The repo has no milestone named Demo ready for Monday calls, so this issue is not on it. Benji creates that milestone. This plan does not.

Benji said to finish the list. The steps below are done on the local site.

## Outcome

The public page keeps navy `#142033`, teal `#2a7a78`, gold `#c9a04a`, Gabarito, and Geist. Book a visit leaves the header and the footer page list. The header shows the shop phone from `business.phoneDisplay`. On the homepage, the four towns, the price-before-work line, the visit window, and "call if it can't wait" each appear once. A service card opens that service's page. Booking still works from the hero, the service page, the contact form, and the mobile bar.

The sample phone stays until Benji supplies a real one. The sample reviews come off the homepage until real ones exist. The hero photo stays until a real truck, shop, or job photo exists.

## Files

- `src/components/SiteHeader.tsx` — menu and the right-side control
- `src/components/SiteFooter.tsx` — page list and the contact link
- `src/sections/HeroSection.tsx` — headline and body, from `src/config/business.ts`
- `src/sections/ServicesSection.tsx` — cards link to the service page
- `src/pages/ServiceDetailPage.tsx` — symptom copy, then Book and the phone
- `src/config/business.ts` — hero, services, about reasons, areas, FAQs
- `src/sections/AboutSection.tsx` — intro
- `src/sections/AreasSection.tsx` — notes, if the note is not only the config string
- `src/sections/ContactSection.tsx` — heading
- `src/pages/HomePage.tsx` — drop the reviews block and the bottom band
- `src/components/CtaBand.tsx` — remove it from the homepage; delete the file if nothing else imports it

Do not change `src/components/MobileCtaBar.tsx`, the commercial band, or the articles.

## Steps

1. **Header.** Done in `src/components/SiteHeader.tsx`. Menu is Home, Services, About, Contact, in the desktop bar and in the phone menu. Both booking controls are gone. The shop phone is on the right, as a `tel` link, visible at every width. The menu button stays on small screens. Shop login stays in the footer.

2. **Hero.** Done. Headline: "No heat, a leak, or a drain that won't clear." Body: "Same-day windows out of Sterling when the schedule allows. Call if it can't wait." Call stays primary. Book a visit stays secondary and opens the calendar section. The hero photo is unchanged. The trust strip keeps the four towns and the hours. The price line lives only under Upfront pricing, so the strip does not say it again.

3. **Service cards.** Done. Each card links to `/services/<slug>`. It shows the icon, the title, the short description, and "Book drain cleaning."

4. **Service page.** Done. The page shows the symptom copy below, then Book for that job and the shop phone. Book opens the existing calendar page for that job. This site has no booking dialog. Request service is off this page. The contact form remains on the homepage.

   - Drain Cleaning. A sink, tub, or main line is backing up. The visit starts by finding whether the stoppage is one fixture, a branch, or the main. You hear the price before the machine runs.
   - Sewer Line Repair. Wastewater is showing up where it should not. The visit finds the break first, then says whether it is a spot repair or a longer section, before anyone digs.
   - Water Heater Repair. The house is short on hot water, or the heater is leaking. The visit looks at the tank or the tankless unit and says what can be fixed that day.
   - Water Heater Installation. The tank has failed, or the house needs a replacement. The replacement is sized to the house, and hot water is back the same day when the unit is on the truck.
   - Leak Detection. A bill jumped, or water is showing up in a wall or floor. The visit traces the leak before it spreads.
   - Pipe & Water Line Repair. A line is leaking or it has burst. The visit stops the water, replaces the bad section, and pressure-tests before leaving.
   - Toilet & Fixture Repair. A toilet keeps running, or a faucet will not stop dripping. The visit repairs it, or swaps the fixture, and leaves the area dry.
   - Furnace & Heating Repair. The heat is out. The visit checks the thermostat, filter, ignition, and flue before anyone talks about a new furnace.

   The homepage says "price before the work starts" only in the reasons block. A service page may say it again for that job.

5. **About.** Done. Intro: "Kramer & Son is a Sterling shop. The tech who takes the visit does the work and cleans up before leaving." The four reason titles stay. Upfront pricing is the homepage statement of a price before the work starts.

6. **Service area.** Done. Sterling: "Home base. Same-day when the schedule allows." Fort Morgan, Brush, and Greeley: "On the regular route."

7. **Footer and contact.** Done. Book is off the footer page list. The footer contact link says Book a visit and points at `/#contact`. The contact heading says Book a visit. The form and the Call the shop sidebar stay.

8. **Remove the repeated ending.** Done. `CtaBand` is off the homepage. The contact section is the last block. The calendar section stays just above it so Book a visit and the mobile bar still reach it. `CtaBand.tsx` stays because the about and services pages still import it.

9. **FAQ.** Done. Six questions: a leaking water heater, how drain cleaning is priced, emergency calls, no heat, a sewer repair without opening the whole yard, and who shows up.

10. **Reviews.** Done. `ReviewsSection` is off the homepage. The component and the sample quotes stay in config.

## Done when

- The header is Home, Services, About, Contact, and the shop phone. Book a visit is not in the header or the footer page list.
- The hero uses the headline and body above. Call and Book a visit are still there.
- A service card opens its service page. That page shows the symptom copy, Book for that job, and the phone.
- Booking still opens from the hero, the service page, the contact form, and the mobile bar.
- The homepage states the towns, the price-before-work line, the visit window, and "call if it can't wait" once each.
- The contact heading says Book a visit. The page ends after that section.
- Six FAQs remain. The sample reviews are not on the homepage.
- The colors, the type, the commercial band, the articles, and the mobile bar are unchanged.

## Out

A new palette, a new typeface, and a new hero photo. Replacing `(970) 555-0142`. Writing real reviews. Office screens. Rewriting the three articles. Search Console, the sitemap, and pre-rendering, which stay on issue 53.
