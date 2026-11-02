import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import type { Lead } from "../../lib/leads";
import {
  addDays,
  denverToday,
  formatWindowDate,
  slotLabel,
  type OpenWindow,
  type ServiceType,
  type WindowSlot,
} from "../../lib/shop";
import { supabase } from "../../lib/supabase";
import { fieldClassName, primaryButtonClassName } from "../../lib/ui";
import { usePageTitle } from "../../lib/usePageTitle";

const SLOTS: WindowSlot[] = ["morning", "afternoon", "after_hours"];

export function AdminBookingNewPage(): JSX.Element {
  usePageTitle("Book a window");
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const leadId = params.get("leadId");
  const [lead, setLead] = useState<Lead | null>(null);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [serviceId, setServiceId] = useState("");
  const [windowDate, setWindowDate] = useState("");
  const [windowSlot, setWindowSlot] = useState<WindowSlot | "">("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const from = denverToday();
    void Promise.all([
      supabase.from("service_types").select("*").eq("is_active", true).order("sort_order"),
      supabase.functions.invoke("get-availability", {
        body: { from, to: addDays(from, 13) },
      }),
      leadId
        ? supabase.from("leads").select("*").eq("id", leadId).maybeSingle()
        : Promise.resolve({ data: null }),
    ]).then(([serviceRes, windowRes, leadRes]) => {
      setServices((serviceRes.data ?? []) as ServiceType[]);
      setWindows((windowRes.data?.windows ?? []) as OpenWindow[]);
      if (leadRes.data) {
        const row = leadRes.data as Lead;
        setLead(row);
        setName(row.name);
        setPhone(row.phone);
        setEmail(row.email);
        setCity(row.city);
        setDescription(row.description);
        if (row.service_type_id) setServiceId(row.service_type_id);
      }
    });
  }, [leadId]);

  const dates = useMemo(
    () => [...new Set(windows.map((row) => row.window_date))],
    [windows],
  );
  const slotsForDate = windows.filter((row) => row.window_date === windowDate);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!windowDate || !windowSlot || !name.trim() || !phone.trim() || !email.trim()) {
      toast.error("Name, phone, email, and a window are required.");
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke("create-booking", {
      body: {
        lead_id: lead?.id,
        service_type_id: serviceId || null,
        window_date: windowDate,
        window_slot: windowSlot,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        city: city.trim(),
        address_line: addressLine.trim(),
        description: description.trim(),
      },
    });
    setSubmitting(false);
    if (error || !data?.booking_id) {
      toast.error(data?.error || "Could not book that window.");
      return;
    }
    navigate(`/admin/bookings/${data.booking_id}`);
  }

  return (
    <section className="mx-auto w-full max-w-xl">
      <Link to="/admin/bookings" className="text-sm font-semibold text-[#2a7a78]">
        Back to bookings
      </Link>
      <h1 className="mt-4 [font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
        Book a window
      </h1>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="text-sm font-semibold text-[#142033]">
          Service
          <select
            className={`mt-1.5 ${fieldClassName}`}
            value={serviceId}
            onChange={(event) => setServiceId(event.target.value)}
          >
            <option value="">Pick one</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((date) => (
            <button
              key={date}
              type="button"
              onClick={() => {
                setWindowDate(date);
                setWindowSlot("");
              }}
              className={`h-11 shrink-0 rounded-md px-3 text-sm font-semibold ${
                windowDate === date
                  ? "bg-[#142033] text-white"
                  : "border border-slate-300 text-[#142033]"
              }`}
            >
              {formatWindowDate(date)}
            </button>
          ))}
        </div>
        {windowDate
          ? SLOTS.map((slot) => {
              const open = slotsForDate.find((row) => row.slot === slot);
              if (!open) return null;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setWindowSlot(slot)}
                  className={`h-11 rounded-md text-sm font-semibold ${
                    windowSlot === slot
                      ? "bg-[#2a7a78] text-white"
                      : "border border-slate-300 text-[#142033]"
                  }`}
                >
                  {slotLabel(slot)} · {open.remaining} left
                </button>
              );
            })
          : null}
        <input className={fieldClassName} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className={fieldClassName} placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className={fieldClassName} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={fieldClassName} placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <input className={fieldClassName} placeholder="Address" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} />
        <textarea
          className="min-h-[80px] rounded-md border border-slate-300 px-3 py-2 text-sm"
          placeholder="Notes"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={submitting} className={primaryButtonClassName}>
          {submitting ? "Booking…" : "Save booking"}
        </button>
      </form>
    </section>
  );
}
