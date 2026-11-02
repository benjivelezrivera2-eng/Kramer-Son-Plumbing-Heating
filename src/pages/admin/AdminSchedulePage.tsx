import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  addDays,
  denverToday,
  formatWindowDate,
  slotLabel,
  type Booking,
  type Technician,
  type WindowSlot,
} from "../../lib/shop";
import { supabase } from "../../lib/supabase";
import { usePageTitle } from "../../lib/usePageTitle";

const SLOTS: WindowSlot[] = ["morning", "afternoon", "after_hours"];

function startOfWeek(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() - date.getDay());
  const yy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

export function AdminSchedulePage(): JSX.Element {
  usePageTitle("Week board");
  const [weekStart, setWeekStart] = useState(() => startOfWeek(denverToday()));
  const [techs, setTechs] = useState<Technician[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});

  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  useEffect(() => {
    let mounted = true;
    async function load() {
      const [{ data: techRows }, { data: bookingRows }] = await Promise.all([
        supabase
          .from("technicians")
          .select("*")
          .eq("is_active", true)
          .order("sort_order"),
        supabase
          .from("bookings")
          .select("*")
          .gte("window_date", weekStart)
          .lte("window_date", addDays(weekStart, 6))
          .neq("status", "cancelled"),
      ]);
      if (!mounted) return;
      setTechs((techRows ?? []) as Technician[]);
      const rows = (bookingRows ?? []) as Booking[];
      setBookings(rows);
      const ids = rows.map((row) => row.customer_id).filter(Boolean) as string[];
      if (!ids.length) return;
      const { data: people } = await supabase
        .from("customers")
        .select("id, name")
        .in("id", ids);
      const map: Record<string, string> = {};
      for (const person of people ?? []) map[person.id] = person.name;
      setNames(map);
    }
    void load();
    const channel = supabase
      .channel("schedule")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        () => {
          void load();
        },
      )
      .subscribe();
    return () => {
      mounted = false;
      void supabase.removeChannel(channel);
    };
  }, [weekStart]);

  const rows = [
    { id: null as string | null, name: "Unassigned", color: "#64748b" },
    ...techs.map((tech) => ({
      id: tech.id as string | null,
      name: tech.name,
      color: tech.color,
    })),
  ];

  return (
    <section className="mx-auto w-full max-w-[1400px]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
          Week board
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            className="h-11 rounded-md border border-slate-300 px-4 text-sm font-semibold"
            onClick={() => setWeekStart(addDays(weekStart, -7))}
          >
            Prev
          </button>
          <button
            type="button"
            className="h-11 rounded-md border border-slate-300 px-4 text-sm font-semibold"
            onClick={() => setWeekStart(startOfWeek(denverToday()))}
          >
            This week
          </button>
          <button
            type="button"
            className="h-11 rounded-md border border-slate-300 px-4 text-sm font-semibold"
            onClick={() => setWeekStart(addDays(weekStart, 7))}
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[920px]">
          <div className="grid grid-cols-8 gap-2">
            <div />
            {days.map((day) => (
              <div
                key={day}
                className="rounded-md bg-[#f4f6f8] px-2 py-2 text-xs font-semibold text-slate-600"
              >
                {formatWindowDate(day)}
              </div>
            ))}
          </div>
          {rows.map((row) => (
            <div key={row.name} className="mt-2 grid grid-cols-8 gap-2">
              <div className="rounded-md bg-white px-2 py-3 text-sm font-bold" style={{ color: row.color }}>
                {row.name}
              </div>
              {days.map((day) => {
                const jobs = bookings.filter(
                  (booking) =>
                    booking.window_date === day &&
                    (booking.technician_id ?? null) === row.id,
                );
                return (
                  <div
                    key={day}
                    className="min-h-[96px] rounded-md border border-slate-200 bg-white p-2"
                  >
                    {SLOTS.map((slot) =>
                      jobs
                        .filter((job) => job.window_slot === slot)
                        .map((job) => (
                          <Link
                            key={job.id}
                            to={`/admin/bookings/${job.id}`}
                            className={`mb-1 block rounded-md px-2 py-1 text-xs font-semibold ${
                              slot === "after_hours"
                                ? "bg-[#142033] text-[#c9a04a]"
                                : "bg-[#f4f6f8] text-[#142033]"
                            }`}
                          >
                            {slotLabel(slot)} ·{" "}
                            {names[job.customer_id ?? ""] ?? "Job"}
                          </Link>
                        )),
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
