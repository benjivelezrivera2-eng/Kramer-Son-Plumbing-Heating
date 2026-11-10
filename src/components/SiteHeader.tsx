import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { business } from "../config/business";
import { CallButton } from "./CallButton";

const sectionNav = [
  { label: "Home", to: "/#home", hash: "home" },
  { label: "Services", to: "/#services", hash: "services" },
  { label: "About", to: "/#about", hash: "about" },
  { label: "Contact", to: "/#contact", hash: "contact" },
];

function sectionLinkClass(active: boolean): string {
  return [
    "whitespace-nowrap [font-family:'Geist',Helvetica] text-sm leading-normal transition-colors",
    active
      ? "font-semibold text-[#142033]"
      : "font-medium text-slate-600 hover:text-[#142033]",
  ].join(" ");
}

export function SiteHeader(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const activeHash = hash.replace(/^#/, "") || "home";
  const onMarketingHome = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="flex min-h-16 w-full items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-16">
        <Link
          to="/#home"
          className="flex min-w-0 flex-col"
          onClick={() => setMenuOpen(false)}
        >
          <span className="truncate [font-family:'Gabarito',Helvetica] text-lg font-extrabold leading-tight text-[#142033] sm:text-[22px]">
            {business.name}
          </span>
          <span className="[font-family:'Geist',Helvetica] text-xs font-medium tracking-wide text-[#2a7a78] sm:text-sm">
            {business.niche}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            {sectionNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={sectionLinkClass(
                    onMarketingHome && activeHash === item.hash,
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <CallButton className="inline-flex h-11 items-center gap-2 whitespace-nowrap [font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033] hover:text-[#2a7a78]">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {business.phoneDisplay}
          </CallButton>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-[#142033] lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          <ul className="flex flex-col">
            {sectionNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "flex h-11 items-center rounded-md px-3 [font-family:'Geist',Helvetica] text-sm",
                    onMarketingHome && activeHash === item.hash
                      ? "bg-slate-100 font-semibold text-[#142033]"
                      : "font-medium text-slate-700",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
