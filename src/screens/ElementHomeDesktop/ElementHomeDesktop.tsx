import { Phone } from "lucide-react";
import { CustomerTestimonialsSection } from "./sections/CustomerTestimonialsSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { PlumbingHeroSection } from "./sections/PlumbingHeroSection/PlumbingHeroSection";
import { PlumbingServicesSection } from "./sections/PlumbingServicesSection/PlumbingServicesSection";
import { ServiceAreasSection } from "./sections/ServiceAreasSection";
import { ServiceProcessSection } from "./sections/ServiceProcessSection";
import { SiteFooterSection } from "./sections/SiteFooterSection/SiteFooterSection";
import { SiteHeaderSection } from "./sections/SiteHeaderSection/SiteHeaderSection";
import { WhyChooseUsSection } from "./sections/WhyChooseUsSection/WhyChooseUsSection";
import {
  ServiceRequestProvider,
  useServiceRequest,
} from "../../components/ServiceRequestModal";

function MobileCallBar(): JSX.Element | null {
  const { isOpen } = useServiceRequest();
  if (isOpen) return null;

  return (
    <a
      href="tel:+19705550142"
      className="sticky bottom-0 z-30 flex w-full items-center justify-center gap-2 bg-[#d4a843] px-4 py-3 text-[#1b2a4a] md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Phone className="h-5 w-5" aria-hidden="true" />
      <span className="[font-family:'Geist',Helvetica] text-base font-bold leading-normal">
        Call (970) 555-0142
      </span>
    </a>
  );
}

export const ElementHomeDesktop = (): JSX.Element => {
  return (
    <ServiceRequestProvider>
      <div className="flex min-h-screen w-full flex-col items-start overflow-x-clip bg-white">
        <div className="w-full">
          <div className="flex min-h-9 w-full flex-wrap items-center justify-between gap-2 bg-[#1b2a4a] px-4 py-1 sm:px-8 lg:px-16">
            <div className="inline-flex shrink-0 items-start rounded border border-solid border-[#d4a843] bg-[#d4a84315] px-2 py-1">
              <span className="[font-family:'Geist',Helvetica] text-sm font-bold leading-normal text-[#d4a843]">
                DESIGN PROPOSAL • NOT A LIVE SITE
              </span>
            </div>
            <div className="inline-flex min-w-0 flex-wrap items-center justify-end gap-x-4 gap-y-1">
              <p className="[font-family:'Geist',Helvetica] text-xs leading-normal text-white">
                Local Sterling dispatch
              </p>
              <span
                className="hidden h-3 w-px bg-white/40 sm:block"
                aria-hidden="true"
              />
              <a
                href="tel:+19705550142"
                className="[font-family:'Geist',Helvetica] text-xs leading-normal text-white"
              >
                Call Today:{" "}
                <strong className="font-bold text-[#d4a843]">
                  (970) 555-0142
                </strong>
              </a>
            </div>
          </div>
          <SiteHeaderSection />
        </div>
        <main className="flex w-full flex-col">
          <PlumbingHeroSection />
          <PlumbingServicesSection />
          <WhyChooseUsSection />
          <ServiceProcessSection />
          <ServiceAreasSection />
          <CustomerTestimonialsSection />
          <FrequentlyAskedQuestionsSection />
          <MobileCallBar />
        </main>
        <SiteFooterSection />
      </div>
    </ServiceRequestProvider>
  );
};
