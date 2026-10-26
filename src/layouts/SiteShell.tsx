import { Phone } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { business } from "../config/business";

function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function SiteShell(): JSX.Element {
  const { pathname } = useLocation();
  const hideCallBar = pathname === "/confirmation";

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <ScrollToTop />
      <div className="bg-[#142033] px-4 py-1.5 sm:px-8 lg:px-16">
        <p className="text-center [font-family:'Geist',Helvetica] text-xs text-slate-200 sm:text-left">
          {business.proposalNote}
        </p>
      </div>
      <SiteHeader />
      <main className="flex w-full flex-1 flex-col">
        <Outlet />
      </main>
      {!hideCallBar && (
        <a
          href={business.phoneHref}
          className="sticky bottom-0 z-30 flex w-full items-center justify-center gap-2 bg-[#c9a04a] px-4 py-3 text-[#142033] md:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          <span className="[font-family:'Geist',Helvetica] text-base font-bold">
            Call {business.phoneDisplay}
          </span>
        </a>
      )}
      <SiteFooter />
    </div>
  );
}
