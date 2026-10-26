import {
  Bath,
  Briefcase,
  Droplets,
  Flame,
  ScanLine,
  Settings,
  Wrench,
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useServiceRequest } from "../../../../components/ServiceRequestModal";

type PlumbingService = {
  title: string;
  description: string;
  icon: React.ElementType;
};

const plumbingServices: PlumbingService[] = [
  {
    title: "Drain Cleaning",
    description:
      "Clearing stubborn clogs and restoring smooth flow to your sinks & drains.",
    icon: Droplets,
  },
  {
    title: "Sewer Line Repair",
    description:
      "Trenchless and traditional repairs for broken or root-damaged sewer mains.",
    icon: Wrench,
  },
  {
    title: "Water Heater Repair",
    description:
      "Expert diagnostics and fast fixes for traditional or tankless water systems.",
    icon: Flame,
  },
  {
    title: "Water Heater Installation",
    description:
      "Energy-efficient replacement systems fitted perfectly to your household needs.",
    icon: Settings,
  },
  {
    title: "Leak Detection",
    description:
      "Advanced acoustic and thermal technology to pinpoint hidden slab leaks.",
    icon: ScanLine,
  },
  {
    title: "Pipe & Water Line Repair",
    description:
      "Leaky pipe repairs, copper repiping, and main water line updates.",
    icon: Wrench,
  },
  {
    title: "Toilet & Fixture Repair",
    description:
      "Repairing running toilets, installing modern faucets, sinks, and showers.",
    icon: Bath,
  },
  {
    title: "Furnace & Heating Repair",
    description:
      "Reliable heating diagnostics, tune-ups, and repairs to keep your home warm.",
    icon: Flame,
  },
];

export const PlumbingServicesSection = (): JSX.Element => {
  const { openModal } = useServiceRequest();

  return (
    <section
      id="services"
      className="flex w-full flex-col gap-12 bg-white px-6 py-16 sm:px-10 lg:px-16 lg:py-24"
    >
      <header className="flex w-full flex-col items-start gap-3">
        <p className="[font-family:'Geist',Helvetica] text-sm font-bold leading-normal text-[#1f7777]">
          COMPREHENSIVE OFFERINGS
        </p>
        <h2 className="[font-family:'Gabarito',Helvetica] text-[26px] font-extrabold leading-normal tracking-[0] text-[#1b2a4a] sm:text-[38px]">
          Our Plumbing &amp; Heating Services
        </h2>
      </header>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plumbingServices.map((service) => {
          const Icon = service.icon;
          return (
            <Card
              key={service.title}
              className="rounded-xl border-slate-200 bg-slate-50 shadow-none"
            >
              <CardContent className="flex h-full flex-col items-start gap-4 p-6">
                <Icon className="h-10 w-10 text-[#2a8b8b]" />
                <div className="flex w-full flex-col items-start gap-2">
                  <h3 className="[font-family:'Gabarito',Helvetica] text-lg font-bold leading-normal tracking-[0] text-[#1b2a4a]">
                    {service.title}
                  </h3>
                  <p className="[font-family:'Geist',Helvetica] text-sm font-normal leading-[21px] tracking-[0] text-slate-800">
                    {service.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <aside className="flex w-full flex-col items-stretch justify-between gap-6 rounded-xl bg-[#1b2a4a] p-6 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <Briefcase className="h-11 w-11 shrink-0 text-[#d4a843]" />
          <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
            <h3 className="[font-family:'Gabarito',Helvetica] text-xl font-bold leading-normal tracking-[0] text-white">
              Need Commercial Plumbing Services?
            </h3>
            <p className="[font-family:'Geist',Helvetica] text-sm font-normal leading-normal tracking-[0] text-slate-50 opacity-90">
              We support Sterling business owners with responsive commercial
              diagnostics, backflow testing, and heavy-duty grease trap line
              maintenance.
            </p>
          </div>
        </div>
        <Button
          type="button"
          onClick={openModal}
          className="h-11 shrink-0 rounded-md bg-[#d4a843] px-5 py-2.5 [font-family:'Geist',Helvetica] text-sm font-bold leading-normal tracking-[0] text-[#1b2a4a] hover:bg-[#d4a843] hover:text-[#1b2a4a]"
        >
          Commercial Solutions
        </Button>
      </aside>
    </section>
  );
};
