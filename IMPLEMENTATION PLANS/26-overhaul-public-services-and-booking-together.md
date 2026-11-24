# Polish public services, booking, and service area

Local plan 26. GitHub issue 59: https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/59

Branch: `services-booking-overhaul`

The repo has no milestone named Demo ready for Monday calls, so this issue is not on it. Benji creates that milestone. This plan does not.

## Status on this branch

Done so far: shared on-site booking dialog; category tiles (3+2) with unique photos; Learn more opens the dialog; hero/nav Book CTAs; Contact and Book merged into one Get us out block; public em dashes cleaned.

Service area interactive map is on this branch (Leaflet pan/zoom in a framed panel; Carto light tiles so the site colors stay in charge). Optional later: richer Learn more copy so it does not feel like the same signs / on site / window template on every category.

## Outcome

The public site treats services and booking as one path. A homeowner can start from a problem or a service category, book a morning or afternoon window on the same site, and see a same-session confirmation. Hero, services, and Contact all open that shared flow. Call stays clear for emergencies. Service area reads as a full section: towns on one side, an on-brand map panel on the other, so the layout owns the map (not a raw Google embed owning the page). Navy `#142033`, teal `#2a7a78`, gold `#c9a04a`, Gabarito, and Geist stay.

## Recommendations folded in

### Bookings
1. One booking entry from hero, services, and Contact; known service stays selected.
2. Stay on-site (dialog). No Calendly new-tab handoff UI.
3. Lead with the problem when no service SKU is chosen yet.
4. Call vs book stay distinct; no AI-sounding em dash CTAs like “Call now — can’t wait.”
5. Confirmation in the same session: what, when, what happens next.

### Services
1. Fewer categories: Drains, Leaks & pipes, Water heaters, Heat / furnace, Toilets & fixtures. Sub-jobs live inside.
2. Service entry starts booking; Learn more opens the same dialog (info step). Benji may want that step to read more like a real service explanation later.
3. One primary action label: Book this visit.
4. Desktop grid: three on top, two centered under; unique category photos.

### Site-wide
1. Hero Call (gold) and Book (solid white) both feel intentional.
2. Book a visit in the header (and mobile menu).
3. One Get us out / Book a visit block at the bottom (dialog + form + Call the shop).

### Service area
1. Two-column layout: towns left, interactive map panel right.
2. Sterling called out as home base; other towns as a tight set, not four tall samey paragraphs.
3. Map is interactive (pan / zoom). Framed panel matches navy / soft gray / gold. Light basemap so Google-style chrome does not take over the section.
4. Page owns the map; the map does not own the page.

## Files

- `src/components/BookingDialog.tsx` — shared dialog (problem, learn, form, confirm)
- `src/sections/ServicesSection.tsx` — category tiles
- `src/sections/HeroSection.tsx` — dual CTAs
- `src/sections/ContactSection.tsx` — Get us out block
- `src/sections/AreasSection.tsx` — towns + map panel (next)
- `src/sections/AboutSection.tsx` — hosts AreasSection
- `src/components/SiteHeader.tsx` — Book in nav
- `src/pages/HomePage.tsx` — section order
- `src/pages/ServiceDetailPage.tsx` — category / job pages
- `src/config/business.ts` — categories, areas, copy
- `public/photos/category-*.jpg` — category images
- Map asset under `public/` when the static/styled panel lands

Do not restyle the office/admin screens in this issue. Do not invent a new palette or typeface.

## Steps

1. [x] Categories and tiles (3+2, unique photos, Book this visit + Learn more).
2. [x] Shared on-site booking dialog; wire hero, services, header, footer, contact, `/book`.
3. [x] Problem-first entry when no service is known.
4. [x] Same-session confirmation.
5. [x] Hero CTAs and header Book.
6. [x] Merge Contact and Book into Get us out; remove standalone Book section.
7. [x] Rebuild Service area: towns + interactive on-brand map panel (pan / zoom).
8. [ ] Optional: richer Learn more body copy per category if Benji wants it after the map lands.

## Done when

- From the homepage, a homeowner goes from problem or service to a booked visit window without leaving the site for Calendly.
- Hero, services, header Book, and Contact open the same flow; a known service stays selected.
- Services are grouped into categories in a clean 3+2 grid with unique photos.
- Header/nav and Get us out match the single path.
- Service area is a two-column towns + interactive map section that matches navy/gold and does not look like a raw Google dump.
- Navy/gold trades look unchanged.

## Out

Office/admin booking CRM screens. Payments. Live Google Maps API billing setup beyond a demo embed/static asset. SEO / Search Console (issue 53). Job photos (issue 57). Domain install.
