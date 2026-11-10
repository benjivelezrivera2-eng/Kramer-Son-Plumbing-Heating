import { Link, useParams } from "react-router-dom";
import { CallButton } from "../components/CallButton";
import { PageHead } from "../components/PageHead";
import { useOpenBooking } from "../components/BookingDialog";
import { business } from "../config/business";
import { bookJobLabel } from "../lib/bookLabel";
import { slugify } from "../lib/shop";
import { primaryButtonClassName, secondaryButtonClassName } from "../lib/ui";

export function ServiceDetailPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const openBooking = useOpenBooking();
  const service = business.services.find((item) => slugify(item.title) === slug);

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
      <PageHead path={`/services/${slug}`} />
      <h1 className="[font-family:'Gabarito',Helvetica] text-[34px] font-extrabold text-[#142033] sm:text-[44px]">
        {service.title}
      </h1>
      <p className="mt-4 [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700">
        {service.description}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => openBooking(service.title)}
          className={primaryButtonClassName}
        >
          {bookJobLabel(service.title)}
        </button>
        <Link to="/#contact" className={secondaryButtonClassName}>
          Request service
        </Link>
        <CallButton className={secondaryButtonClassName}>
          Call {business.phoneDisplay}
        </CallButton>
      </div>
    </section>
  );
}
