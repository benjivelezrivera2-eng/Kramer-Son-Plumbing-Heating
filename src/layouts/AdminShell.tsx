import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { business } from "../config/business";
import { useAuth } from "../lib/AuthProvider";
import { useShopLive } from "../lib/useShopLive";

const navItems = [
  { label: "Dashboard", to: "/admin", end: true },
  { label: "Leads", to: "/admin/leads", end: false },
  { label: "Bookings", to: "/admin/bookings", end: false },
  { label: "Week board", to: "/admin/schedule", end: false },
  { label: "Customers", to: "/admin/customers", end: false },
  { label: "Services", to: "/admin/services", end: false },
  { label: "Technicians", to: "/admin/technicians", end: false },
  { label: "Hours", to: "/admin/availability", end: false },
  { label: "Reports", to: "/admin/reports", end: false },
  { label: "Activity", to: "/admin/activity", end: false },
  { label: "Settings", to: "/admin/settings", end: false },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  [
    "flex h-11 items-center rounded-md px-3 [font-family:'Geist',Helvetica] text-sm",
    isActive
      ? "bg-white/10 font-semibold text-white"
      : "font-medium text-slate-300 hover:bg-white/5 hover:text-white",
  ].join(" ");

export function AdminShell(): JSX.Element {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  useShopLive();

  return (
    <div className="flex min-h-screen bg-[#f4f6f8]">
      <aside className="hidden w-60 shrink-0 flex-col bg-[#142033] px-4 py-6 lg:flex">
        <p className="[font-family:'Gabarito',Helvetica] text-lg font-extrabold text-white">
          {business.name}
        </p>
        <p className="mt-1 [font-family:'Geist',Helvetica] text-xs font-medium tracking-wide text-[#c9a04a]">
          Shop office
        </p>
        <nav aria-label="Office" className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 pt-4">
          <p className="truncate [font-family:'Geist',Helvetica] text-xs text-slate-400">
            {user?.email}
          </p>
          <button
            type="button"
            onClick={() => void signOut()}
            className="mt-3 h-11 w-full rounded-md border border-[#c9a04a] text-sm font-semibold text-[#c9a04a] hover:bg-white/5"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:px-8">
          <div className="min-w-0 lg:hidden">
            <p className="truncate [font-family:'Gabarito',Helvetica] text-base font-extrabold text-[#142033]">
              {business.name}
            </p>
            <p className="[font-family:'Geist',Helvetica] text-xs text-[#2a7a78]">
              Shop office
            </p>
          </div>
          <p className="hidden [font-family:'Geist',Helvetica] text-sm text-slate-600 lg:block">
            Signed in as {user?.email}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void signOut()}
              className="h-11 rounded-md border border-slate-200 px-4 text-sm font-semibold text-[#142033] hover:bg-slate-50"
            >
              Sign out
            </button>
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
        </header>

        {menuOpen && (
          <nav
            aria-label="Office"
            className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "flex h-11 items-center rounded-md px-3 [font-family:'Geist',Helvetica] text-sm",
                    isActive
                      ? "bg-slate-100 font-semibold text-[#142033]"
                      : "font-medium text-slate-700",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}

        <main className="flex-1 px-4 py-8 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
