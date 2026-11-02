import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { BookingStatusBadge } from "../../components/BookingStatusBadge";
import { ConfirmModal } from "../../components/ConfirmModal";
import {
  bookingStatusLabel,
  bookingStatuses,
  formatWindowDate,
  slotLabel,
  type Booking,
  type BookingStatus,
  type Technician,
} from "../../lib/shop";
import { supabase } from "../../lib/supabase";
import { fieldClassName } from "../../lib/ui";
import { usePageTitle } from "../../lib/usePageTitle";

export function AdminBookingDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [techs, setTechs] = useState<Technician[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [cancelOpen, setCancelOpen] = useState(false);
  const [reason, setReason] = useState("");

  usePageTitle(customerName || "Booking");

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    async function load() {
      const [{ data }, { data: techRows }] = await Promise.all([
        supabase.from("bookings").select("*").eq("id", id).maybeSingle(),
        supabase.from("technicians").select("*").order("sort_order"),
      ]);
      if (!mounted) return;
      if (!data) {
        setBooking(null);
        return;
      }
      const row = data as Booking;
      setBooking(row);
      setTechs((techRows ?? []) as Technician[]);
      if (row.customer_id) {
        const { data: person } = await supabase
          .from("customers")
          .select("name")
          .eq("id", row.customer_id)
          .maybeSingle();
        if (person) setCustomerName(person.name);
      }
      if (row.service_type_id) {
        const { data: service } = await supabase
          .from("service_types")
          .select("title")
          .eq("id", row.service_type_id)
          .maybeSingle();
        if (service) setServiceTitle(service.title);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, [id]);

  async function save(patch: Partial<Booking>) {
    if (!booking) return;
    const { data, error } = await supabase
      .from("bookings")
      .update(patch)
      .eq("id", booking.id)
      .select("*")
      .single();
    if (error || !data) {
      toast.error("Could not update that booking.");
      return;
    }
    setBooking(data as Booking);
    await supabase.rpc("log_activity", {
      p_entity_type: "booking",
      p_entity_id: booking.id,
      p_action: "booking.updated",
      p_actor_type: "admin",
      p_metadata: patch,
    });
    toast.success("Saved.");
  }

  if (!booking) {
    return <p className="text-sm text-slate-600">Loading booking…</p>;
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <Link to="/admin/bookings" className="text-sm font-semibold text-[#2a7a78]">
        Back to bookings
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
          {customerName || "Visit"}
        </h1>
        <BookingStatusBadge status={booking.status} />
        {booking.window_slot === "after_hours" ? (
          <span className="rounded-md bg-[#142033] px-2 py-1 text-xs font-semibold text-[#c9a04a]">
            After-hours
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-slate-600">
        {serviceTitle || "Service"} · {formatWindowDate(booking.window_date)} ·{" "}
        {slotLabel(booking.window_slot)}
      </p>
      {booking.notes ? (
        <p className="mt-4 rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-700">
          {booking.notes}
        </p>
      ) : null}
      {booking.cancel_reason ? (
        <p className="mt-4 text-sm text-slate-700">
          Cancelled: {booking.cancel_reason}
          {booking.cancelled_at
            ? ` · ${new Date(booking.cancelled_at).toLocaleString()}`
            : ""}
        </p>
      ) : null}

      <h2 className="mt-8 text-xl font-bold text-[#142033]">Technician</h2>
      <select
        className={`mt-3 max-w-xs ${fieldClassName}`}
        value={booking.technician_id ?? ""}
        onChange={(event) =>
          void save({ technician_id: event.target.value || null })
        }
      >
        <option value="">Unassigned</option>
        {techs
          .filter((tech) => tech.is_active || tech.id === booking.technician_id)
          .map((tech) => (
            <option key={tech.id} value={tech.id}>
              {tech.name}
            </option>
          ))}
      </select>

      <h2 className="mt-8 text-xl font-bold text-[#142033]">Status</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {bookingStatuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => {
              if (status === "cancelled") {
                setCancelOpen(true);
                return;
              }
              void save({ status: status as BookingStatus });
            }}
            className={
              booking.status === status
                ? "h-11 rounded-md bg-[#142033] px-4 text-sm font-semibold text-white"
                : "h-11 rounded-md border border-slate-300 px-4 text-sm font-semibold text-[#142033]"
            }
          >
            {bookingStatusLabel(status)}
          </button>
        ))}
      </div>

      {booking.lead_id ? (
        <Link
          to={`/admin/leads/${booking.lead_id}`}
          className="mt-8 inline-flex text-sm font-semibold text-[#2a7a78]"
        >
          Open the lead
        </Link>
      ) : null}

      {cancelOpen ? (
        <ConfirmModal
          title="Cancel this visit?"
          confirmLabel="Cancel visit"
          danger
          onCancel={() => setCancelOpen(false)}
          onConfirm={() => {
            if (!reason.trim()) {
              toast.error("Add a reason.");
              return;
            }
            void save({
              status: "cancelled",
              cancel_reason: reason.trim(),
              cancelled_at: new Date().toISOString(),
            });
            setCancelOpen(false);
          }}
        >
          <input
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className={fieldClassName}
            placeholder="Customer cancelled, weather…"
          />
        </ConfirmModal>
      ) : null}
    </section>
  );
}
