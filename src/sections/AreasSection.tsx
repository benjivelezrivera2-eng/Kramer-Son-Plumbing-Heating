import { business } from "../config/business";

export function AreasSection(): JSX.Element {
  return (
    <section className="bg-white px-4 pt-8 pb-16 sm:px-8 lg:px-16">
      <h2 className="[font-family:'Gabarito',Helvetica] text-3xl font-bold leading-tight tracking-[-0.02em] text-[#142033] sm:text-4xl">
        Service area
      </h2>
      <p className="mt-4 max-w-[65ch] [font-family:'Geist',Helvetica] text-base leading-7 text-[#3d4a5c]">
        We dispatch from {business.city} and cover the towns around it.
      </p>
      <dl className="mt-8 max-w-xl">
        {business.areas.map((area) => (
          <div key={area.name}>
            <dt className="[font-family:'Gabarito',Helvetica] text-xl font-bold leading-snug text-[#142033]">
              {area.name}
            </dt>
            <dd className="mt-1 mb-6 [font-family:'Geist',Helvetica] text-sm font-medium leading-6 text-[#3d4a5c]">
              {area.note}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
