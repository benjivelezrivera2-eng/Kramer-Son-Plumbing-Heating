import { Menu, Phone, Wrench, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../components/ui/button";

const PHONE_DISPLAY = "(970) 555-0142";
const PHONE_HREF = "tel:+19705550142";

const navigationItems = [
  { label: "Home", targetId: "hero" },
  { label: "Services", targetId: "services" },
  { label: "Service Areas", targetId: "service-areas" },
  { label: "About", targetId: "why-choose-us" },
  { label: "Reviews", targetId: "reviews" },
  { label: "Contact", targetId: "footer" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const SiteHeaderSection = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative flex min-h-20 w-full items-center justify-between gap-4 border border-solid border-slate-200 bg-white px-4 py-4 sm:px-6 md:px-10 lg:px-16">
      <div className="flex shrink-0 items-center gap-3">
        <Wrench className="h-8 w-8 shrink-0 text-[#2a8b8b] sm:h-11 sm:w-11" strokeWidth={2} />
        <div className="flex flex-col items-start gap-0.5">
          <p className="[font-family:'Gabarito',Helvetica] text-[16px] font-extrabold leading-tight tracking-[0] text-[#1b2a4a] sm:text-[22px]">
            Kramer &amp; Son
          </p>
          <p className="[font-family:'Geist',Helvetica] text-[10px] font-medium leading-normal text-slate-500 sm:text-[11px]">
            STERLING, CO
          </p>
        </div>
      </div>

      <nav
        aria-label="Primary navigation"
        className="hidden items-center gap-8 lg:flex"
      >
        <ul className="flex items-center gap-8">
          {navigationItems.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => scrollToId(item.targetId)}
                className="whitespace-nowrap [font-family:'Geist',Helvetica] text-sm font-semibold leading-normal tracking-[0] text-slate-800 transition-colors hover:text-[#1b2a4a]"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <a
        href={PHONE_HREF}
        className="hidden h-auto shrink-0 gap-2.5 rounded-lg border-0 bg-[#d4a843] px-5 py-3 text-[#1b2a4a] shadow-none hover:bg-[#c49a3d] md:inline-flex md:items-center"
      >
        <Phone className="h-[18px] w-[18px]" />
        <span className="[font-family:'Geist',Helvetica] text-sm font-bold leading-normal tracking-[0]">
          Call {PHONE_DISPLAY}
        </span>
      </a>

      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-[#1b2a4a] lg:hidden"
      >
        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-20 z-40 border-b border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden">
          <ul className="flex flex-col gap-1">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => {
                    scrollToId(item.targetId);
                    setMenuOpen(false);
                  }}
                  className="flex h-11 w-full items-center rounded-lg px-3 text-left [font-family:'Geist',Helvetica] text-sm font-semibold leading-normal tracking-[0] text-slate-800 transition-colors hover:bg-slate-50 hover:text-[#1b2a4a]"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <a
            href={PHONE_HREF}
            className="mt-3 flex h-11 items-center justify-center gap-2.5 rounded-lg bg-[#d4a843] px-5 text-[#1b2a4a]"
          >
            <Phone className="h-[18px] w-[18px]" />
            <span className="[font-family:'Geist',Helvetica] text-sm font-bold leading-normal tracking-[0]">
              Call {PHONE_DISPLAY}
            </span>
          </a>
        </div>
      )}
    </header>
  );
};
