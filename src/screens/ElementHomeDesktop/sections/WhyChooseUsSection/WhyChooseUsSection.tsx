import { Clock, MapPin, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

const trustReasons = [
  {
    icon: MapPin,
    title: "Local to Sterling",
    description:
      "Deeply rooted in the local community, dispatching rapidly from town.",
  },
  {
    icon: Clock,
    title: "Upfront Pricing",
    description:
      "Clear, written estimates before work begins. No surprise fees.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description:
      "Highly trained technicians carrying advanced trade tools.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Work",
    description:
      "Sample content for demo purposes.",
  },
];

export const WhyChooseUsSection = (): JSX.Element => {
  return (
    <section
      id="why-choose-us"
      className="flex w-full flex-col items-start gap-12 bg-slate-50 px-4 py-16 sm:px-8 lg:px-16 lg:py-24"
    >
      <header className="flex w-full flex-col items-center gap-3">
        <p className="[font-family:'Geist',Helvetica] text-sm font-bold leading-normal text-[#1f7777]">
          WHY CHOOSE US
        </p>
        <h2 className="w-full text-center [font-family:'Gabarito',Helvetica] text-[26px] font-extrabold leading-tight tracking-[0] text-[#1b2a4a] sm:text-[38px]">
          Why Sterling Trusts Kramer &amp; Son Plumbing &amp; Heating
        </h2>
      </header>
      <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {trustReasons.map((reason) => {
          const Icon = reason.icon;
          return (
            <li key={reason.title} className="flex">
              <Card className="flex h-full w-full flex-col items-start gap-4 rounded-xl border border-slate-200 bg-white">
                <CardContent className="flex h-full w-full flex-col items-start gap-4 p-8">
                  <Icon className="h-11 w-11 text-[#2a8b8b]" />
                  <div className="flex w-full flex-col items-start gap-2">
                    <h3 className="[font-family:'Gabarito',Helvetica] text-xl font-bold leading-normal tracking-[0] text-[#1b2a4a]">
                      {reason.title}
                    </h3>
                    <p className="[font-family:'Geist',Helvetica] text-sm font-normal leading-[21px] tracking-[0] text-slate-500">
                      {reason.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
