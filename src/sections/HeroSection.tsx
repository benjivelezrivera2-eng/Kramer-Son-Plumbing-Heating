import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { CallButton } from "../components/CallButton";
import { Button } from "../components/ui/button";
import { business } from "../config/business";

export function HeroSection(): JSX.Element {
  return (
    <section className="relative isolate min-h-[34rem] w-full overflow-hidden bg-[#142033] sm:min-h-[38rem] lg:min-h-[42rem]">
      <img
        src="/photos/hero-faucet.jpg"
        alt="Gloved hand turning a bathroom faucet supply shutoff."
        width={1280}
        height={720}
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[78%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,#142033_0%,#142033_42%,rgba(20,32,51,0.72)_68%,rgba(20,32,51,0.2)_100%)] lg:bg-[linear-gradient(90deg,#142033_0%,#142033_16%,rgba(20,32,51,0.84)_36%,rgba(20,32,51,0.28)_56%,rgba(20,32,51,0)_76%)]"
      />
      <div className="relative flex min-h-[34rem] items-center px-4 py-16 sm:min-h-[38rem] sm:px-8 lg:min-h-[42rem] lg:px-16">
        <div className="max-w-[26rem] sm:max-w-[30rem]">
          <h1 className="max-w-[16ch] [font-family:'Gabarito',Helvetica] text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
            {business.hero.headline}
          </h1>
          <p className="mt-5 max-w-[38rem] [font-family:'Geist',Helvetica] text-base leading-7 text-[#e4ebf2]">
            {business.hero.body}
          </p>
          <p className="mt-3 [font-family:'Geist',Helvetica] text-sm font-medium leading-6 text-[#e4ebf2]">
            Same-day windows when we can
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 bg-[#c9a04a] text-sm font-semibold text-[#142033] [font-family:'Geist',Helvetica] hover:bg-[#b8903f]"
            >
              <CallButton>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call Kramer & Son
              </CallButton>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 border-white/80 bg-transparent text-sm font-semibold text-white [font-family:'Geist',Helvetica] hover:bg-white/10 hover:text-white"
            >
              <Link to="/#book">Book a visit</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
