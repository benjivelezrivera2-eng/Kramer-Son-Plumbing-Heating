import { Link, useParams } from "react-router-dom";
import { CallButton } from "../components/CallButton";
import { business } from "../config/business";
import { slugify } from "../lib/shop";
import { primaryButtonClassName, secondaryButtonClassName } from "../lib/ui";
import { usePageTitle } from "../lib/usePageTitle";

const servicePhotos: Record<string, { src: string; alt: string }> = {
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

export function ServiceDetailPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const service = business.services.find((item) => slugify(item.title) === slug);
  usePageTitle(service?.title ?? "Service");

  if (!service) {
    return (
      <section className="mx-auto w-full max-w-xl px-4 py-16">
        <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
          Service not found
        </h1>
        <Link to="/#services" className="mt-4 inline-flex text-sm font-semibold text-[#2a7a78]">
          Back to services
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-8 lg:py-16">
      <h1 className="[font-family:'Gabarito',Helvetica] text-[34px] font-extrabold text-[#142033] sm:text-[44px]">
        {service.title}
      </h1>
      {servicePhotos[service.title] ? (
        <img
          src={servicePhotos[service.title].src}
          alt={servicePhotos[service.title].alt}
          className="mt-6 h-64 w-full object-cover sm:h-80"
        />
      ) : null}
      <p className="mt-4 [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700">
        {service.detail}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to={`/book/${slugify(service.title)}`} className={primaryButtonClassName}>
          {`Book ${service.title.toLowerCase()}`}
        </Link>
        <CallButton className={secondaryButtonClassName}>
          Call {business.phoneDisplay}
        </CallButton>
      </div>
    </section>
  );
}
