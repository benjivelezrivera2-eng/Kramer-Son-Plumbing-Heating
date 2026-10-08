import { PhoneCall, ClipboardCheck, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { useServiceRequest } from "../../../../components/ServiceRequestModal";

const processSteps = [
  {
    number: "01",
    icon: PhoneCall,
    title: "Call or Request Online",
    description:
      "Reach us at (970) 555-0142 or book through our simple website form.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "On-Site Diagnostic",
    description:
      "We arrive on time, inspect the issue, and present upfront flat-rate options.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Fixed Right, Fast",
    description:
      "Our plumber completes the job cleanly and leaves your home spotless.",
  },
];

export const ServiceProcessSection = (): JSX.Element => {
  const { openModal } = useServiceRequest();

  return (
    <section className="flex w-full flex-col items-start gap-12 bg-white px-4 py-16 sm:px-8 md:px-16 md:py-24">
      <header className="flex w-full flex-col items-center gap-3">
        <p className="[font-family:'Geist',Helvetica] text-sm font-bold leading-[normal] text-[#2a8b8b]">
          OUR SIMPLE PROCESS
        </p>
        <h2 className="[font-family:'Gabarito',Helvetica] text-center text-[30px] font-extrabold leading-[normal] tracking-[0] text-[#1b2a4a] sm:text-[38px]">
          How It Works
        </h2>
      </header>
      <div className="grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-8">
        {processSteps.map((step) => {
          const Icon = step.icon;
          return (
            <Card
              key={step.number}
              className="flex h-full flex-col gap-5 rounded-xl border-0 bg-slate-50 p-6 shadow-none md:p-8"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
                <span className="[font-family:'Gabarito',Helvetica] text-4xl font-extrabold leading-[normal] tracking-[0] text-[#2a8b8b30]">
                  {step.number}
                </span>
                <Icon className="h-10 w-10 text-[#2a8b8b]" />
              </CardHeader>
              <CardContent className="flex flex-col items-start gap-2 p-0">
                <h3 className="[font-family:'Gabarito',Helvetica] text-xl font-bold leading-[normal] tracking-[0] text-[#1b2a4a]">
                  {step.title}
                </h3>
                <p className="[font-family:'Geist',Helvetica] text-sm font-normal leading-[21px] tracking-[0] text-slate-800">
                  {step.description}
                </p>
                {step.number === "01" && (
                  <button
                    type="button"
                    onClick={openModal}
                    className="mt-2 h-11 rounded-lg border-2 border-[#1b2a4a] px-4 text-sm font-bold text-[#1b2a4a] transition-colors hover:bg-[#1b2a4a]/5"
                  >
                    Request Online
                  </button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
