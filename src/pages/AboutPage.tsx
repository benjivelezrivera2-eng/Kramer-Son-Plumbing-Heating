import { CtaBand } from "../components/CtaBand";
import { business } from "../config/business";
import { usePageTitle } from "../lib/usePageTitle";
import { AreasSection } from "../sections/AreasSection";
import { FaqSection } from "../sections/FaqSection";
import { ProcessSection } from "../sections/ProcessSection";
import { ReasonsSection } from "../sections/ReasonsSection";

export function AboutPage(): JSX.Element {
  usePageTitle("About");

  return (
    <>
      <section className="bg-white px-4 py-12 sm:px-8 lg:px-16">
        <h1 className="[font-family:'Gabarito',Helvetica] text-[34px] font-extrabold text-[#142033] sm:text-[44px]">
          A local {business.niche.toLowerCase()} shop
        </h1>
        <p className="mt-3 max-w-2xl [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700">
          {business.name} handles plumbing and heating for homes in{" "}
          {business.city} and nearby towns. Call for the jobs that cannot wait,
          or send a request and we will get you on the board.
        </p>
      </section>
      <ReasonsSection />
      <ProcessSection />
      <AreasSection />
      <FaqSection />
      <CtaBand />
    </>
  );
}
