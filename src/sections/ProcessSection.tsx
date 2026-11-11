import { business } from "../config/business";

export function ProcessSection(): JSX.Element {
  return (
    <section className="bg-white px-4 pt-20 pb-12 sm:px-8 lg:px-16">
      <h2 className="[font-family:'Gabarito',Helvetica] text-3xl font-bold leading-tight tracking-[-0.02em] text-[#142033] sm:text-4xl">
        What happens after you call
      </h2>
      <ol className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
        {business.process.map((step, index) => (
          <li key={step.title}>
            <p className="mb-2 [font-family:'Geist',Helvetica] text-sm font-medium leading-6 text-[#2a7a78]">
              Step {index + 1}
            </p>
            <h3 className="[font-family:'Gabarito',Helvetica] text-xl font-bold leading-snug text-[#142033]">
              {step.title}
            </h3>
            <p className="mt-2 [font-family:'Geist',Helvetica] text-base leading-7 text-[#3d4a5c]">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
