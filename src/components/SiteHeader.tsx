import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { business } from "../config/business";
import { useOpenBooking } from "./BookingDialog";
import { Button } from "./ui/button";

const sectionNav = [
  { label: "Home", to: "/#home", hash: "home", opensBooking: false },
  { label: "Services", to: "/#services", hash: "services", opensBooking: false },
  { label: "Book a visit", to: "", hash: "book", opensBooking: true },
  { label: "About", to: "/#about", hash: "about", opensBooking: false },
  { label: "Contact", to: "/#contact", hash: "contact", opensBooking: false },
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
  const openBooking = useOpenBooking();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const activeHash = hash.replace(/^#/, "") || "home";
  const onMarketingHome = pathname === "/";

  function openAndClose(): void {
    setMenuOpen(false);
    openBooking();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="flex min-h-16 w-full items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-16">
        <Link
          to="/#home"
          className="flex min-w-0 flex-col"
          onClick={() => setMenuOpen(false)}
        >
          <span className="[font-family:'Gabarito',Helvetica] text-lg font-extrabold leading-tight text-[#142033] sm:text-[22px]">
            {business.name}
          </span>
          <span className="[font-family:'Geist',Helvetica] text-xs font-medium tracking-wide text-[#2a7a78] sm:text-sm">
            {business.niche}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            {sectionNav.map((item) => (
              <li key={item.label}>
                {item.opensBooking ? (
                  <button
                    type="button"
                    onClick={openAndClose}
                    className={`${sectionLinkClass(false)} inline-flex h-11 items-center`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.to}
                    className={sectionLinkClass(
                      onMarketingHome && activeHash === item.hash,
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            onClick={openAndClose}
            className="h-11 [font-family:'Geist',Helvetica] text-sm font-semibold"
          >
            Book a visit
          </Button>
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
              <li key={item.label}>
                {item.opensBooking ? (
                  <button
                    type="button"
                    onClick={openAndClose}
                    className="flex h-11 items-center rounded-md px-3 [font-family:'Geist',Helvetica] text-sm font-medium text-slate-700"
                  >
                    {item.label}
                  </button>
                ) : (
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
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
