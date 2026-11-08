import { CalendarDays, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "../config/business";
import { Button } from "./ui/button";
import { CallButton } from "./CallButton";

export function MobileCtaBar(): JSX.Element {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <Button asChild className="h-12 flex-1 [font-family:'Geist',Helvetica] text-sm font-semibold">
          <CallButton>
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call
          </CallButton>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-12 flex-1 border-[#142033] [font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]"
        >
          <Link to="/book">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Book
          </Link>
        </Button>
      </div>
      <p className="sr-only">Call {business.phoneDisplay} or book a visit</p>
    </div>
  );
}
