import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LeadStatusBadge } from "../../components/LeadStatusBadge";
import { formatShopTime, type Lead } from "../../lib/leads";
import { denverToday } from "../../lib/shop";
import { supabase } from "../../lib/supabase";
import { usePageTitle } from "../../lib/usePageTitle";

export function AdminHomePage(): JSX.Element {
  usePageTitle("Dashboard");
  const [newCount, setNewCount] = useState(0);
  const [todayJobs, setTodayJobs] = useState(0);
  const [afterHours, setAfterHours] = useState(0);
  const [latest, setLatest] = useState<Lead[]>([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const today = denverToday();
      const [{ data }, { count }, { count: jobCount }, { count: afterCount }] =
        await Promise.all([
          supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5),
          supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
          supabase
            .from("bookings")
            .select("id", { count: "exact", head: true })
            .eq("window_date", today)
            .neq("status", "cancelled"),
          supabase
            .from("leads")
            .select("id", { count: "exact", head: true })
            .eq("is_after_hours", true),
        ]);
      if (!mounted) return;
      setLatest((data ?? []) as Lead[]);
      setNewCount(count ?? 0);
      setTodayJobs(jobCount ?? 0);
      setAfterHours(afterCount ?? 0);
    }
    void load();
    const channel = supabase
      .channel("home-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => {
        void load();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, () => {
        void load();
      })
      .subscribe();
    return () => {
      mounted = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="mx-auto w-full max-w-3xl">
      <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
        Dashboard
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
        Leave this open on the laptop. Phone form, call tap, and bookings land here.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link to="/admin/leads" className="rounded-md border border-slate-200 bg-white p-5">
          <p className="text-xs text-slate-500">Needs a call</p>
          <p className="mt-2 text-3xl font-extrabold text-[#142033]">{newCount}</p>
        </Link>
        <Link to="/admin/schedule" className="rounded-md border border-slate-200 bg-white p-5">
          <p className="text-xs text-slate-500">Jobs today</p>
          <p className="mt-2 text-3xl font-extrabold text-[#142033]">{todayJobs}</p>
        </Link>
        <Link to="/admin/reports" className="rounded-md border border-slate-200 bg-white p-5">
          <p className="text-xs text-slate-500">After-hours leads</p>
          <p className="mt-2 text-3xl font-extrabold text-[#142033]">{afterHours}</p>
        </Link>
        <Link
          to="/admin/leads"
          className="flex items-center rounded-md border border-slate-200 bg-white p-5 text-sm font-semibold text-[#2a7a78]"
        >
          Open all leads
        </Link>
      </div>
      <h2 className="mt-10 text-xl font-bold text-[#142033]">Latest</h2>
      {latest.length === 0 ? (
        <p className="mt-4 rounded-md border border-slate-200 bg-white p-6 text-sm">
          No leads yet. Open the contact page on your phone.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {latest.map((lead) => (
            <li key={lead.id}>
              <Link
                to={`/admin/leads/${lead.id}`}
                className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white p-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[#142033]">{lead.name}</p>
                  <p className="text-xs text-slate-500">{formatShopTime(lead.created_at)}</p>
                </div>
                <LeadStatusBadge status={lead.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
