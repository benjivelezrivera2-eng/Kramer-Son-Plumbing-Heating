import { CustomerTestimonialsSection } from "./sections/CustomerTestimonialsSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { PlumbingHeroSection } from "./sections/PlumbingHeroSection/PlumbingHeroSection";
import { PlumbingServicesSection } from "./sections/PlumbingServicesSection/PlumbingServicesSection";
import { ServiceAreasSection } from "./sections/ServiceAreasSection";
import { ServiceProcessSection } from "./sections/ServiceProcessSection";
import { SiteFooterSection } from "./sections/SiteFooterSection/SiteFooterSection";
import { SiteHeaderSection } from "./sections/SiteHeaderSection/SiteHeaderSection";
import { WhyChooseUsSection } from "./sections/WhyChooseUsSection/WhyChooseUsSection";
import { ServiceRequestProvider } from "../../components/ServiceRequestModal";

export const ElementHomeDesktop = (): JSX.Element => {
  return (
    <ServiceRequestProvider>
      <div className="flex min-h-screen w-full flex-col items-start overflow-x-hidden bg-white">
        <header className="w-full">
          <div className="flex min-h-9 w-full flex-wrap items-center justify-between gap-2 bg-[#1b2a4a] px-4 py-1 sm:px-8 lg:px-16">
            <div className="inline-flex shrink-0 items-start rounded border border-solid border-[#d4a843] bg-[#d4a84315] px-2 py-1">
              <span className="[font-family:'Geist',Helvetica] text-[10px] font-bold leading-normal text-[#d4a843]">
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
        </header>
        <main className="flex w-full flex-col">
          <PlumbingHeroSection />
          <PlumbingServicesSection />
          <WhyChooseUsSection />
          <ServiceProcessSection />
          <ServiceAreasSection />
          <CustomerTestimonialsSection />
          <FrequentlyAskedQuestionsSection />
        </main>
        <SiteFooterSection />
      </div>
    </ServiceRequestProvider>
  );
};
