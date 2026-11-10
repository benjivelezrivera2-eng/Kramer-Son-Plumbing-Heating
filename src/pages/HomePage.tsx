import { CtaBand } from "../components/CtaBand";
import { PageHead } from "../components/PageHead";
import { AboutSection } from "../sections/AboutSection";
import { ArticlesSection } from "../sections/ArticlesSection";
import { ContactSection } from "../sections/ContactSection";
import { FaqSection } from "../sections/FaqSection";
import { HeroSection } from "../sections/HeroSection";
import { ReviewsSection } from "../sections/ReviewsSection";
import { ServicesSection } from "../sections/ServicesSection";
import { TrustStrip } from "../sections/TrustStrip";

export function HomePage(): JSX.Element {
  return (
    <>
      <PageHead path="/" />
      <div id="home" className="scroll-mt-24">
        <HeroSection />
        <TrustStrip />
      </div>
      <ServicesSection />
      <AboutSection />
      <ReviewsSection />
      <FaqSection />
      <ArticlesSection />
      <ContactSection />
      <CtaBand />
    </>
  );
}
