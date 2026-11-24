import { business } from "../config/business";

export function BookSection(): JSX.Element {
  return (
    <section id="book" className="scroll-mt-24 w-full px-4 pt-20 pb-6 sm:px-8 lg:px-16">
      <h2 className="[font-family:'Gabarito',Helvetica] text-3xl font-bold leading-tight tracking-[-0.02em] text-[#142033] sm:text-4xl">
        Book a visit
      </h2>
      <p className="mt-4 max-w-[65ch] [font-family:'Geist',Helvetica] text-base leading-7 text-[#3d4a5c]">
        Choose a morning or afternoon window. You pick the time on the calendar;
        no shop login needed.
      </p>
      <a
        href={business.calendlyUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-md border border-[#142033] px-6 text-sm font-semibold text-[#142033] [font-family:'Geist',Helvetica] hover:bg-[#142033]/5"
      >
        Open the booking calendar
      </a>
      <p className="mt-3 [font-family:'Geist',Helvetica] text-sm font-medium leading-6 text-[#3d4a5c]">
        Opens Calendly in a new tab. That is the live booking tool for this demo.
      </p>
    </section>
  );
}
