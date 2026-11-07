import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MobileCtaBar } from "../components/MobileCtaBar";
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
  const hideCallBar =
    pathname === "/confirmation" || pathname.startsWith("/b/");

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <ScrollToTop />
      <div className="bg-[#142033] px-4 py-1.5 sm:px-8 lg:px-16">
        <p className="text-center [font-family:'Geist',Helvetica] text-xs text-slate-200 sm:text-left">
          {business.proposalNote}
        </p>
      </div>
      <SiteHeader />
      <main
        className={[
          "flex w-full flex-1 flex-col",
          hideCallBar ? "" : "pb-24 md:pb-0",
        ].join(" ")}
      >
        <Outlet />
      </main>
      {!hideCallBar && <MobileCtaBar />}
      <SiteFooter />
    </div>
  );
}
