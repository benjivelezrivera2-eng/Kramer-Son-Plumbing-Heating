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
import { useOpenBooking } from "../components/BookingDialog";
import { business } from "../config/business";
import { bookJobLabel } from "../lib/bookLabel";

const serviceIcons: Record<string, typeof Droplets> = {
  "Drain Cleaning": Droplets,
  "Sewer Line Repair": Wrench,
  "Water Heater Repair": Flame,
  "Water Heater Installation": Settings,
  "Leak Detection": ScanLine,
  "Pipe & Water Line Repair": Wrench,
  "Toilet & Fixture Repair": Bath,
  "Furnace & Heating Repair": Flame,
  "AC Repair": Flame,
  "Emergency / after-hours": Flame,
};

type Card = { title: string; description: string };

type ServicesSectionProps = {
  limit?: number;
  showCommercial?: boolean;
};

export function ServicesSection({
  limit,
  showCommercial = true,
}: ServicesSectionProps): JSX.Element {
  const openBooking = useOpenBooking();
  const items: Card[] = business.services;
  const shown = limit ? items.slice(0, limit) : items;

  return (
    <section
      id={limit ? undefined : "services"}
      className="scroll-mt-24 flex w-full flex-col gap-10 bg-white px-4 py-16 sm:px-8 lg:px-16 lg:py-20"
    >
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="[font-family:'Gabarito',Helvetica] text-[28px] font-extrabold text-[#142033] sm:text-[36px]">
            What we fix
          </h2>
          <p className="mt-2 max-w-xl [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
            The common calls. Click a card to book that job. No account needed.
          </p>
        </div>
        {limit ? (
          <Link
            to="/#services"
            className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78] hover:underline"
          >
            See all services
          </Link>
        ) : null}
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((service) => {
          const Icon = serviceIcons[service.title] ?? Wrench;
          return (
            <button
              key={service.title}
              type="button"
              onClick={() => openBooking(service.title)}
              className="flex h-full flex-col gap-3 border border-slate-200 bg-[#f4f6f8] p-5 text-left hover:border-[#2a7a78]"
            >
              <Icon className="h-8 w-8 text-[#2a7a78]" />
              <h3 className="[font-family:'Gabarito',Helvetica] text-lg font-bold text-[#142033]">
                {service.title}
              </h3>
              <p className="[font-family:'Geist',Helvetica] text-sm leading-6 text-slate-700">
                {service.description}
              </p>
              <span className="mt-auto [font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78]">
                {bookJobLabel(service.title)}
              </span>
            </button>
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
            to="/#contact"
            className="inline-flex h-11 shrink-0 items-center rounded-md bg-[#c9a04a] px-5 text-sm font-semibold text-[#142033] hover:bg-[#b8903f]"
          >
            Ask about commercial
          </Link>
        </aside>
      )}
    </section>
  );
}
