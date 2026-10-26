import { business } from "../config/business";

export function ProcessSection(): JSX.Element {
  return (
    <section className="bg-white px-4 py-16 sm:px-8 lg:px-16 lg:py-20">
      <h2 className="[font-family:'Gabarito',Helvetica] text-[28px] font-extrabold text-[#142033] sm:text-[36px]">
        How a visit works
      </h2>
      <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {business.process.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-3 border-t-2 border-[#c9a04a] pt-5">
            <span className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78]">
              Step {index + 1}
            </span>
            <h3 className="[font-family:'Gabarito',Helvetica] text-xl font-bold text-[#142033]">
              {step.title}
            </h3>
            <p className="[font-family:'Geist',Helvetica] text-sm leading-6 text-slate-700">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
