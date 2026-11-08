# Issue #25 — Convert marketing site to single-page layout

**Issue:** [#25](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/25)  
**Branch:** `booking-crm`

## Outcome
Public marketing content lives on `/` as anchored sections. Old marketing paths redirect to those anchors. Service detail, login, admin, and booking-manage routes stay separate.

## Files
- `src/pages/HomePage.tsx` — compose full-page sections
- `src/sections/AboutSection.tsx`, `ContactSection.tsx`, `BookSection.tsx` — section content
- `src/components/ScrollToHash.tsx` — scroll on hash
- `src/components/SiteHeader.tsx`, `SiteFooter.tsx`, `MobileCtaBar.tsx`, `CtaBand.tsx`
- `src/sections/HeroSection.tsx`, `ServicesSection.tsx`
- `src/app/App.tsx` — redirects for `/services`, `/about`, `/contact`, `/book`
- Keep `ServiceDetailPage` and `/book/:slug` for drill-down booking

## Steps
1. Add About / Contact / Book sections with ids.
2. Expand homepage services to the full grid; wire nav to hashes.
3. Redirect legacy marketing routes to `/#…`.
4. Update internal CTAs to section hashes where they meant “browse/book on the marketing page.”

## Verify
- Nav Services / Book / About / Contact scrolls on one page.
- Header Book a service → `#services`.
- `/services/:slug`, `/login`, `/admin` still work as separate pages.
