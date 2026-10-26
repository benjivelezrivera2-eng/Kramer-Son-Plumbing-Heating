import { Phone } from "lucide-react";
import { ServiceRequestForm } from "../components/ServiceRequestForm";
import { business } from "../config/business";
import { usePageTitle } from "../lib/usePageTitle";

export function ContactPage(): JSX.Element {
  usePageTitle("Contact");

  return (
    <section className="grid gap-12 px-4 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:px-16 lg:py-16">
      <div>
        <h1 className="[font-family:'Gabarito',Helvetica] text-[34px] font-extrabold text-[#142033] sm:text-[44px]">
          Request a visit
        </h1>
        <p className="mt-3 mb-8 max-w-xl [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700">
          Tell us the problem and a number we can reach. On a live shop site
          this would go to the office. This demo only shows the next screen.
        </p>
        <ServiceRequestForm />
      </div>

      <aside className="h-fit border border-slate-200 bg-[#f4f6f8] p-6">
        <h2 className="[font-family:'Gabarito',Helvetica] text-xl font-bold text-[#142033]">
          Call the shop
        </h2>
        <p className="mt-2 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
          Faster for leaks, no heat, or a backup.
        </p>
        <a
          href={business.phoneHref}
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-md bg-[#c9a04a] px-4 text-sm font-semibold text-[#142033] hover:bg-[#b8903f]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {business.phoneDisplay}
        </a>
        <dl className="mt-6 space-y-3 [font-family:'Geist',Helvetica] text-sm">
          <div>
            <dt className="text-slate-500">Area</dt>
            <dd className="font-medium text-[#142033]">{business.city}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Hours</dt>
            <dd className="font-medium text-[#142033]">{business.hours}</dd>
          </div>
        </dl>
      </aside>
    </section>
  );
}
