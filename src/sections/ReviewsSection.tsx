import { Star } from "lucide-react";
import { business } from "../config/business";

export function ReviewsSection(): JSX.Element {
  return (
    <section className="bg-white px-4 py-16 sm:px-8 lg:px-16 lg:py-20">
      <h2 className="[font-family:'Gabarito',Helvetica] text-[28px] font-extrabold text-[#142033] sm:text-[36px]">
        What the work feels like
      </h2>
      <p className="mt-2 [font-family:'Geist',Helvetica] text-sm text-slate-500">
        Sample reviews for this demo.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {business.reviews.map((review) => (
          <figure
            key={review.name}
            className="flex flex-col gap-4 border border-slate-200 bg-[#f4f6f8] p-6"
          >
            <div
              className="flex gap-0.5"
              role="img"
              aria-label="5 out of 5"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  aria-hidden="true"
                  className="h-4 w-4 fill-[#c9a04a] text-[#c9a04a]"
                />
              ))}
            </div>
            <blockquote className="[font-family:'Geist',Helvetica] text-sm leading-6 text-slate-700">
              {review.quote}
            </blockquote>
            <figcaption className="mt-auto [font-family:'Gabarito',Helvetica] text-sm font-bold text-[#142033]">
              {review.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
