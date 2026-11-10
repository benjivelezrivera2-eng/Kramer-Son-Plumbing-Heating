# Put the shop phone in the header and edit the public page

Local plan 23. GitHub issue 54: https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/54

The repo has no milestone named Demo ready for Monday calls, so this issue is not on it. Benji creates that milestone. This plan does not.

No code until Benji says yes.

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

1. **Header.** Menu is Home, Services, About, Contact, in the desktop bar and in the phone menu. Remove both Book a visit controls. Put the shop phone on the right, as a `tel` link, visible at every width. The menu button stays on small screens.

2. **Hero.** Set the headline to "No heat, a leak, or a drain that won't clear." Set the body to "Same-day windows out of Sterling when the schedule allows. Call if it can't wait." Keep Call as the primary button and Book a visit as the secondary button. Leave the hero photo. The trust strip under the hero keeps the four towns, the hours, and the price-before-work line. That strip is the only homepage place for the town list.

3. **Service cards.** Each card links to `/services/<slug>`. It does not open the booking dialog. The card still shows the icon, the title, the short description, and "Book drain cleaning" (the existing job label). The link is the whole card.

4. **Service page.** Replace the one-sentence description with the symptom copy below. Then offer Book for that job, which opens the same dialog, and the shop phone. Drop the extra "Request service" link on this page. The contact form remains the long form on the homepage.

   - Drain Cleaning. A sink, tub, or main line is backing up. The visit starts by finding whether the stoppage is one fixture, a branch, or the main. You hear the price before the machine runs.
   - Sewer Line Repair. Wastewater is showing up where it should not. The visit finds the break first, then says whether it is a spot repair or a longer section, before anyone digs.
   - Water Heater Repair. The house is short on hot water, or the heater is leaking. The visit looks at the tank or the tankless unit and says what can be fixed that day.
   - Water Heater Installation. The tank has failed, or the house needs a replacement. The replacement is sized to the house, and hot water is back the same day when the unit is on the truck.
   - Leak Detection. A bill jumped, or water is showing up in a wall or floor. The visit traces the leak before it spreads.
   - Pipe & Water Line Repair. A line is leaking or it has burst. The visit stops the water, replaces the bad section, and pressure-tests before leaving.
   - Toilet & Fixture Repair. A toilet keeps running, or a faucet will not stop dripping. The visit repairs it, or swaps the fixture, and leaves the area dry.
   - Furnace & Heating Repair. The heat is out. The visit checks the thermostat, filter, ignition, and flue before anyone talks about a new furnace.

   The homepage says "price before the work starts" only in the reasons block. A service page may say it again for that job.

5. **About.** Intro: "Kramer & Son is a Sterling shop. The tech who takes the visit does the work and cleans up before leaving." Keep the four reason titles: Local dispatch, Upfront pricing, Stocked trucks, Clean job sites. Keep each description to one sentence. Those sentences do not list the four towns and do not say to call if it cannot wait. Upfront pricing is the only homepage statement of a price before the work starts.

6. **Service area.** Sterling: "Home base. Same-day when the schedule allows." Fort Morgan, Brush, and Greeley: "On the regular route." Do not invent a drive time.

7. **Footer and contact.** Remove Book a visit from the footer page list. Rename "Request service" to "Book a visit" and keep it pointed at `/#contact`. Change the contact heading from "Request a visit" to "Book a visit." Leave the form and the "Call the shop" sidebar.

8. **Remove the repeated ending.** Take `CtaBand` off `HomePage`. The contact section is the last block before the footer. Delete `CtaBand.tsx` if no other page imports it.

9. **FAQ.** Keep these six: a leaking water heater, how drain cleaning is priced, emergency calls, no heat, a sewer repair without opening the whole yard, and who shows up. Remove tankless water heaters, how soon a Sterling visit can happen, whether the shop comes to Fort Morgan, Brush, and Greeley, and the separate "price before the work starts" question.

10. **Reviews.** Remove `ReviewsSection` from `HomePage`. Leave the component and the sample quotes in config so a later change can put real reviews back. Do not publish the line "Examples for this demo site."

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

A new palette, a new typeface, and a new hero photo. Replacing `(970) 555-0142`. Writing real reviews. Office screens. Rewriting the three articles. Search Console, the sitemap, and pre-rendering, which stay on issue 53. Code, until Benji says yes.
