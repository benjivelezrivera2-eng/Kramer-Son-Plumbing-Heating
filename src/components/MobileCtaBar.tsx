import { CalendarDays, Phone } from "lucide-react";
import { business } from "../config/business";
import { useOpenBooking } from "./BookingDialog";
import { Button } from "./ui/button";
import { CallButton } from "./CallButton";

export function MobileCtaBar(): JSX.Element {
  const openBooking = useOpenBooking();
  return (
    <div className="fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <Button asChild className="h-12 flex-1 [font-family:'Geist',Helvetica] text-sm font-semibold">
          <CallButton>
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call
          </CallButton>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => openBooking()}
          className="h-12 flex-1 border-[#142033] [font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]"
        >
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          Book a visit
        </Button>
      </div>
      <p className="sr-only">Call {business.phoneDisplay} or book a visit</p>
    </div>
  );
}
