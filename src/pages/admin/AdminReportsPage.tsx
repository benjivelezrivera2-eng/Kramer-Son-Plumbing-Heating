import { useEffect, useState } from "react";
import { sourceLabel, type Lead } from "../../lib/leads";
import { type Booking } from "../../lib/shop";
import { supabase } from "../../lib/supabase";
import { usePageTitle } from "../../lib/usePageTitle";

function weekKey(iso: string) {
  const date = new Date(iso);
  const day = date.getUTCDay();
  const start = new Date(date);
  start.setUTCDate(date.getUTCDate() - day);
  return start.toISOString().slice(0, 10);
}

export function AdminReportsPage(): JSX.Element {
  usePageTitle("Reports");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    void Promise.all([
      supabase.from("leads").select("*"),
      supabase.from("bookings").select("*"),
    ]).then(([leadRows, bookingRows]) => {
      setLeads((leadRows.data ?? []) as Lead[]);
      setBookings((bookingRows.data ?? []) as Booking[]);
    });
  }, []);

  const bySource = {
    contact_form: leads.filter((lead) => lead.source === "contact_form").length,
    click_to_call: leads.filter((lead) => lead.source === "click_to_call").length,
    admin_manual: leads.filter((lead) => lead.source === "admin_manual").length,
  };
  const bookedLeads = leads.filter((lead) =>
    ["booked", "won"].includes(lead.status),
  ).length;
  const formLeads = leads.filter((lead) => lead.source === "contact_form");
  const formBooked = formLeads.filter((lead) =>
    ["booked", "won"].includes(lead.status),
  ).length;
  const afterHoursLeads = leads.filter((lead) => lead.is_after_hours).length;
  const afterHoursBookings = bookings.filter(
    (booking) => booking.window_slot === "after_hours" && booking.status !== "cancelled",
  ).length;
  const missed = leads.filter((lead) => {
    if (lead.status !== "new") return false;
    if (lead.source !== "click_to_call" && !lead.is_after_hours) return false;
    return Date.now() - new Date(lead.created_at).getTime() > 60 * 60 * 1000;
  }).length;

  const weeks: Record<string, number> = {};
  for (const booking of bookings) {
    if (booking.status === "cancelled") continue;
    const key = weekKey(`${booking.window_date}T12:00:00Z`);
    weeks[key] = (weeks[key] ?? 0) + 1;
  }
  const weekRows = Object.entries(weeks)
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .slice(0, 8);

  return (
    <section className="mx-auto w-full max-w-3xl">
      <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
        Reports
      </h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className="rounded-md border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-500">Leads by source</h2>
          <ul className="mt-3 space-y-1 text-sm text-[#142033]">
            <li>Website form: {bySource.contact_form}</li>
            <li>Call tap: {bySource.click_to_call}</li>
            <li>Typed in: {bySource.admin_manual}</li>
          </ul>
        </article>
        <article className="rounded-md border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-500">Lead to booking</h2>
          <p className="mt-3 text-sm text-[#142033]">
            Overall: {leads.length ? Math.round((bookedLeads / leads.length) * 100) : 0}%
            ({bookedLeads}/{leads.length})
          </p>
          <p className="mt-1 text-sm text-[#142033]">
            Form only: {formLeads.length ? Math.round((formBooked / formLeads.length) * 100) : 0}%
            ({formBooked}/{formLeads.length})
          </p>
        </article>
        <article className="rounded-md border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-500">After-hours</h2>
          <p className="mt-3 text-sm text-[#142033]">After-hours leads: {afterHoursLeads}</p>
          <p className="mt-1 text-sm text-[#142033]">After-hours bookings: {afterHoursBookings}</p>
          <p className="mt-1 text-sm text-[#142033]">Missed (still new after 1 hour): {missed}</p>
        </article>
        <article className="rounded-md border border-slate-200 bg-white p-5 sm:col-span-2">
          <h2 className="text-sm font-semibold text-slate-500">Bookings per week</h2>
          {weekRows.length === 0 ? (
            <p className="mt-3 text-sm text-slate-600">No bookings yet.</p>
          ) : (
            <ul className="mt-3 space-y-1 text-sm text-[#142033]">
              {weekRows.map(([week, count]) => (
                <li key={week}>
                  Week of {week}: {count}
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>
      <p className="mt-6 text-xs text-slate-500">
        Source labels: {sourceLabel("contact_form")}, {sourceLabel("click_to_call")},{" "}
        {sourceLabel("admin_manual")}.
      </p>
    </section>
  );
}
