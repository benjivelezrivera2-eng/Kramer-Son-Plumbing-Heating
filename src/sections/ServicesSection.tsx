import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useOpenBooking } from "../components/BookingDialog";
import { business } from "../config/business";
import { primaryJobTitle } from "../lib/publicServices";
import { slugify } from "../lib/shop";
import { primaryButtonClassName } from "../lib/ui";

type ServicesSectionProps = {
  limit?: number;
  showCommercial?: boolean;
};

const bodyClass =
  "[font-family:'Geist',Helvetica] text-base leading-7 text-[#3d4a5c]";

function CategoryTile({
  title,
  summary,
  window,
  photo,
  onBook,
  onLearn,
}: {
  title: string;
  summary: string;
  window: string;
  photo: { src: string; alt: string };
  onBook: () => void;
  onLearn: () => void;
}): JSX.Element {
  return (
    <article className="flex h-full flex-col overflow-hidden border border-[#142033]/12 bg-white shadow-[0_1px_0_rgba(20,32,51,0.04)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#142033]/5">
        <img
          src={photo.src}
          alt={photo.alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="[font-family:'Gabarito',Helvetica] text-xl font-bold leading-snug text-[#142033]">
          {title}
        </h3>
        <p className={`mt-2 flex-1 ${bodyClass}`}>{summary}</p>
        <p className="mt-3 [font-family:'Geist',Helvetica] text-sm leading-6 text-[#3d4a5c]">
          <span className="font-semibold text-[#142033]">Typical window:</span>{" "}
          {window}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <button type="button" onClick={onBook} className={primaryButtonClassName}>
            Book this visit
          </button>
          <button
            type="button"
            onClick={onLearn}
            className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78] hover:underline"
          >
            Learn more
          </button>
        </div>
      </div>
    </article>
  );
}

export function ServicesSection({
  limit,
  showCommercial = true,
}: ServicesSectionProps): JSX.Element {
  const openBooking = useOpenBooking();
  const categories = limit
    ? business.serviceCategories.slice(0, limit)
    : business.serviceCategories;
  return (
    <section
      id={limit ? undefined : "services"}
      className="scroll-mt-24 w-full bg-[#f4f6f8] px-4 pt-20 pb-12 sm:px-8 lg:px-16 lg:pt-24 lg:pb-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="[font-family:'Gabarito',Helvetica] text-3xl font-bold leading-tight tracking-[-0.02em] text-[#142033] sm:text-4xl">
          What we fix
        </h2>
        <p className={`mt-4 max-w-[65ch] ${bodyClass}`}>
          Pick the kind of call. Book from here, or open the category for signs,
          what we do on site, and the jobs under it.
        </p>
        {limit ? (
          <Link
            to="/#services"
            className="mt-4 inline-flex [font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78] hover:underline"
          >
            See all services
          </Link>
        ) : null}

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {categories.map((category, index) => {
            const slug = slugify(category.title);
            const place =
              index < 3
                ? "lg:col-span-2"
                : index === 3
                  ? "lg:col-span-2 lg:col-start-2"
                  : "lg:col-span-2";

            return (
              <div key={slug} className={place}>
                <CategoryTile
                  title={category.title}
                  summary={category.summary}
                  window={category.window}
                  photo={category.photo}
                  onBook={() => openBooking(primaryJobTitle(category))}
                  onLearn={() =>
                    openBooking({
                      categoryTitle: category.title,
                      mode: "learn",
                    })
                  }
                />
              </div>
            );
          })}
        </div>

        {showCommercial ? (
          <aside className="mt-12 flex flex-col items-start justify-between gap-5 bg-[#142033] px-6 py-8 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <Briefcase
                className="mt-0.5 h-8 w-8 shrink-0 text-[#c9a04a]"
                aria-hidden="true"
              />
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
        ) : null}
      </div>
    </section>
  );
}
