import { business } from "../config/business";

const items = [
  {
    label: "Service area",
    value: business.proposalNote,
  },
  {
    label: "Hours",
    value: business.hours,
  },
] as const;

export function TrustStrip(): JSX.Element {
  return (
    <section
      aria-label="Service area and hours"
      className="bg-[#142033] px-4 py-8 sm:px-8 lg:px-16"
    >
      <ul className="grid gap-10 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.label}>
            <p className="[font-family:'Geist',Helvetica] text-xs font-semibold uppercase tracking-[0.12em] text-[#c9a04a]">
              {item.label}
            </p>
            <p className="mt-2 [font-family:'Gabarito',Helvetica] text-xl font-bold leading-snug text-[#e4ebf2]">
              {item.value}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
