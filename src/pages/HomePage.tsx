import { CtaBand } from "../components/CtaBand";
import { usePageTitle } from "../lib/usePageTitle";
import { FaqSection } from "../sections/FaqSection";
import { HeroSection } from "../sections/HeroSection";
import { ProcessSection } from "../sections/ProcessSection";
import { ReasonsSection } from "../sections/ReasonsSection";
import { ReviewsSection } from "../sections/ReviewsSection";
import { ServicesSection } from "../sections/ServicesSection";
import { TrustStrip } from "../sections/TrustStrip";

export function HomePage(): JSX.Element {
  usePageTitle();

  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ServicesSection limit={4} showCommercial={false} />
      <ReasonsSection />
      <ProcessSection />
      <ReviewsSection />
      <FaqSection />
      <CtaBand />
    </>
  );
}
