import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { CallButton } from "./CallButton";
import { business } from "../config/business";

const footerLinks = [
  { label: "Services", to: "/#services" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/#contact" },
  { label: "Shop login", to: "/login" },
];

const titleClass =
  "[font-family:'Gabarito',Helvetica] text-base font-bold leading-snug text-white";
const metaClass =
  "[font-family:'Geist',Helvetica] text-sm font-medium leading-6 text-[#e4ebf2]";

export function SiteFooter(): JSX.Element {
  return (
    <footer className="w-full bg-[#142033] px-4 pt-16 pb-8 sm:px-8 lg:px-16">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_auto_minmax(0,1fr)] md:justify-between">
        <section className="max-w-sm">
          <p className="[font-family:'Gabarito',Helvetica] text-xl font-bold leading-snug text-white">
            {business.name}
          </p>
          <p className="mt-1 [font-family:'Geist',Helvetica] text-sm font-medium leading-6 text-[#c9a04a]">
            {business.niche}
          </p>
          <p className="mt-4 max-w-[65ch] [font-family:'Geist',Helvetica] text-base leading-7 text-[#e4ebf2]">
            Local plumbing and heating for homes in {business.city} and nearby
            towns.
          </p>
        </section>

        <nav aria-label="Footer">
          <p className={titleClass}>Pages</p>
          <ul className="mt-4 flex flex-col gap-3">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={`${metaClass} hover:text-white`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section>
          <p className={titleClass}>Contact</p>
          <address className={`mt-4 flex flex-col gap-2 not-italic ${metaClass}`}>
            <p>{business.city}</p>
            <CallButton className="hover:text-white">{business.phoneDisplay}</CallButton>
            <p>{business.hours}</p>
          </address>
          <div className="mt-5 flex flex-col items-start gap-3">
            <CallButton className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#c9a04a] px-4 text-sm font-semibold text-[#142033] hover:bg-[#b8903f]">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call now
            </CallButton>
            <Link
              to="/#contact"
              className="[font-family:'Geist',Helvetica] text-sm font-medium leading-6 text-[#c9a04a] underline-offset-4 hover:underline"
            >
              Book a visit
            </Link>
          </div>
        </section>
      </div>

      <div className="mt-16 border-t border-white/15 pt-6">
        <p className={metaClass}>
          © {new Date().getFullYear()} {business.fullName}
        </p>
      </div>
    </footer>
  );
}
