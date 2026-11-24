import { Link, useParams } from "react-router-dom";
import { useOpenBooking } from "../components/BookingDialog";
import { CallButton } from "../components/CallButton";
import { business } from "../config/business";
import {
  categoryBySlug,
  categoryForService,
  categoryJobs,
  primaryJobTitle,
  serviceBySlug,
} from "../lib/publicServices";
import { slugify } from "../lib/shop";
import { primaryButtonClassName, secondaryButtonClassName } from "../lib/ui";
import { usePageTitle } from "../lib/usePageTitle";

function DecisionHelp({
  signs,
  onSite,
  window,
}: {
  signs: string;
  onSite: string;
  window: string;
}): JSX.Element {
  return (
    <dl className="mt-8 grid gap-5 border-t border-[#142033]/12 pt-8 sm:grid-cols-3">
      <div>
        <dt className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78]">
          Signs you need this
        </dt>
        <dd className="mt-2 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-700">
          {signs}
        </dd>
      </div>
      <div>
        <dt className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78]">
          What we do on site
        </dt>
        <dd className="mt-2 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-700">
          {onSite}
        </dd>
      </div>
      <div>
        <dt className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78]">
          Typical visit window
        </dt>
        <dd className="mt-2 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-700">
          {window}
        </dd>
      </div>
    </dl>
  );
}

export function ServiceDetailPage(): JSX.Element {
  const { slug = "" } = useParams<{ slug: string }>();
  const openBooking = useOpenBooking();
  const category = categoryBySlug(slug);
  const service = serviceBySlug(slug);
  usePageTitle(category?.title ?? service?.title ?? "Service");

  if (category) {
    const jobs = categoryJobs(category);
    const bookTitle = primaryJobTitle(category);

    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-8 lg:py-16">
        <p className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78]">
          What we fix
        </p>
        <h1 className="mt-2 [font-family:'Gabarito',Helvetica] text-[34px] font-extrabold text-[#142033] sm:text-[44px]">
          {category.title}
        </h1>
        <img
          src={category.photo.src}
          alt={category.photo.alt}
          className="mt-6 h-64 w-full object-cover sm:h-80"
        />
        <p className="mt-4 [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700">
          {category.summary}
        </p>
        <DecisionHelp
          signs={category.signs}
          onSite={category.onSite}
          window={category.window}
        />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => openBooking(bookTitle)}
            className={primaryButtonClassName}
          >
            Book this visit
          </button>
          <CallButton className={secondaryButtonClassName}>
            Call {business.phoneDisplay}
          </CallButton>
        </div>

        <h2 className="mt-12 [font-family:'Gabarito',Helvetica] text-2xl font-bold text-[#142033]">
          Jobs in this category
        </h2>
        <ul className="mt-4 divide-y divide-[#142033]/12 border-y border-[#142033]/12">
          {jobs.map((job) => (
            <li
              key={job.title}
              className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <Link
                  to={`/services/${slugify(job.title)}`}
                  className="[font-family:'Gabarito',Helvetica] text-lg font-bold text-[#142033] hover:underline"
                >
                  {job.title}
                </Link>
                <p className="mt-1 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
                  {job.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openBooking(job.title)}
                className={primaryButtonClassName}
              >
                Book this visit
              </button>
            </li>
          ))}
        </ul>

        <Link
          to="/#services"
          className="mt-8 inline-flex text-sm font-semibold text-[#2a7a78]"
        >
          Back to services
        </Link>
      </section>
    );
  }

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

  const parent = categoryForService(service.title);

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-8 lg:py-16">
      {parent ? (
        <Link
          to={`/services/${slugify(parent.title)}`}
          className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78] hover:underline"
        >
          {parent.title}
        </Link>
      ) : null}
      <h1 className="mt-2 [font-family:'Gabarito',Helvetica] text-[34px] font-extrabold text-[#142033] sm:text-[44px]">
        {service.title}
      </h1>
      {parent ? (
        <img
          src={parent.photo.src}
          alt={parent.photo.alt}
          className="mt-6 h-64 w-full object-cover sm:h-80"
        />
      ) : null}
      <p className="mt-4 [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700">
        {service.detail}
      </p>
      <DecisionHelp
        signs={service.signs}
        onSite={service.onSite}
        window={service.window}
      />
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => openBooking(service.title)}
          className={primaryButtonClassName}
        >
          Book this visit
        </button>
        <CallButton className={secondaryButtonClassName}>
          Call {business.phoneDisplay}
        </CallButton>
      </div>
      <Link
        to="/#services"
        className="mt-8 inline-flex text-sm font-semibold text-[#2a7a78]"
      >
        Back to services
      </Link>
    </section>
  );
}
