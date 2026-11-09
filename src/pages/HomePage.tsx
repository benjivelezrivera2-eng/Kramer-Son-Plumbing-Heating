import { CtaBand } from "../components/CtaBand";
import { usePageTitle } from "../lib/usePageTitle";
import { AboutSection } from "../sections/AboutSection";
import { ContactSection } from "../sections/ContactSection";
import { FaqSection } from "../sections/FaqSection";
import { HeroSection } from "../sections/HeroSection";
import { ReviewsSection } from "../sections/ReviewsSection";
import { ServicesSection } from "../sections/ServicesSection";
import { TrustStrip } from "../sections/TrustStrip";

export function HomePage(): JSX.Element {
  usePageTitle();

  return (
    <>
      <div id="home" className="scroll-mt-24">
        <HeroSection />
        <TrustStrip />
      </div>
      <ServicesSection />
      <AboutSection />
      <ReviewsSection />
      <FaqSection />
      <ContactSection />
      <CtaBand />
    </>
  );
}
