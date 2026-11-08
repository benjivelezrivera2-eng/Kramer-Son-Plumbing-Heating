import { Link } from "react-router-dom";
import { CallButton } from "./CallButton";
import { Button } from "./ui/button";
import { business } from "../config/business";

export function CtaBand(): JSX.Element {
  return (
    <section className="bg-[#142033] px-4 py-12 sm:px-8 lg:px-16">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="[font-family:'Gabarito',Helvetica] text-2xl font-extrabold text-white sm:text-3xl">
            Leak, clog, or no heat?
          </h2>
          <p className="mt-2 max-w-xl [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-300">
            Call the shop, or book a morning or afternoon window. We take
            plumbing and heating jobs in {business.city} and the towns around
            it.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="h-11 [font-family:'Geist',Helvetica] text-sm font-semibold"
          >
            <CallButton>Call {business.phoneDisplay}</CallButton>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 border-white/30 bg-transparent [font-family:'Geist',Helvetica] text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
          >
            <Link to="/book">Book a window</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
