import { usePageTitle } from "../lib/usePageTitle";
import { AboutSection } from "../sections/AboutSection";
import { BookSection } from "../sections/BookSection";
import { ContactSection } from "../sections/ContactSection";
import { FaqSection } from "../sections/FaqSection";
import { HeroSection } from "../sections/HeroSection";
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
      <FaqSection />
      <BookSection />
      <ContactSection />
    </>
  );
}
