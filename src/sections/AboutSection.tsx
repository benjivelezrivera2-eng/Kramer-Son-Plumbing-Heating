import { business } from "../config/business";
import { AreasSection } from "./AreasSection";
import { ProcessSection } from "./ProcessSection";
import { ReasonsSection } from "./ReasonsSection";

export function AboutSection(): JSX.Element {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="bg-white px-4 py-12 sm:px-8 lg:px-16">
        <h2 className="[font-family:'Gabarito',Helvetica] text-[34px] font-extrabold text-[#142033] sm:text-[44px]">
          A local {business.niche.toLowerCase()} shop
        </h2>
        <p className="mt-3 max-w-2xl [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700">
          {business.fullName} handles plumbing and heating for homes in{" "}
          {business.city} and nearby towns. Call for the jobs that cannot wait,
          or book a visit window.
        </p>
      </div>
      <ReasonsSection />
      <ProcessSection />
      <AreasSection />
    </section>
  );
}
