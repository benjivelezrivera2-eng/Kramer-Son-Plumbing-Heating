import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookingStatusBadge } from "../../components/BookingStatusBadge";
import { formatWindowDate, slotLabel, type Booking } from "../../lib/shop";
import { supabase } from "../../lib/supabase";
import { usePageTitle } from "../../lib/usePageTitle";

export function AdminBookingsPage(): JSX.Element {
  usePageTitle("Bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data } = await supabase
        .from("bookings")
        .select("*")
        .order("window_date", { ascending: true });
      if (!mounted) return;
      const rows = (data ?? []) as Booking[];
      setBookings(rows);
      const ids = rows.map((row) => row.customer_id).filter(Boolean) as string[];
      if (ids.length) {
        const { data: people } = await supabase
          .from("customers")
          .select("id, name")
          .in("id", ids);
        const map: Record<string, string> = {};
        for (const person of people ?? []) map[person.id] = person.name;
        setNames(map);
      }
    }
    void load();
    const channel = supabase
      .channel("bookings-list")
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
    <section className="mx-auto w-full max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
            Bookings
          </h1>
          <p className="mt-2 text-sm text-slate-600">Windows on the board.</p>
        </div>
        <Link
          to="/admin/bookings/new"
          className="inline-flex h-11 items-center rounded-md bg-[#c9a04a] px-4 text-sm font-semibold text-[#142033]"
        >
          Book a window
        </Link>
      </div>
      {bookings.length === 0 ? (
        <p className="mt-8 rounded-md border border-slate-200 bg-white p-6 text-sm text-slate-700">
          No bookings yet. Open /book on your phone.
        </p>
      ) : (
        <ul className="mt-8 flex flex-col gap-3">
          {bookings.map((booking) => (
            <li key={booking.id}>
              <Link
                to={`/admin/bookings/${booking.id}`}
                className={`flex flex-col gap-2 rounded-md border bg-white p-4 hover:border-[#2a7a78] md:flex-row md:items-center md:justify-between ${
                  booking.window_slot === "after_hours"
                    ? "border-[#142033]"
                    : "border-slate-200"
                }`}
              >
                <div>
                  <p className="font-bold text-[#142033]">
                    {names[booking.customer_id ?? ""] ?? "Customer"}
                  </p>
                  <p className="text-sm text-slate-600">
                    {formatWindowDate(booking.window_date)} · {slotLabel(booking.window_slot)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {booking.window_slot === "after_hours" ? (
                    <span className="rounded-md bg-[#142033] px-2 py-1 text-xs font-semibold text-[#c9a04a]">
                      After-hours
                    </span>
                  ) : null}
                  <BookingStatusBadge status={booking.status} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
