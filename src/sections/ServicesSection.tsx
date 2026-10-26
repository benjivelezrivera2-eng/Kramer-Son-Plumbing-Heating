import {
  Bath,
  Briefcase,
  Droplets,
  Flame,
  ScanLine,
  Settings,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "../config/business";

const serviceIcons = {
  "Drain Cleaning": Droplets,
  "Sewer Line Repair": Wrench,
  "Water Heater Repair": Flame,
  "Water Heater Installation": Settings,
  "Leak Detection": ScanLine,
  "Pipe & Water Line Repair": Wrench,
  "Toilet & Fixture Repair": Bath,
  "Furnace & Heating Repair": Flame,
} as const;

type ServicesSectionProps = {
  limit?: number;
  showCommercial?: boolean;
};

export function ServicesSection({
  limit,
  showCommercial = true,
}: ServicesSectionProps): JSX.Element {
  const items = limit ? business.services.slice(0, limit) : business.services;

  return (
    <section className="flex w-full flex-col gap-10 bg-white px-4 py-16 sm:px-8 lg:px-16 lg:py-20">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="[font-family:'Gabarito',Helvetica] text-[28px] font-extrabold text-[#142033] sm:text-[36px]">
            {business.niche} services
          </h2>
          <p className="mt-2 max-w-xl [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
            The common calls. If it is plumbing or heat, we will tell you what
            it takes.
          </p>
        </div>
        {limit ? (
          <Link
            to="/services"
            className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78] hover:underline"
          >
            See all services
          </Link>
        ) : null}
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((service) => {
          const Icon = serviceIcons[service.title];
          return (
            <article
              key={service.title}
              className="flex flex-col gap-3 border border-slate-200 bg-[#f4f6f8] p-5"
            >
              {Icon ? <Icon className="h-8 w-8 text-[#2a7a78]" /> : null}
              <h3 className="[font-family:'Gabarito',Helvetica] text-lg font-bold text-[#142033]">
                {service.title}
              </h3>
              <p className="[font-family:'Geist',Helvetica] text-sm leading-6 text-slate-700">
                {service.description}
              </p>
            </article>
          );
        })}
      </div>

      {showCommercial && (
        <aside className="flex flex-col items-start justify-between gap-5 bg-[#142033] p-6 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <Briefcase className="mt-0.5 h-8 w-8 shrink-0 text-[#c9a04a]" />
            <div>
              <h3 className="[font-family:'Gabarito',Helvetica] text-xl font-bold text-white">
                {business.commercial.title}
              </h3>
              <p className="mt-1 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-300">
                {business.commercial.body}
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex h-11 shrink-0 items-center rounded-md bg-[#c9a04a] px-5 text-sm font-semibold text-[#142033] hover:bg-[#b8903f]"
          >
            Ask about commercial
          </Link>
        </aside>
      )}
    </section>
  );
}
