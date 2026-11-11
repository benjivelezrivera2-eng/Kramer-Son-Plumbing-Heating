# 25 — Job photos on the public page

Issue: [#57](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/57)
Branch: `job-photos`

## Outcome

The public page keeps every current sentence and the Home, Services, About, and Contact order. Photography does the trust work the reference site does with a fixture photo, service photos, and a crew photo. The hero is the one borrowed move: the job photo fills the first screen, the hand stays on the right, and a navy gradient carries the existing words on the left. This site does not take that site’s floating stats, rounded white cards, checklists, guarantees, or wording.

## Files

- `public/photos/hero-faucet.jpg`
- `public/photos/drain-cable.jpg`
- `public/photos/leak-pipe.jpg`
- `public/photos/furnace.jpg`
- `public/photos/crew-van.jpg`
- `src/sections/HeroSection.tsx`
- `src/sections/ServicesSection.tsx`
- `src/sections/ReasonsSection.tsx`
- `src/pages/ServiceDetailPage.tsx`

Do not edit `business.ts`, `SiteHeader.tsx`, or the office.

## Steps

1. Generate five documentary frames. No logos, no readable labels, no watermarks. Ordinary work, natural light, slight grain.
   - Hero: a gloved hand on a bathroom faucet supply line.
   - Drain: a drain cable under a kitchen sink.
   - Leak: a wet copper joint and a flashlight.
   - Furnace: an open residential furnace, technician from the side, blank meter.
   - Crew: two people in plain navy jackets beside a plain white van, high-plains light.
2. Hero is one frame, not type stacked on a photo. `/photos/hero-faucet.jpg` fills the section, `object-[78%_center]`, so the glove stays on the right. A left-to-right gradient of `#142033` sits behind the existing headline, body, and “Same-day windows when we can”. Those words stay. On the dark gradient the call button is gold and Book a visit is a white outline. Alt: “Gloved hand turning a bathroom faucet supply shutoff.”
3. In `ServicesSection`, the three lead links gain an image above the title: `h-52 w-full object-cover sm:h-64`, square corners, no border, no gray fill. Alt text names the job, not a slogan. The list of five stays type only. The commercial band stays as it is.
4. In `ReasonsSection`, from `lg` up the intro is two columns: the existing heading and Sterling sentence on the left, the crew photo on the right, `min-h-[22rem] object-cover`. “Why homeowners call us” and the four reasons stay full width under that row. Alt: “Two Kramer techs beside the shop van.”
5. `ServiceDetailPage` shows the matching photo under the title when the slug is drain-cleaning, leak-detection, or furnace-and-heating-repair. Same alt text. Other services stay text only.

## Verify

- Homepage still reads the current hero, service, about, process, area, FAQ, book, and contact sentences.
- View source of the images is `/photos/…`, not `images.pexels.com`.
- Drain Cleaning still opens `/services/drain-cleaning`, and that page shows the drain photo.
- No “4.9”, “200+ reviews”, “60-Min”, or “1,000+ Jobs” anywhere in the new markup.
