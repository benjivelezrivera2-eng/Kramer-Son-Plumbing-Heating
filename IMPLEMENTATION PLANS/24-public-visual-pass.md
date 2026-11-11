# Restyle the public page without changing the words

Local plan 24. GitHub issue 56: https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/56

Branch: `design`. Not `main`.

No code until Benji says yes. No string in `src/config/business.ts` changes. Visible phrases stay, including the hero badge, "Step 1", and the footer labels. This pass moves and restyles them.

The first draft of this file named the problems and stopped. This revision names the classes on the live sections and the rule each change is answering.

## What the page is now

`HomePage` stacks, in order: `HeroSection`, `TrustStrip`, `ServicesSection`, `AboutSection` (intro, then `ReasonsSection`, `ProcessSection`, `AreasSection`), `FaqSection`, `BookSection`, `ContactSection`, then `SiteFooter`.

Shared habits, read from the source:

- Gabarito is `font-extrabold` on the hero (`text-[34px]` / `sm:text-[46px]` / `lg:text-[54px]`) and again on every section heading (`text-[28px]` / `sm:text-[36px]`, and `text-[34px]` / `sm:text-[44px]` on About and Contact). Weight does not mark rank.
- Body is Geist `text-sm` or `text-base` in `text-slate-600` or `text-slate-700`, including on the navy footer (`text-slate-300`, copyright `text-slate-400`).
- Sections repeat `px-4 py-16 sm:px-8 lg:px-16 lg:py-20`, alternating `#f4f6f8` and white. Areas and the FAQ are both `#f4f6f8` with that same padding, so they read as one gray block.
- Services is `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. Each cell is `border border-slate-200 bg-[#f4f6f8] p-5` with a Lucide icon at `h-8 w-8`, a Gabarito title, a Geist paragraph, and a teal Book line.
- Reasons is the same card: `sm:grid-cols-2 xl:grid-cols-4`, `border border-slate-200 bg-white p-6`, icon, title, paragraph.
- Process is `md:grid-cols-3`. Each item is `border-t-2 border-[#c9a04a] pt-5` plus the words "Step 1", "Step 2", "Step 3".
- The hero is a split: copy on the left, a Pexels photo on the right at `rounded-lg`, `lg:h-[460px] lg:w-[520px]`. A `Badge` pill sits above the `h1`.
- Trust strip labels use `text-xs font-semibold uppercase tracking-wide text-slate-500`.
- Footer "Pages" and "Contact" are gold `text-sm font-semibold`. Call now and Book a visit are both `h-11` gold treatments.

## Rules this page is breaking

From the Impeccable craft floor and the persuade-mode notes, applied to these files:

- A split hero with a badge, then a row of equal cards, is the template. Painting it navy does not make it a decision.
- A pill or tiny label above a heading is an eyebrow. The heading has to carry itself. The words stay. They do not sit above the `h1`.
- Same-size cards of icon, heading, and text are the lazy container. Services and Reasons are that container.
- A thick colored edge used as decoration is the stripe tell. Process uses a 2px gold top on every column.
- Gray text on a colored ground is banned. Footer body and copyright are slate on `#142033`.
- One padding value on every section is not a rhythm.

Do not add a purple gradient, glass, glow, or a new typeface. Gabarito stays the display face. Geist stays the reading face.

## Type roles

Use these four roles everywhere below. Do not invent a fifth size.

| Role | Face | Spec |
|---|---|---|
| Display | Gabarito | Hero `h1` only. `text-[2.75rem] sm:text-6xl`, `font-extrabold`, `leading-[1.02]`, `tracking-[-0.03em]`, `max-w-[16ch]`, color `#142033` |
| Section | Gabarito | Every other `h2`. `text-3xl sm:text-4xl`, `font-bold`, `leading-tight`, `tracking-[-0.02em]`, color `#142033`. Not extrabold |
| Title | Gabarito | Service name, reason title, town name, "Call the shop". `text-xl`, `font-bold`, `leading-snug` |
| Body | Geist | `text-base`, `leading-7`, `max-w-[65ch]`. On white or `#f4f6f8`: `#142033` at 80% is too close to the title, so use `#3d4a5c`. On `#142033`: `#e4ebf2`, never `text-slate-300` |
| Meta | Geist | `text-sm`, `leading-6`, `font-medium`. No `uppercase`. No `tracking-wide` |

## Steps

1. **`business.ts`.** No diff.

2. **`HeroSection.tsx`.** Stop the side-by-side. One column, full width, ground `#f4f6f8`, padding `px-4 pt-16 pb-0 sm:px-8 lg:px-16 lg:pt-24`. Order: `h1` (Display), then the current body (Body, `mt-5`), then the current badge string as a Meta line `mt-3` with no `Badge`, no border, no tinted pill. Then the two buttons in a row, `mt-8`, `gap-3`. Call stays the filled control: `h-12 bg-[#142033] text-white`. Book a visit stays outline: `h-12 border-[#142033] text-[#142033]`. The photo moves under the buttons, full bleed, `mt-12 h-64 w-full object-cover sm:h-96 lg:h-[28rem]`, `rounded-none`, no shadow. Alt text stays.

3. **`TrustStrip.tsx`.** Directly under the photo, ground `#142033`, `px-4 py-8 sm:px-8 lg:px-16`. Two facts in one row from `sm` up, `gap-10`. Each value ("Sterling, Fort Morgan, Brush, and Greeley" and the hours) is Title in `#e4ebf2`. Each label is Meta in `#c9a04a`, sentence case, under the value, `mt-1`. Remove the Lucide icons and `uppercase tracking-wide`.

4. **`ServicesSection.tsx`.** Section padding `px-4 pt-20 pb-12 sm:px-8 lg:px-16 lg:pt-24`. Heading is Section, intro is Body, `mt-4`. The eight services leave the four-column card grid. Drain Cleaning, Leak Detection, and Furnace & Heating Repair — the three jobs named by the hero headline — are a `lg:grid-cols-3` row, `gap-8`, no border, no icon, no gray fill. Title, then Body description `mt-2`, then the existing Book line `mt-4` in `#2a7a78` `font-semibold`. The other five services are one list under that row, `mt-12`, each row `grid grid-cols-1 sm:grid-cols-[14rem_1fr_auto] gap-x-8 border-t border-[#142033]/15 py-4`. Name, description, Book line. No icon. The commercial band stays full-bleed `#142033`, but its padding becomes `mt-12 px-6 py-8` and its heading uses Title in white. Its words stay.

5. **`AboutSection.tsx`.** Delete the separate white band (`py-12`). The `h2` and the Sterling sentence move to the top of `ReasonsSection`, so the heading is `mb-10` above the reasons and not its own padded section.

6. **`ReasonsSection.tsx`.** Ground stays `#f4f6f8`. Padding `px-4 py-16 sm:px-8 lg:px-16`. After the moved intro, four reasons in `sm:grid-cols-2`, `gap-x-12 gap-y-8`. No `border`, no background card, no icon. Title, then Body `mt-2`.

7. **`ProcessSection.tsx`.** Ground white. Padding `px-4 pt-20 pb-12 sm:px-8 lg:px-16`. Heading is Section. The three steps stay in `md:grid-cols-3` with `gap-10`, because the order is the point. Remove `border-t-2 border-[#c9a04a]`. "Step 1", "Step 2", and "Step 3" stay, set as Meta in `#2a7a78`, `mb-2`. The step title is Title. The description is Body.

8. **`AreasSection.tsx`.** Ground white, not `#f4f6f8`, so it does not melt into the FAQ. Padding `px-4 pt-8 pb-16 sm:px-8 lg:px-16`. Heading is Section. The dispatch sentence is Body, `mt-4`. The four towns are not boxed rows. One `dl`, `mt-8`, `max-w-xl`. Town name is Title. The note is Meta, `mt-1 mb-6`. Remove the `MapPin` icon and `border border-slate-200 bg-white`.

9. **`FaqSection.tsx`.** This sits between Areas and Book on the homepage, so it is in this pass. Ground `#f4f6f8`. Padding `px-4 py-16 sm:px-8 lg:px-16`. The heading loses `text-center` and uses Section, left aligned. Each question drops its own `border bg-white` card. One accordion, questions separated by `border-b border-[#142033]/15`. Question text is Title at `text-lg`. Answer is Body.

10. **`BookSection.tsx`.** Homepage only, between FAQ and Contact. It currently repeats the Contact heading size inside `max-w-xl`. Padding `px-4 pt-20 pb-6 sm:px-8 lg:px-16`, width the page, not `max-w-xl` on the section. Heading is Section. Helper is Body, `mt-4`. The calendar link is the outline button from the hero, `mt-8`. The Calendly note is Meta, `mt-3`.

11. **`ContactSection.tsx`.** Padding `px-4 pt-8 pb-20 sm:px-8 lg:px-16`. The two columns stay: form `minmax(0,1fr)`, call panel `minmax(0,22rem)`, `gap-16` from `lg` up. Heading is Section. Helper is Body, `mb-8`. The aside loses `border border-slate-200 bg-[#f4f6f8]`. It becomes `bg-[#142033] p-8`. "Call the shop" is Title in white. The helper under it is Meta in `#e4ebf2`. The phone button stays `h-12 bg-[#c9a04a] text-[#142033]`. "Area" and "Hours" are Meta in `#c9a04a`. The values are Body in `#e4ebf2`.

12. **`SiteFooter.tsx`.** Padding `px-4 pt-16 pb-8 sm:px-8 lg:px-16`. The three columns stay. The name is Title in white. The niche line is Meta in `#c9a04a`. The town sentence is Body in `#e4ebf2`, `mt-4`. "Pages" and "Contact" become Title in white, `text-base`, not gold small labels. Links are Meta in `#e4ebf2`, hover white. Call now stays the filled gold `h-12`. Book a visit is not a second button: it is a text link, Meta, `#c9a04a`, `underline-offset-4`, no border. The copyright rule is `mt-16 border-t border-white/15 pt-6`, text Meta in `#e4ebf2`.

13. **`HomePage.tsx`.** Do not reorder the sections. Do not add a wrapper. The rhythm is the padding in the steps above: hero opens, photo and trust strip touch, services starts a new topic with `pt-20`, about's intro joins the reasons, process starts the next topic, areas stays with the about story on white, FAQ is its own gray band, book and contact share one action run (`pb-6` then `pt-8`).

## Done when

- `business.ts` has no diff, and every current sentence is still on the page.
- The hero is one column. The photo is full bleed and not rounded. The badge words are under the headline, not in a pill.
- Services is three open columns plus a list. Reasons have no boxes and no icons.
- Process has no gold top stripe. The step labels are still "Step 1", "Step 2", and "Step 3".
- Footer text on navy is `#e4ebf2`, not slate. Call now is the only filled gold control in the footer.
- No purple, indigo, glass, or glow.

## Out

New copy. A new phone number. A new photograph. A new palette or typeface. The header menu. The mobile bar. Office screens.
