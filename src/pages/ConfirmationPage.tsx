import { CheckCircle2, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "../config/business";
import { usePageTitle } from "../lib/usePageTitle";

const nextSteps = [
  "The office calls to confirm the address and the problem.",
  "A tech is put on the board with an arrival window.",
  "You get a heads-up when they are on the way.",
];

export function ConfirmationPage(): JSX.Element {
  usePageTitle("Request received");

  return (
    <section className="mx-auto flex w-full max-w-xl flex-col items-start px-4 py-16 sm:px-8 lg:py-24">
      <CheckCircle2 className="h-10 w-10 text-[#2a7a78]" aria-hidden="true" />
      <h1 className="mt-5 [font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033] sm:text-[40px]">
        Request received
      </h1>
      <p className="mt-3 [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700">
        This is a demo, so nothing was sent. On a live site, this is what the
        homeowner would see after they ask for a visit.
      </p>
      <ol className="mt-8 w-full space-y-3">
        {nextSteps.map((step, index) => (
          <li
            key={step}
            className="flex gap-3 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-700"
          >
            <span className="font-semibold text-[#2a7a78]">{index + 1}.</span>
            {step}
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href={business.phoneHref}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#c9a04a] px-5 text-sm font-semibold text-[#142033] hover:bg-[#b8903f]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {business.phoneDisplay}
        </a>
        <Link
          to="/"
          className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 px-5 text-sm font-semibold text-[#142033] hover:bg-slate-50"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
