import { business } from "../config/business";

const items = [
  {
    label: "We come to",
    value: business.proposalNote,
  },
  {
    label: "When we’re out",
    value: business.hours,
  },
] as const;

export function TrustStrip(): JSX.Element {
  return (
    <section
      aria-label="Why homeowners call"
      className="bg-[#142033] px-4 py-8 sm:px-8 lg:px-16"
    >
      <ul className="grid gap-10 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.label}>
            <p className="[font-family:'Gabarito',Helvetica] text-xl font-bold leading-snug text-[#e4ebf2]">
              {item.value}
            </p>
            <p className="mt-1 [font-family:'Geist',Helvetica] text-sm font-medium leading-6 text-[#c9a04a]">
              {item.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
