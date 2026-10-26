import { Clock, MapPin, ShieldCheck, Truck } from "lucide-react";
import { business } from "../config/business";

const reasonIcons = [MapPin, Clock, Truck, ShieldCheck];

export function ReasonsSection(): JSX.Element {
  return (
    <section className="bg-[#f4f6f8] px-4 py-16 sm:px-8 lg:px-16 lg:py-20">
      <h2 className="[font-family:'Gabarito',Helvetica] text-[28px] font-extrabold text-[#142033] sm:text-[36px]">
        Why people call
      </h2>
      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {business.reasons.map((reason, index) => {
          const Icon = reasonIcons[index] ?? ShieldCheck;
          return (
            <li
              key={reason.title}
              className="flex flex-col gap-3 border border-slate-200 bg-white p-6"
            >
              <Icon className="h-8 w-8 text-[#2a7a78]" />
              <h3 className="[font-family:'Gabarito',Helvetica] text-lg font-bold text-[#142033]">
                {reason.title}
              </h3>
              <p className="[font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
                {reason.description}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
