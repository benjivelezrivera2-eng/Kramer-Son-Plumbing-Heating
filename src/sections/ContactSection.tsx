import { Phone } from "lucide-react";
import { CallButton } from "../components/CallButton";
import { ServiceRequestForm } from "../components/ServiceRequestForm";
import { business } from "../config/business";

export function ContactSection(): JSX.Element {
  return (
    <section
      id="contact"
      className="scroll-mt-24 grid gap-12 px-4 pt-8 pb-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16 lg:px-16"
    >
      <div>
        <h2 className="[font-family:'Gabarito',Helvetica] text-3xl font-bold leading-tight tracking-[-0.02em] text-[#142033] sm:text-4xl">
          Book a visit
        </h2>
        <p className="mt-4 mb-8 max-w-[65ch] [font-family:'Geist',Helvetica] text-base leading-7 text-[#3d4a5c]">
          Name, phone, and email, then pick a visit window on the next page.
        </p>
        <ServiceRequestForm />
      </div>

      <aside className="h-fit bg-[#142033] p-8">
        <h3 className="[font-family:'Gabarito',Helvetica] text-xl font-bold leading-snug text-white">
          Call the shop
        </h3>
        <p className="mt-2 [font-family:'Geist',Helvetica] text-sm font-medium leading-6 text-[#e4ebf2]">
          Faster for leaks, no heat, or a backup.
        </p>
        <CallButton className="mt-5 inline-flex h-12 items-center gap-2 rounded-md bg-[#c9a04a] px-4 text-sm font-semibold text-[#142033] hover:bg-[#b8903f]">
          <Phone className="h-4 w-4" aria-hidden="true" />
          {business.phoneDisplay}
        </CallButton>
        <dl className="mt-6 space-y-3">
          <div>
            <dt className="[font-family:'Geist',Helvetica] text-sm font-medium leading-6 text-[#c9a04a]">
              Area
            </dt>
            <dd className="[font-family:'Geist',Helvetica] text-base leading-7 text-[#e4ebf2]">
              {business.city}
            </dd>
          </div>
          <div>
            <dt className="[font-family:'Geist',Helvetica] text-sm font-medium leading-6 text-[#c9a04a]">
              Hours
            </dt>
            <dd className="[font-family:'Geist',Helvetica] text-base leading-7 text-[#e4ebf2]">
              {business.hours}
            </dd>
          </div>
        </dl>
      </aside>
    </section>
  );
}
