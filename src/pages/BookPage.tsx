import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { business } from "../config/business";
import {
  addDays,
  denverToday,
  formatWindowDate,
  slotLabel,
  type OpenWindow,
  type ServiceType,
  type WindowSlot,
} from "../lib/shop";
import { supabase } from "../lib/supabase";
import { fieldClassName, primaryButtonClassName } from "../lib/ui";
import { usePageTitle } from "../lib/usePageTitle";

const SLOTS: WindowSlot[] = ["morning", "afternoon", "after_hours"];

export function BookPage(): JSX.Element {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
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

  usePageTitle("Book a visit");

  useEffect(() => {
    let mounted = true;
    async function load() {
      const from = denverToday();
      const to = addDays(from, 13);
      const [{ data: serviceRows }, { data: windowData, error }] =
        await Promise.all([
          supabase
            .from("service_types")
            .select("*")
            .eq("is_active", true)
            .order("sort_order"),
          supabase.functions.invoke("get-availability", {
            body: { from, to },
          }),
        ]);
      if (!mounted) return;
      const list = (serviceRows ?? []) as ServiceType[];
      setServices(list);
      if (slug) {
        const match = list.find((service) => service.slug === slug);
        if (match) setServiceId(match.id);
      }
      if (!error) {
        setWindows((windowData?.windows ?? []) as OpenWindow[]);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, [slug]);

  const dates = useMemo(() => {
    return [...new Set(windows.map((row) => row.window_date))];
  }, [windows]);

  const slotsForDate = useMemo(() => {
    return windows.filter((row) => row.window_date === windowDate);
  }, [windows, windowDate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!serviceId) {
      toast.error("Pick a service.");
      return;
    }
    if (!windowDate || !windowSlot) {
      toast.error("Pick a day and a window.");
      return;
    }
    if (!name.trim() || !phone.trim() || !email.trim()) {
      toast.error("Name, phone, and email are required.");
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke("create-booking", {
      body: {
        service_type_id: serviceId,
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
      toast.error(data?.error || "That window is no longer open. Pick another.");
      return;
    }

    const params = new URLSearchParams({
      type: "booking",
      id: data.booking_id,
    });
    if (data.manage_token) params.set("token", data.manage_token);
    navigate(`/confirmation?${params.toString()}`);
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-8 lg:py-16">
      <h1 className="[font-family:'Gabarito',Helvetica] text-[34px] font-extrabold text-[#142033] sm:text-[44px]">
        Book a visit
      </h1>
      <p className="mt-3 [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700">
        Pick a service and an arrival window. No account. We email you a
        private link to move or cancel it.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-8" noValidate>
        <fieldset>
          <legend className="[font-family:'Gabarito',Helvetica] text-xl font-bold text-[#142033]">
            1. Service
          </legend>
          <div className="mt-3 grid gap-2">
            {services.map((service) => (
              <label
                key={service.id}
                className={`flex min-h-11 cursor-pointer items-center rounded-md border px-3 py-2 text-sm ${
                  serviceId === service.id
                    ? "border-[#2a7a78] bg-[#2a7a78]/5 font-semibold text-[#142033]"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="service"
                  className="sr-only"
                  checked={serviceId === service.id}
                  onChange={() => setServiceId(service.id)}
                />
                {service.title}
                {service.is_emergency ? (
                  <span className="ml-2 rounded-md bg-[#142033] px-2 py-0.5 text-xs text-[#c9a04a]">
                    After-hours
                  </span>
                ) : null}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="[font-family:'Gabarito',Helvetica] text-xl font-bold text-[#142033]">
            2. Day and window
          </legend>
          {dates.length === 0 ? (
            <p className="mt-3 text-sm text-slate-600">
              No open windows in the next two weeks. Call the shop.
            </p>
          ) : (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
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
          )}
          {windowDate ? (
            <div className="mt-3 flex flex-col gap-2">
              {SLOTS.map((slot) => {
                const open = slotsForDate.find((row) => row.slot === slot);
                if (!open) return null;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setWindowSlot(slot)}
                    className={`flex h-11 items-center justify-between rounded-md px-4 text-sm font-semibold ${
                      slot === "after_hours"
                        ? windowSlot === slot
                          ? "bg-[#142033] text-[#c9a04a]"
                          : "bg-[#142033] text-white"
                        : windowSlot === slot
                          ? "bg-[#2a7a78] text-white"
                          : "border border-slate-300 text-[#142033]"
                    }`}
                  >
                    <span>{slotLabel(slot)}</span>
                    <span className="text-xs font-medium opacity-80">
                      {open.remaining} left
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}
        </fieldset>

        <fieldset className="grid gap-4">
          <legend className="[font-family:'Gabarito',Helvetica] text-xl font-bold text-[#142033]">
            3. Your info
          </legend>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#142033]">
            Name <span className="text-red-600">*</span>
            <input
              className={fieldClassName}
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#142033]">
            Phone <span className="text-red-600">*</span>
            <input
              className={fieldClassName}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={business.phoneDisplay}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#142033]">
            Email <span className="text-red-600">*</span>
            <input
              className={fieldClassName}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              autoComplete="email"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#142033]">
            City
            <input
              className={fieldClassName}
              value={city}
              onChange={(event) => setCity(event.target.value)}
              autoComplete="address-level2"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#142033]">
            Address
            <input
              className={fieldClassName}
              value={addressLine}
              onChange={(event) => setAddressLine(event.target.value)}
              autoComplete="street-address"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#142033]">
            What's going on
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              className="min-h-[96px] rounded-md border border-slate-300 px-3 py-2 text-sm font-normal text-[#142033] outline-none focus-visible:border-[#2a7a78] focus-visible:ring-2 focus-visible:ring-[#2a7a78]"
            />
          </label>
        </fieldset>

        <button
          type="submit"
          disabled={submitting}
          className={primaryButtonClassName}
        >
          {submitting ? "Booking…" : "Book this window"}
        </button>
      </form>
    </section>
  );
}
