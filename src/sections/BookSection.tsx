import { business } from "../config/business";

export function BookSection(): JSX.Element {
  return (
    <section
      id="book"
      className="scroll-mt-24 mx-auto w-full max-w-xl px-4 py-12 sm:px-8 lg:py-16"
    >
      <h2 className="[font-family:'Gabarito',Helvetica] text-[34px] font-extrabold text-[#142033] sm:text-[44px]">
        Book a visit
      </h2>
      <p className="mt-3 [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700">
        Choose a morning or afternoon window. You pick the time on the calendar;
        no shop login needed.
      </p>
      <a
        href={business.calendlyUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-[#c9a04a] px-6 text-sm font-semibold text-[#142033] hover:bg-[#b8903f]"
      >
        Open the booking calendar
      </a>
      <p className="mt-4 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-500">
        Opens Calendly in a new tab. That is the live booking tool for this demo.
      </p>
    </section>
  );
}
