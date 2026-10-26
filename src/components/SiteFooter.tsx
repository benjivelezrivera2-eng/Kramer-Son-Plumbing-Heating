import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "../config/business";

const footerLinks = [
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function SiteFooter(): JSX.Element {
  return (
    <footer className="w-full bg-[#142033] px-4 pb-10 pt-16 sm:px-8 lg:px-16">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_auto_minmax(0,1fr)] md:justify-between">
        <section className="max-w-sm">
          <p className="[font-family:'Gabarito',Helvetica] text-xl font-extrabold text-white">
            {business.name}
          </p>
          <p className="mt-1 [font-family:'Geist',Helvetica] text-sm text-[#c9a04a]">
            {business.niche}
          </p>
          <p className="mt-4 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-300">
            Local plumbing and heating for homes in {business.city} and nearby
            towns.
          </p>
        </section>

        <nav aria-label="Footer">
          <p className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#c9a04a]">
            Pages
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="[font-family:'Geist',Helvetica] text-sm text-slate-200 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section>
          <p className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#c9a04a]">
            Contact
          </p>
          <address className="mt-4 flex flex-col gap-2 not-italic [font-family:'Geist',Helvetica] text-sm text-slate-200">
            <p>{business.city}</p>
            <a href={business.phoneHref} className="hover:text-white">
              {business.phoneDisplay}
            </a>
            <p>{business.hours}</p>
          </address>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <a
              href={business.phoneHref}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#c9a04a] px-4 text-sm font-semibold text-[#142033] hover:bg-[#b8903f]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call now
            </a>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center rounded-md border border-[#c9a04a] px-4 text-sm font-semibold text-[#c9a04a] hover:bg-white/5"
            >
              Request service
            </Link>
          </div>
        </section>
      </div>

      <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="[font-family:'Geist',Helvetica] text-xs text-slate-400">
          © {new Date().getFullYear()} {business.fullName}
        </p>
        <p className="[font-family:'Geist',Helvetica] text-xs text-slate-400">
          {business.proposalNote}
        </p>
      </div>
    </footer>
  );
}
