import { business } from "../config/business";

const items = [
  `${business.yearsServing} years serving Sterling`,
  `Licensed and insured, CO #${business.license}`,
  `${business.rating} rating · ${business.reviewCount} reviews`,
] as const;

export function ProofRow(): JSX.Element {
  return (
    <section
      aria-label="Shop proof"
      className="border-b border-[#142033]/10 bg-white px-4 py-6 sm:px-8 lg:px-16"
    >
      <ul className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6">
        {items.map((item) => (
          <li
            key={item}
            className="[font-family:'Geist',Helvetica] text-sm font-semibold leading-6 text-[#142033] sm:text-base"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
