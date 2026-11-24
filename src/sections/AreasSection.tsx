import { ServiceAreaMap } from "../components/ServiceAreaMap";
import { business } from "../config/business";

export function AreasSection(): JSX.Element {
  const home = business.areas.find((area) => area.homeBase);
  const routeTowns = business.areas.filter((area) => !area.homeBase);

  return (
    <section className="bg-[#f4f6f8] px-4 pt-16 pb-16 sm:px-8 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="[font-family:'Gabarito',Helvetica] text-3xl font-bold leading-tight tracking-[-0.02em] text-[#142033] sm:text-4xl">
          Service area
        </h2>
        <p className="mt-4 max-w-[65ch] [font-family:'Geist',Helvetica] text-base leading-7 text-[#3d4a5c]">
          We dispatch from {business.city} and cover the towns around it. Use
          the map to zoom into your area.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <div>
            {home ? (
              <div className="border border-[#142033]/12 bg-white p-5">
                <p className="[font-family:'Geist',Helvetica] text-xs font-semibold uppercase tracking-wide text-[#c9a04a]">
                  Home base
                </p>
                <h3 className="mt-2 [font-family:'Gabarito',Helvetica] text-2xl font-bold text-[#142033]">
                  {home.name}
                </h3>
                <p className="mt-2 [font-family:'Geist',Helvetica] text-sm leading-6 text-[#3d4a5c]">
                  {home.note}
                </p>
              </div>
            ) : null}

            <div className="mt-5 border border-[#142033]/12 bg-white p-5">
              <p className="[font-family:'Geist',Helvetica] text-xs font-semibold uppercase tracking-wide text-[#2a7a78]">
                Regular route
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {routeTowns.map((area) => (
                  <li key={area.name}>
                    <p className="[font-family:'Gabarito',Helvetica] text-lg font-bold text-[#142033]">
                      {area.name}
                    </p>
                    <p className="mt-1 [font-family:'Geist',Helvetica] text-sm leading-6 text-[#3d4a5c]">
                      {area.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ServiceAreaMap />
        </div>
      </div>
    </section>
  );
}
