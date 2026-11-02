import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LeadStatusBadge } from "../../components/LeadStatusBadge";
import { BookingStatusBadge } from "../../components/BookingStatusBadge";
import { formatShopTime, type Lead } from "../../lib/leads";
import { formatWindowDate, slotLabel, type Booking, type Customer } from "../../lib/shop";
import { supabase } from "../../lib/supabase";
import { usePageTitle } from "../../lib/usePageTitle";

export function AdminCustomerDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  usePageTitle(customer?.name ?? "Customer");

  useEffect(() => {
    if (!id) return;
    void Promise.all([
      supabase.from("customers").select("*").eq("id", id).maybeSingle(),
      supabase.from("leads").select("*").eq("customer_id", id).order("created_at", { ascending: false }),
      supabase.from("bookings").select("*").eq("customer_id", id).order("window_date", { ascending: false }),
    ]).then(([person, leadRows, bookingRows]) => {
      setCustomer((person.data as Customer | null) ?? null);
      setLeads((leadRows.data ?? []) as Lead[]);
      setBookings((bookingRows.data ?? []) as Booking[]);
    });
  }, [id]);

  if (!customer) {
    return <p className="text-sm text-slate-600">Loading customer…</p>;
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <Link to="/admin/customers" className="text-sm font-semibold text-[#2a7a78]">
        Back to customers
      </Link>
      <h1 className="mt-4 [font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
        {customer.name}
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        {customer.phone} · {customer.email || "no email"} · {customer.city}
      </p>
      {customer.address_line ? (
        <p className="mt-1 text-sm text-slate-600">{customer.address_line}</p>
      ) : null}

      <h2 className="mt-8 text-xl font-bold text-[#142033]">Leads ({leads.length})</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {leads.map((lead) => (
          <li key={lead.id}>
            <Link
              to={`/admin/leads/${lead.id}`}
              className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-4"
            >
              <span className="text-sm text-slate-700">{formatShopTime(lead.created_at)}</span>
              <LeadStatusBadge status={lead.status} />
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-bold text-[#142033]">Bookings ({bookings.length})</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {bookings.map((booking) => (
          <li key={booking.id}>
            <Link
              to={`/admin/bookings/${booking.id}`}
              className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-4"
            >
              <span className="text-sm text-slate-700">
                {formatWindowDate(booking.window_date)} · {slotLabel(booking.window_slot)}
              </span>
              <BookingStatusBadge status={booking.status} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
