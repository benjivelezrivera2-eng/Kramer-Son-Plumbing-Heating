import { AreasSection } from "./AreasSection";
import { ProcessSection } from "./ProcessSection";
import { ReasonsSection } from "./ReasonsSection";

export function AboutSection(): JSX.Element {
  return (
    <section id="about" className="scroll-mt-24">
      <ReasonsSection />
      <ProcessSection />
      <AreasSection />
    </section>
  );
}
