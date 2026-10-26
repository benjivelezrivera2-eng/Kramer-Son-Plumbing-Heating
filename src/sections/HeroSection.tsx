import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "../config/business";

export function HeroSection(): JSX.Element {
  return (
    <section className="flex w-full flex-col gap-10 bg-[#f4f6f8] px-4 py-12 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-16 lg:py-20">
      <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
        <h1 className="max-w-xl [font-family:'Gabarito',Helvetica] text-[34px] font-extrabold leading-[1.15] text-[#142033] sm:text-[46px] lg:text-[54px]">
          {business.hero.headline}
        </h1>
        <p className="max-w-lg [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700 sm:text-lg">
          {business.hero.body}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={business.phoneHref}
            className="inline-flex h-12 items-center gap-2 rounded-md bg-[#c9a04a] px-5 text-sm font-semibold text-[#142033] hover:bg-[#b8903f] sm:px-6"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call now
          </a>
          <Link
            to="/contact"
            className="inline-flex h-12 items-center rounded-md border border-[#142033] px-5 text-sm font-semibold text-[#142033] hover:bg-[#142033]/5 sm:px-6"
          >
            Request service
          </Link>
        </div>
      </div>
      <img
        src="https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        alt={business.hero.imageAlt}
        width={940}
        height={650}
        loading="eager"
        fetchPriority="high"
        className="h-[240px] w-full shrink-0 rounded-lg object-cover sm:h-[360px] lg:h-[460px] lg:w-[520px]"
      />
    </section>
  );
}
