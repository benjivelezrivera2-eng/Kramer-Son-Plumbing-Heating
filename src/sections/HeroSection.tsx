import { Phone } from "lucide-react";
import { CallButton } from "../components/CallButton";
import { useOpenBooking } from "../components/BookingDialog";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { business } from "../config/business";

export function HeroSection(): JSX.Element {
  const openBooking = useOpenBooking();
  return (
    <section className="flex w-full flex-col gap-10 bg-[#f4f6f8] px-4 py-12 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-16 lg:py-20">
      <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
        <Badge
          variant="secondary"
          className="border border-[#2a7a78]/25 bg-[#2a7a78]/10 [font-family:'Geist',Helvetica] font-medium text-[#2a7a78]"
        >
          Same-day windows when we can
        </Badge>
        <h1 className="max-w-xl [font-family:'Gabarito',Helvetica] text-[34px] font-extrabold leading-[1.15] text-[#142033] sm:text-[46px] lg:text-[54px]">
          {business.hero.headline}
        </h1>
        <p className="max-w-lg [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700 sm:text-lg">
          {business.hero.body}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            asChild
            size="lg"
            className="h-12 [font-family:'Geist',Helvetica] text-sm font-semibold"
          >
            <CallButton>
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Kramer & Son
            </CallButton>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => openBooking()}
            className="h-12 border-[#142033] [font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033] hover:bg-[#142033]/5"
          >
            Book a visit
          </Button>
        </div>
      </div>
      <img
        src="https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        alt={business.hero.imageAlt}
        width={940}
        height={650}
        loading="eager"
        {...{ fetchpriority: "high" }}
        className="h-[240px] w-full shrink-0 rounded-lg object-cover sm:h-[360px] lg:h-[460px] lg:w-[520px]"
      />
    </section>
  );
}
