import { Star } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

const testimonials = [
  {
    name: "Marcus G.",
    review:
      "Our water heater died late on a Thursday and the team arrived first thing Friday morning. Quickly replaced the tank, gave me an upfront estimate, and did exceptionally clean work.",
  },
  {
    name: "Elena R.",
    review:
      "Great local team! They unclogged our main sewer cleanout line quickly and explained what caused the blockage. Highly recommend their drain team.",
  },
  {
    name: "Robert T.",
    review:
      "Honest and dependable team. Diagnosed our pressure regulator valve issue and had the parts on hand to replace it instantly. Absolute lifesavers in Sterling.",
  },
];

export const CustomerTestimonialsSection = (): JSX.Element => {
  return (
    <section
      id="reviews"
      className="flex w-full flex-col gap-12 bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      <header className="flex w-full flex-col items-center gap-3 text-center">
        <p className="[font-family:'Geist',Helvetica] text-sm font-bold leading-normal text-[#2a8b8b]">
          CUSTOMER TESTIMONIALS
        </p>
        <h2 className="[font-family:'Gabarito',Helvetica] text-[30px] font-extrabold leading-normal tracking-[0] text-[#1b2a4a] sm:text-[38px]">
          Sample Reviews
        </h2>
        <p className="[font-family:'Geist',Helvetica] text-sm font-normal leading-normal tracking-[0] text-slate-500">
          Sample content for demo purposes
        </p>
      </header>
      <div className="grid w-full grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.name}
            className="h-full rounded-xl border-slate-200 bg-slate-50 shadow-none"
          >
            <CardContent className="flex h-full flex-col items-start gap-4 p-6">
              <div className="flex w-full items-center justify-between gap-4">
                <h3 className="[font-family:'Gabarito',Helvetica] text-base font-bold leading-normal tracking-[0] text-[#1b2a4a]">
                  {testimonial.name}
                </h3>
                <div className="flex shrink-0 items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#d4a843] text-[#d4a843]"
                    />
                  ))}
                </div>
              </div>
              <p className="[font-family:'Geist',Helvetica] text-sm font-normal leading-[21px] tracking-[0] text-slate-800">
                {testimonial.review}
              </p>
              <p className="mt-auto w-full [font-family:'Geist',Helvetica] text-sm font-normal leading-normal tracking-[0] text-slate-500">
                Sample review
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
