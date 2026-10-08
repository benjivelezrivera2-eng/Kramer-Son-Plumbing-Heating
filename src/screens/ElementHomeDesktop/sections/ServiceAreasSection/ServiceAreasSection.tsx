import { MapPin } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

const serviceAreas = [
  {
    name: "Sterling",
    label: "PRIMARY BASE",
    labelClassName: "text-[#2a8b8b]",
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
  const [selectedArea, setSelectedArea] = useState("Sterling");

  return (
    <section
      id="service-areas"
      className="flex w-full flex-col items-start gap-12 self-stretch bg-slate-50 px-4 py-16 sm:px-8 lg:px-16 lg:py-24"
    >
      <header className="flex w-full flex-col items-start gap-3">
        <p className="[font-family:'Geist',Helvetica] text-sm font-bold leading-normal text-[#2a8b8b]">
          LOCAL SERVICE ZONES
        </p>
        <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="[font-family:'Gabarito',Helvetica] text-[26px] font-extrabold leading-tight tracking-[0] text-[#1b2a4a] sm:text-[38px]">
            Serving Sterling &amp; Surrounding Areas
          </h2>
          <Badge
            variant="outline"
            className="h-auto rounded border-[#2a8b8b] bg-[#2a8b8b15] px-1.5 py-0.5 [font-family:'Geist',Helvetica] text-[9px] font-semibold leading-normal text-[#2a8b8b]"
          >
            PROPOSED • PENDING CONFIRMATION
          </Badge>
        </div>
      </header>
      <div className="flex w-full flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:gap-12">
        <div className="flex w-full flex-col items-start gap-4 lg:max-w-[400px]">
          <p className="[font-family:'Geist',Helvetica] text-base font-normal leading-[25.6px] tracking-[0] text-slate-800">
            Located conveniently in Sterling, we dispatch fully stocked
            plumbing trucks to support residential homeowners quickly throughout
            the region.
          </p>
          <div className="flex w-full flex-col items-start gap-3">
            {serviceAreas.map((area) => {
              const isSelected = selectedArea === area.name;

              return (
                <Card
                  key={area.name}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedArea(area.name)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedArea(area.name);
                    }
                  }}
                  className={`w-full cursor-pointer rounded-lg border-slate-200 bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a8b8b] ${
                    isSelected ? "border-[#2a8b8b] shadow-sm" : ""
                  }`}
                >
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
              );
            })}
          </div>
        </div>
        <div className="flex min-h-[240px] w-full flex-1 flex-col items-start justify-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:min-h-[320px] sm:p-8">
          <h3 className="[font-family:'Gabarito',Helvetica] text-lg font-bold leading-normal tracking-[0] text-[#1b2a4a]">
            Service Area Map
          </h3>
          <ul className="flex w-full flex-col items-start gap-3">
            {["Sterling", "Fort Morgan", "Brush", "Greeley"].map((city) => (
              <li
                key={city}
                className="inline-flex items-center gap-3 [font-family:'Geist',Helvetica] text-sm font-normal leading-normal text-slate-800"
              >
                <MapPin className="h-4 w-4 text-[#2a8b8b]" />
                {city}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
