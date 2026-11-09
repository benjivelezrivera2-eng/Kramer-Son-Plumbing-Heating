import {
  CalendarCheck,
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { NotificationBell } from "../components/admin/NotificationBell";
import { ProfileMenu } from "../components/ProfileMenu";
import { Input } from "../components/ui/input";
import { business } from "../config/business";
import {
  adminStatusTitle,
  arrivingNotification,
  localDateString,
  mockActivity,
  mockBookings,
  mockServices,
  seedNotifications,
  type MockActivity,
  type MockBooking,
  type MockBookingStatus,
  type MockNotification,
  type OfficeContext,
} from "../lib/adminMock";
import { useShopLive } from "../lib/useShopLive";

const navItems = [
  { label: "Dashboard", to: "/admin", end: true, icon: LayoutDashboard },
  { label: "Services", to: "/admin/services", end: false, icon: Wrench },
  { label: "Team", to: "/admin/clients", end: false, icon: Users },
  { label: "Bookings", to: "/admin/bookings", end: false, icon: CalendarCheck },
];

const navClass = (isActive: boolean, collapsed: boolean) =>
  [
    "flex h-11 items-center gap-3 rounded-md px-3 [font-family:'Geist',Helvetica] text-sm",
    collapsed ? "justify-center px-0" : "",
    isActive
      ? "bg-white/10 font-semibold text-white"
      : "font-medium text-slate-300 hover:bg-white/5 hover:text-white",
  ].join(" ");

function crumbsFor(pathname: string): string[] {
  if (pathname.startsWith("/admin/services")) return ["Dashboard", "Services"];
  if (pathname.startsWith("/admin/clients")) return ["Dashboard", "Team"];
  if (pathname.startsWith("/admin/bookings")) return ["Dashboard", "Bookings"];
  if (pathname.startsWith("/admin/profile")) return ["Dashboard", "Profile"];
  if (pathname === "/admin") return ["Dashboard"];
  return ["Dashboard", "Office"];
}

export function AdminShell(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState<MockNotification[]>(seedNotifications);
  const [bookings, setBookings] = useState<MockBooking[]>(() => mockBookings.map((row) => ({ ...row })));
  const [activity, setActivity] = useState<MockActivity[]>(() => mockActivity.map((row) => ({ ...row })));
  const { pathname } = useLocation();
  const crumbs = crumbsFor(pathname);
  useShopLive();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setNotes((current) =>
        current.some((item) => item.id === arrivingNotification.id)
          ? current
          : [arrivingNotification, ...current],
      );
    }, 2200);
    return () => window.clearTimeout(timer);
  }, []);

  function markRead(id: string) {
    setNotes((current) =>
      current.map((item) => (item.id === id ? { ...item, unread: false } : item)),
    );
  }

  function setVisitStatus(id: string, next: MockBookingStatus): void {
    const visit = bookings.find((row) => row.id === id);
    if (!visit || visit.status === next) return;
    setBookings((current) => current.map((row) => (row.id === id ? { ...row, status: next } : row)));
    setActivity((current) => [
      {
        id: `act-${id}-${next}-${Date.now()}`,
        kind: "admin",
        title: adminStatusTitle(next),
        detail: `${visit.client}, ${visit.service}, ${visit.window.toLowerCase()}.`,
        when: "Just now",
        date: localDateString(new Date()),
      },
      ...current,
    ]);
  }

  function setVisitService(id: string, next: string): void {
    const visit = bookings.find((row) => row.id === id);
    if (!visit || visit.service === next) return;
    if (!mockServices.some((service) => service.name === next)) return;
    const previous = visit.service;
    setBookings((current) =>
      current.map((row) => (row.id === id ? { ...row, service: next, price: undefined } : row)),
    );
    setActivity((current) => [
      {
        id: `act-${id}-service-${Date.now()}`,
        kind: "admin",
        title: "Service changed",
        detail: `${visit.client}, ${previous} to ${next}.`,
        when: "Just now",
        date: localDateString(new Date()),
      },
      ...current,
    ]);
  }

  const outletContext: OfficeContext = { query, bookings, activity, setVisitStatus, setVisitService };

  return (
    <div className="flex min-h-screen bg-[#f4f6f8]">
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 flex-col bg-[#142033] px-3 py-6 lg:flex ${
          collapsed ? "w-[4.5rem]" : "w-60 px-4"
        }`}
      >
        <div className={`flex items-start ${collapsed ? "justify-center" : "justify-between gap-2"}`}>
          {!collapsed && (
            <div>
              <p className="[font-family:'Gabarito',Helvetica] text-lg font-extrabold text-white">
                {business.name}
              </p>
              <p className="mt-1 [font-family:'Geist',Helvetica] text-xs font-medium tracking-wide text-[#c9a04a]">
                Shop office
              </p>
            </div>
          )}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-300 hover:bg-white/5 hover:text-white"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed((value) => !value)}
          >
            {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </button>
        </div>
        <nav aria-label="Office" className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                title={item.label}
                className={({ isActive }) => navClass(isActive, collapsed)}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {collapsed ? <span className="sr-only">{item.label}</span> : item.label}
              </NavLink>
            );
          })}
        </nav>
        {!collapsed && (
          <div className="mt-auto border-t border-white/10 pt-4">
            <ProfileMenu tone="dark" placement="up" />
          </div>
        )}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate [font-family:'Geist',Helvetica] text-xs text-slate-500">
                {crumbs.join(" / ")}
              </p>
              <p className="truncate [font-family:'Gabarito',Helvetica] text-base font-extrabold text-[#142033] lg:hidden">
                {business.name}
              </p>
            </div>
            <form
              className="relative hidden w-full max-w-sm lg:block"
              role="search"
              onSubmit={(event) => event.preventDefault()}
            >
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search services, clients, bookings"
                aria-label="Search services, clients, bookings"
                className="pl-9"
              />
            </form>
            <QuickActions />
            <NotificationBell items={notes} onMarkRead={markRead} />
            <div className="hidden lg:block">
              <ProfileMenu tone="light" placement="down" showName={false} />
            </div>
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
          <form className="relative mt-3 lg:hidden" role="search" onSubmit={(event) => event.preventDefault()}>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search services, clients, bookings"
              aria-label="Search services, clients, bookings"
              className="pl-9"
            />
          </form>
        </header>

        {menuOpen && (
          <nav aria-label="Office" className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
            <div className="mb-3">
              <ProfileMenu tone="light" placement="down" onNavigate={() => setMenuOpen(false)} />
            </div>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "flex h-11 items-center rounded-md px-3 [font-family:'Geist',Helvetica] text-sm",
                    isActive ? "bg-slate-100 font-semibold text-[#142033]" : "font-medium text-slate-700",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}

        <main className="flex-1 px-4 py-8 lg:px-8">
          <Outlet context={outletContext} />
        </main>
      </div>
    </div>
  );
}

const quickLinks = [
  { label: "Services", to: "/admin/services" },
  { label: "Team", to: "/admin/clients" },
  { label: "Bookings", to: "/admin/bookings" },
];

function QuickActions(): JSX.Element {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const itemClass =
    "flex h-11 w-full items-center px-3 text-left [font-family:'Geist',Helvetica] text-sm font-medium text-[#142033] hover:bg-slate-50";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-[#142033] hover:bg-slate-50"
        aria-label="Quick actions"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <Plus className="h-5 w-5" aria-hidden />
      </button>
      {open && (
        <div
          role="menu"
          aria-label="Quick actions"
          className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            className={itemClass}
            onClick={() => {
              setOpen(false);
              toast("Sample only. A booking was not created.");
            }}
          >
            New booking
          </button>
          {quickLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              role="menuitem"
              className={itemClass}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
