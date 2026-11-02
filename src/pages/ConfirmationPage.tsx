import { CheckCircle2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { CallButton } from "../components/CallButton";
import { business } from "../config/business";
import { usePageTitle } from "../lib/usePageTitle";

export function ConfirmationPage(): JSX.Element {
  const [params] = useSearchParams();
  const isBooking = params.get("type") === "booking";
  const token = params.get("token");
  usePageTitle(isBooking ? "Visit booked" : "Request received");

  return (
    <section className="mx-auto flex w-full max-w-xl flex-col items-start px-4 py-16 sm:px-8 lg:py-24">
      <CheckCircle2 className="h-10 w-10 text-[#2a7a78]" aria-hidden="true" />
      <h1 className="mt-5 [font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033] sm:text-[40px]">
        {isBooking ? "You're on the board" : "Request received"}
      </h1>
      <p className="mt-3 [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700">
        {isBooking
          ? "You're on the calendar. Check the confirmation from the booking page."
          : "Next step is to pick a visit window."}
      </p>
      {isBooking && token ? (
        <Link
          to={`/b/${token}`}
          className="mt-6 inline-flex h-11 items-center rounded-md bg-[#c9a04a] px-5 text-sm font-semibold text-[#142033] hover:bg-[#b8903f]"
        >
          Manage this visit
        </Link>
      ) : null}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <CallButton className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#c9a04a] px-5 text-sm font-semibold text-[#142033] hover:bg-[#b8903f]">
          Call {business.phoneDisplay}
        </CallButton>
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
