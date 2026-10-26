import { MapPin } from "lucide-react";
import { business } from "../config/business";

export function AreasSection(): JSX.Element {
  return (
    <section className="bg-[#f4f6f8] px-4 py-16 sm:px-8 lg:px-16 lg:py-20">
      <h2 className="[font-family:'Gabarito',Helvetica] text-[28px] font-extrabold text-[#142033] sm:text-[36px]">
        Service area
      </h2>
      <p className="mt-3 max-w-xl [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-700">
        We dispatch from {business.city} and cover the towns around it.
      </p>
      <ul className="mt-8 flex max-w-md flex-col gap-3">
        {business.areas.map((area) => (
          <li
            key={area.name}
            className="flex items-center justify-between gap-4 border border-slate-200 bg-white px-4 py-3"
          >
            <span className="inline-flex items-center gap-2 [font-family:'Gabarito',Helvetica] font-bold text-[#142033]">
              <MapPin className="h-4 w-4 text-[#2a7a78]" aria-hidden="true" />
              {area.name}
            </span>
            <span className="[font-family:'Geist',Helvetica] text-xs text-slate-500">
              {area.note}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
