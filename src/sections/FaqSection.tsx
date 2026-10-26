import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { business } from "../config/business";

export function FaqSection(): JSX.Element {
  return (
    <section className="bg-[#f4f6f8] px-4 py-16 sm:px-8 lg:px-16 lg:py-20">
      <h2 className="text-center [font-family:'Gabarito',Helvetica] text-[28px] font-extrabold text-[#142033] sm:text-[36px]">
        Common questions
      </h2>
      <Accordion type="multiple" className="mx-auto mt-10 w-full max-w-[760px] space-y-3">
        {business.faqs.map((item, index) => (
          <AccordionItem
            key={item.question}
            value={`question-${index}`}
            className="border border-slate-200 bg-white px-4 sm:px-5"
          >
            <AccordionTrigger className="gap-4 py-5 text-left hover:no-underline [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0">
              <span className="[font-family:'Gabarito',Helvetica] text-sm font-bold text-[#142033] sm:text-base">
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-5 pt-0 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
