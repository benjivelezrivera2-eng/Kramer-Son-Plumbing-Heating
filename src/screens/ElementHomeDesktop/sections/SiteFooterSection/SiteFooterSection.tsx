import { Phone, Wrench } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useServiceRequest } from "../../../../components/ServiceRequestModal";

const PHONE_DISPLAY = "(970) 555-0142";
const PHONE_HREF = "tel:+19705550142";

const quickLinks = [
  { label: "Services", targetId: "services" },
  { label: "Service Areas", targetId: "service-areas" },
  { label: "About Us", targetId: "why-choose-us" },
  { label: "Reviews", targetId: "reviews" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const SiteFooterSection = (): JSX.Element => {
  const { openModal } = useServiceRequest();

  return (
    <footer
      id="footer"
      className="flex w-full flex-col gap-12 bg-[#1b2a4a] px-6 pb-10 pt-20 sm:px-10 lg:px-16"
    >
      <div className="grid w-full grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,360px)_auto_minmax(0,280px)] md:justify-between md:gap-8">
        <section className="flex flex-col items-start gap-4">
          <div className="inline-flex items-center gap-3">
            <Wrench className="h-10 w-10 text-[#d4a843]" />
            <h2 className="[font-family:'Gabarito',Helvetica] text-xl font-extrabold leading-normal tracking-[0] text-white sm:text-2xl">
              Kramer &amp; Son Plumbing &amp; Heating
            </h2>
          </div>
          <p className="[font-family:'Geist',Helvetica] text-sm font-normal leading-[22.4px] tracking-[0] text-slate-50 opacity-80">
            Providing friendly, professional plumbing and heating services to
            Sterling, Fort Morgan, Brush, Greeley, and surrounding areas.
            Locally operated.
          </p>
          <span className="inline-flex items-start rounded border border-solid border-[#d4a843] bg-[#d4a84315] px-2 py-1">
            <span className="[font-family:'Geist',Helvetica] text-[10px] font-bold leading-normal text-[#d4a843]">
              DESIGN PROPOSAL • NOT A LIVE SITE
            </span>
          </span>
        </section>
        <nav
          aria-label="Footer navigation"
          className="flex flex-col items-start gap-4"
        >
          <h2 className="[font-family:'Gabarito',Helvetica] text-base font-bold leading-normal tracking-[0] text-[#d4a843]">
            Quick Links
          </h2>
          {quickLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => scrollToId(link.targetId)}
              className="[font-family:'Geist',Helvetica] text-sm font-normal leading-normal tracking-[0] text-slate-50 opacity-90 transition-opacity hover:opacity-100"
            >
              {link.label}
            </button>
          ))}
        </nav>
        <section className="flex flex-col items-start gap-4">
          <h2 className="[font-family:'Gabarito',Helvetica] text-base font-bold leading-normal tracking-[0] text-[#d4a843]">
            Contact Us
          </h2>
          <address className="flex flex-col gap-3 not-italic">
            <p className="[font-family:'Geist',Helvetica] text-sm font-normal leading-normal text-white">
              Sterling, CO
            </p>
            <a
              href={PHONE_HREF}
              className="[font-family:'Geist',Helvetica] text-sm font-normal leading-normal text-white transition-opacity hover:opacity-80"
            >
              Phone: {PHONE_DISPLAY}
            </a>
          </address>
          <Button
            type="button"
            className="h-11 rounded-md bg-[#d4a843] px-4 py-3 text-[#1b2a4a] hover:bg-[#d4a843]/90"
            onClick={() => {
              window.location.href = PHONE_HREF;
            }}
          >
            <Phone className="mr-2 h-4 w-4" />
            <span className="[font-family:'Geist',Helvetica] text-sm font-bold leading-normal tracking-[0]">
              Call {PHONE_DISPLAY}
            </span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 border-[#d4a843] bg-transparent text-[#d4a843] hover:bg-[#d4a843]/10"
            onClick={openModal}
          >
            <span className="[font-family:'Geist',Helvetica] text-sm font-bold leading-normal tracking-[0]">
              Request Service
            </span>
          </Button>
        </section>
      </div>
      <div className="h-px w-full bg-slate-600" />
      <div className="flex w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="[font-family:'Geist',Helvetica] text-xs font-normal leading-normal tracking-[0] text-slate-50 opacity-60">
          © 2026 Kramer &amp; Son Plumbing &amp; Heating. All rights reserved.
        </p>
        <p className="[font-family:'Geist',Helvetica] text-xs font-normal leading-normal tracking-[0] text-slate-50 opacity-60">
          Design proposal — demo of a fictional business
        </p>
      </div>
    </footer>
  );
};
