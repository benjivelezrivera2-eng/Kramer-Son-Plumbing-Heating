import { CtaBand } from "../components/CtaBand";
import { business } from "../config/business";
import { usePageTitle } from "../lib/usePageTitle";
import { ServicesSection } from "../sections/ServicesSection";

export function ServicesPage(): JSX.Element {
  usePageTitle("Services");

  return (
    <>
      <section className="bg-[#f4f6f8] px-4 py-12 sm:px-8 lg:px-16">
        <h1 className="[font-family:'Gabarito',Helvetica] text-[34px] font-extrabold text-[#142033] sm:text-[44px]">
          {business.niche}
        </h1>
        <p className="mt-3 max-w-2xl [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700">
          Residential and light commercial work. Call if you are not sure which
          service you need — we will point you to the right visit.
        </p>
      </section>
      <ServicesSection />
      <CtaBand />
    </>
  );
}
