import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { business } from "../config/business";

export function FaqSection(): JSX.Element {
  return (
    <section className="bg-[#f4f6f8] px-4 py-16 sm:px-8 lg:px-16">
      <h2 className="[font-family:'Gabarito',Helvetica] text-3xl font-bold leading-tight tracking-[-0.02em] text-[#142033] sm:text-4xl">
        Questions we get a lot
      </h2>
      <Accordion type="multiple" className="mt-10 w-full">
        {business.faqs.map((item, index) => (
          <AccordionItem
            key={item.question}
            value={`question-${index}`}
            className="border-b border-[#142033]/15 bg-transparent px-0"
          >
            <AccordionTrigger className="gap-4 py-5 text-left hover:no-underline [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0">
              <span className="[font-family:'Gabarito',Helvetica] text-lg font-bold leading-snug text-[#142033]">
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-5 pt-0 [font-family:'Geist',Helvetica] text-base leading-7 text-[#3d4a5c]">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
