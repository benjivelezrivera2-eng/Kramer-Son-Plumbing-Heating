import { Clock, MapPin, ShieldCheck } from "lucide-react";
import { business } from "../config/business";

const items = [
  {
    icon: MapPin,
    label: "Service area",
    value: business.proposalNote,
  },
  {
    icon: Clock,
    label: "Hours",
    value: business.hours,
  },
  {
    icon: ShieldCheck,
    label: "Pricing",
    value: "Written price before work starts",
  },
] as const;

export function TrustStrip(): JSX.Element {
  return (
    <section
      aria-label="Why homeowners call"
      className="border-y border-slate-200 bg-white px-4 py-6 sm:px-8 lg:px-16"
    >
      <ul className="grid gap-4 sm:grid-cols-3 sm:gap-6">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-3">
            <item.icon
              className="mt-0.5 h-5 w-5 shrink-0 text-[#2a7a78]"
              aria-hidden="true"
            />
            <div>
              <p className="[font-family:'Geist',Helvetica] text-xs font-semibold uppercase tracking-wide text-slate-500">
                {item.label}
              </p>
              <p className="mt-1 [font-family:'Geist',Helvetica] text-sm leading-5 text-[#142033]">
                {item.value}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
