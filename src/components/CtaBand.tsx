import { Link } from "react-router-dom";
import { business } from "../config/business";

export function CtaBand(): JSX.Element {
  return (
    <section className="bg-[#142033] px-4 py-12 sm:px-8 lg:px-16">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="[font-family:'Gabarito',Helvetica] text-2xl font-extrabold text-white sm:text-3xl">
            Need someone out today?
          </h2>
          <p className="mt-2 max-w-xl [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-300">
            Call the shop or send a request. We take plumbing and heating jobs in{" "}
            {business.city} and the towns around it.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={business.phoneHref}
            className="inline-flex h-11 items-center justify-center rounded-md bg-[#c9a04a] px-5 text-sm font-semibold text-[#142033] hover:bg-[#b8903f]"
          >
            Call {business.phoneDisplay}
          </a>
          <Link
            to="/contact"
            className="inline-flex h-11 items-center justify-center rounded-md border border-white/30 px-5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Request service
          </Link>
        </div>
      </div>
    </section>
  );
}
