import { ChevronRight, Phone } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useServiceRequest } from "../../../../components/ServiceRequestModal";

const PHONE_DISPLAY = "(970) 555-0142";
const PHONE_HREF = "tel:+19705550142";

export const PlumbingHeroSection = (): JSX.Element => {
  const { openModal } = useServiceRequest();

  return (
    <section
      id="hero"
      className="flex w-full flex-col gap-8 bg-slate-50 px-6 py-12 sm:px-10 sm:py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-16 lg:py-20"
    >
      <div className="flex min-w-0 flex-1 flex-col items-start gap-8">
        <div className="flex w-full flex-col items-start gap-4">
          <h1 className="[font-family:'Gabarito',Helvetica] text-[34px] font-extrabold leading-[1.15] tracking-[0] text-[#1b2a4a] sm:text-[42px] sm:leading-[1.1] lg:text-[54px] lg:leading-[62.1px]">
            Plumbing &amp; Heating Help in Sterling, CO
          </h1>
          <p className="[font-family:'Geist',Helvetica] text-base font-normal leading-7 tracking-[0] text-slate-800 sm:text-lg sm:leading-[28.8px]">
            Fast, friendly, and reliable plumbing and heating services backed by
            local trade professionals. Available same-day to resolve
            emergencies, protect your home, and keep your water flowing cleanly.
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-4">
          <a
            href={PHONE_HREF}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#d4a843] px-6 text-base font-bold text-[#1b2a4a] transition-colors hover:bg-[#c49a3b] sm:h-auto sm:px-8 sm:py-4"
          >
            <Phone className="h-5 w-5" />
            <span className="[font-family:'Geist',Helvetica]">Call Now</span>
          </a>
          <Button
            type="button"
            onClick={openModal}
            className="h-11 rounded-lg border-2 border-[#1b2a4a] bg-transparent px-6 text-base font-bold text-[#1b2a4a] hover:bg-[#1b2a4a]/5 sm:h-auto sm:px-8 sm:py-[14px]"
          >
            <span className="[font-family:'Geist',Helvetica]">
              Request Service
            </span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <img
        src="https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        alt="Plumbing professional servicing equipment in Sterling, CO"
        width={940}
        height={650}
        loading="eager"
        fetchPriority="high"
        className="h-[240px] w-full shrink-0 rounded-2xl object-cover shadow-[0px_16px_32px_#1b2a4a1a] sm:h-[360px] lg:h-[480px] lg:w-[560px]"
      />
    </section>
  );
};
