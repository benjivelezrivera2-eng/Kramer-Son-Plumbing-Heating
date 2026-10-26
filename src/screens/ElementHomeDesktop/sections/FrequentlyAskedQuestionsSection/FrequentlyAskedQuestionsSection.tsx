import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";

const frequentlyAskedQuestions = [
  {
    question: "What should I do if my water heater is leaking?",
    answer:
      "Turn off the water supply valve on top of the water heater immediately, shut off the gas or breaker, and call us at (970) 555-0142 for rapid same-day assistance.",
  },
  {
    question: "How much does a drain cleaning service cost?",
    answer:
      "Sample pricing for demo purposes. We always diagnose the issue first and give you an upfront price before starting work.",
  },
  {
    question: "Do you offer emergency plumbing services?",
    answer:
      "Yes, we prioritize urgent leaks, sewer backups, and burst pipes to protect your property from water damage.",
  },
  {
    question: "Are tankless water heaters worth the investment?",
    answer:
      "Yes, tankless systems offer endless hot water, last up to twice as long as traditional tanks, and significantly lower monthly energy bills.",
  },
];

export const FrequentlyAskedQuestionsSection = (): JSX.Element => {
  return (
    <section className="flex w-full flex-col items-center gap-12 bg-slate-50 px-4 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
      <header className="flex w-full flex-col items-center gap-3 text-center">
        <p className="[font-family:'Geist',Helvetica] text-sm font-bold leading-normal text-[#1f7777]">
          GOT QUESTIONS?
        </p>
        <h2 className="[font-family:'Gabarito',Helvetica] text-[26px] font-extrabold leading-normal tracking-[0] text-[#1b2a4a] sm:text-[38px]">
          Frequently Asked Questions
        </h2>
      </header>
      <Accordion type="multiple" className="w-full max-w-[800px] space-y-4">
        {frequentlyAskedQuestions.map((item, index) => (
          <AccordionItem
            key={item.question}
            value={`question-${index}`}
            className="rounded-xl border border-slate-200 bg-white px-4 sm:px-6"
          >
            <AccordionTrigger className="gap-4 py-6 text-left hover:no-underline [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0">
              <span className="[font-family:'Gabarito',Helvetica] text-sm font-bold leading-normal tracking-[0] text-[#1b2a4a] sm:text-base">
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 pt-0 [font-family:'Geist',Helvetica] text-sm font-normal leading-[21px] tracking-[0] text-slate-500">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
