import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "../config/business";
import { slugify } from "../lib/shop";

const leadTitles = [
  "Drain Cleaning",
  "Leak Detection",
  "Furnace & Heating Repair",
];

const leadPhotos: Record<string, { src: string; alt: string }> = {
  "Drain Cleaning": {
    src: "/photos/drain-cable.jpg",
    alt: "Gloved hands on a kitchen sink drain under the cabinet.",
  },
  "Leak Detection": {
    src: "/photos/leak-pipe.jpg",
    alt: "A drop of water at a copper pipe joint under a sink.",
  },
  "Furnace & Heating Repair": {
    src: "/photos/furnace.jpg",
    alt: "A technician checking an open furnace with a meter.",
  },
};

type Card = { title: string; description: string; slug: string };

type ServicesSectionProps = {
  limit?: number;
  showCommercial?: boolean;
};

const titleClass =
  "[font-family:'Gabarito',Helvetica] text-xl font-bold leading-snug text-[#142033]";
const bodyClass =
  "[font-family:'Geist',Helvetica] text-base leading-7 text-[#3d4a5c]";
const bookClass =
  "[font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78]";

export function ServicesSection({
  limit,
  showCommercial = true,
}: ServicesSectionProps): JSX.Element {
  const items: Card[] = business.services.map((service) => ({
    ...service,
    slug: slugify(service.title),
  }));
  const shown = limit ? items.slice(0, limit) : items;
  const leads = leadTitles.flatMap((title) => {
    const match = shown.find((item) => item.title === title);
    return match ? [match] : [];
  });
  const rest = shown.filter((item) => !leadTitles.includes(item.title));

  return (
    <section
      id={limit ? undefined : "services"}
      className="scroll-mt-24 w-full bg-white px-4 pt-20 pb-12 sm:px-8 lg:px-16 lg:pt-24"
    >
      <h2 className="[font-family:'Gabarito',Helvetica] text-3xl font-bold leading-tight tracking-[-0.02em] text-[#142033] sm:text-4xl">
        What we fix
      </h2>
      <p className={`mt-4 max-w-[65ch] ${bodyClass}`}>
        The common calls. If it is plumbing or heat, we will tell you what it
        takes.
      </p>
      {limit ? (
        <Link
          to="/#services"
          className="mt-4 inline-flex [font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78] hover:underline"
        >
          See all services
        </Link>
      ) : null}

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {leads.map((service) => (
          <Link key={service.slug} to={`/services/${service.slug}`} className="block">
            <img
              src={leadPhotos[service.title].src}
              alt={leadPhotos[service.title].alt}
              className="mb-4 h-52 w-full object-cover sm:h-64"
            />
            <h3 className={titleClass}>{service.title}</h3>
            <p className={`mt-2 ${bodyClass}`}>{service.description}</p>
            <span className={`mt-4 inline-flex ${bookClass}`}>
              {`Book ${service.title.toLowerCase()}`}
            </span>
          </Link>
        ))}
      </div>

      <ul className="mt-12">
        {rest.map((service) => (
          <li key={service.slug} className="border-t border-[#142033]/15 py-4">
            <Link
              to={`/services/${service.slug}`}
              className="grid grid-cols-1 gap-x-8 sm:grid-cols-[14rem_1fr_auto] sm:items-baseline"
            >
              <h3 className={titleClass}>{service.title}</h3>
              <p className={bodyClass}>{service.description}</p>
              <span className={bookClass}>{`Book ${service.title.toLowerCase()}`}</span>
            </Link>
          </li>
        ))}
      </ul>

      {showCommercial && (
        <aside className="mt-12 flex flex-col items-start justify-between gap-5 bg-[#142033] px-6 py-8 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <Briefcase className="mt-0.5 h-8 w-8 shrink-0 text-[#c9a04a]" aria-hidden="true" />
            <div>
              <h3 className="[font-family:'Gabarito',Helvetica] text-xl font-bold leading-snug text-white">
                {business.commercial.title}
              </h3>
              <p className="mt-2 max-w-[65ch] [font-family:'Geist',Helvetica] text-base leading-7 text-[#e4ebf2]">
                {business.commercial.body}
              </p>
            </div>
          </div>
          <Link
            to="/#contact"
            className="inline-flex h-12 shrink-0 items-center rounded-md bg-[#c9a04a] px-5 text-sm font-semibold text-[#142033] hover:bg-[#b8903f]"
          >
            Ask about commercial
          </Link>
        </aside>
      )}
    </section>
  );
}
