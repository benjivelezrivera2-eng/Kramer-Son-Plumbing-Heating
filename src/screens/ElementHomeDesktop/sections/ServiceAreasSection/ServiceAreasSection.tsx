import { MapPin } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

const serviceAreas = [
  {
    name: "Sterling",
    label: "PRIMARY BASE",
    labelClassName: "text-[#1f7777]",
  },
  {
    name: "Fort Morgan",
    label: "PROPOSED SERVICE AREA",
    labelClassName: "text-slate-500",
  },
  {
    name: "Brush",
    label: "PROPOSED SERVICE AREA",
    labelClassName: "text-slate-500",
  },
  {
    name: "Greeley",
    label: "PROPOSED SERVICE AREA",
    labelClassName: "text-slate-500",
  },
];

export const ServiceAreasSection = (): JSX.Element => {
  return (
    <section
      id="service-areas"
      className="flex w-full flex-col items-start gap-12 self-stretch bg-slate-50 px-4 py-16 sm:px-8 lg:px-16 lg:py-24"
    >
      <header className="flex w-full flex-col items-start gap-3">
        <p className="[font-family:'Geist',Helvetica] text-sm font-bold leading-normal text-[#1f7777]">
          LOCAL SERVICE ZONES
        </p>
        <h2 className="[font-family:'Gabarito',Helvetica] text-[26px] font-extrabold leading-tight tracking-[0] text-[#1b2a4a] sm:text-[38px]">
          Serving Sterling &amp; Surrounding Areas
        </h2>
      </header>
      <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-12">
        <div className="flex w-full flex-col items-start gap-4 lg:max-w-[400px]">
          <p className="[font-family:'Geist',Helvetica] text-base font-normal leading-[25.6px] tracking-[0] text-slate-800">
            Located conveniently in Sterling, we dispatch fully stocked
            plumbing trucks to support residential homeowners quickly throughout
            the region.
          </p>
          <ul className="flex w-full flex-col items-start gap-3">
            {serviceAreas.map((area) => (
              <li key={area.name} className="w-full">
                <Card className="w-full rounded-lg border-slate-200 bg-white">
                  <CardContent className="flex items-center justify-between gap-4 p-4">
                    <div className="inline-flex min-w-0 items-center gap-3">
                      <MapPin className="h-4 w-4 shrink-0 text-[#2a8b8b]" />
                      <span className="[font-family:'Gabarito',Helvetica] text-base font-bold leading-normal tracking-[0] text-[#1b2a4a]">
                        {area.name}
                      </span>
                    </div>
                    <span
                      className={`shrink-0 text-right [font-family:'Geist',Helvetica] text-xs font-semibold leading-normal tracking-[0] ${area.labelClassName}`}
                    >
                      {area.label}
                    </span>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
        <p className="w-full flex-1 [font-family:'Geist',Helvetica] text-base font-normal leading-[25.6px] tracking-[0] text-slate-800">
          Serving Sterling, Fort Morgan, Brush, and Greeley.
        </p>
      </div>
    </section>
  );
};
