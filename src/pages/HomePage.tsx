import { CtaBand } from "../components/CtaBand";
import { usePageTitle } from "../lib/usePageTitle";
import { HeroSection } from "../sections/HeroSection";
import { ProcessSection } from "../sections/ProcessSection";
import { ReasonsSection } from "../sections/ReasonsSection";
import { ReviewsSection } from "../sections/ReviewsSection";
import { ServicesSection } from "../sections/ServicesSection";

export function HomePage(): JSX.Element {
  usePageTitle();

  return (
    <>
      <HeroSection />
      <ServicesSection limit={4} showCommercial={false} />
      <ReasonsSection />
      <ProcessSection />
      <ReviewsSection />
      <CtaBand />
    </>
  );
}
