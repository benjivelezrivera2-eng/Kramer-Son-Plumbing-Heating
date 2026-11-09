import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { NoMatches, PageHeading, SkeletonRows, useMockReady } from "../../components/admin/MockBits";
import {
  inOfficeRange,
  localDateString,
  matchesQuery,
  mockServices,
  visitPrice,
  type MockBooking,
  type MockBookingStatus,
  type OfficeContext,
} from "../../lib/adminMock";
import { usePageTitle } from "../../lib/usePageTitle";

const statuses = ["All statuses", "Requested", "Confirmed", "Done", "Pending", "Cancelled"] as const;
type StatusFilter = (typeof statuses)[number];

const dateChoices = [
  { id: "all", label: "All" },
  { id: "today", label: "Today" },
  { id: "week", label: "This week" },
  { id: "month", label: "This month" },
  { id: "custom", label: "Custom" },
] as const;
type DateChoice = (typeof dateChoices)[number]["id"];

function money(amount: number): string {
  return `$${amount}`;
}

function statusTone(status: MockBookingStatus): string {
  if (status === "Confirmed" || status === "Done") return "bg-[#2a7a78]/10 text-[#2a7a78]";
  if (status === "Requested" || status === "Pending") return "bg-[#c9a04a]/20 text-[#8a6a2f]";
  return "bg-slate-100 text-slate-600";
}

type SortKey = "client" | "service" | "date" | "price" | "status";

const sortColumns: Array<{ key: SortKey; label: string; align: "left" | "right" }> = [
  { key: "client", label: "Client", align: "left" },
  { key: "service", label: "Service", align: "left" },
  { key: "date", label: "Date", align: "left" },
  { key: "price", label: "Price", align: "right" },
  { key: "status", label: "Status", align: "right" },
];

const statusOrder: MockBookingStatus[] = ["Requested", "Pending", "Confirmed", "Done", "Cancelled"];

function compareBookings(a: MockBooking, b: MockBooking, key: SortKey): number {
  if (key === "client") return a.client.localeCompare(b.client);
  if (key === "service") return a.service.localeCompare(b.service);
  if (key === "date") return a.date.localeCompare(b.date) || a.window.localeCompare(b.window);
  if (key === "status") return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  const aPrice = visitPrice(a).amount;
  const bPrice = visitPrice(b).amount;
  if (aPrice == null && bPrice == null) return 0;
  if (aPrice == null) return 1;
  if (bPrice == null) return -1;
  return aPrice - bPrice;
}

export function MockBookingsPage(): JSX.Element {
  usePageTitle("Bookings");
  const { query, bookings, setVisitStatus, setVisitService } = useOutletContext<OfficeContext>();
  const ready = useMockReady();
  const [status, setStatus] = useState<StatusFilter>("All statuses");
  const [service, setService] = useState("All services");
  const [dateChoice, setDateChoice] = useState<DateChoice>("all");
  const [from, setFrom] = useState("2026-11-10");
  const [to, setTo] = useState("2026-11-13");
  const [openId, setOpenId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const today = localDateString(new Date());
  const services = useMemo(
    () => ["All services", ...Array.from(new Set(bookings.map((row) => row.service)))],
    [bookings],
  );
  const open = bookings.find((row) => row.id === openId) ?? null;

  useEffect(() => {
    if (!openId) return;
    function onKey(event: KeyboardEvent): void {
      if (event.key === "Escape") setOpenId(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  const visible = bookings.filter((row) => {
    const price = visitPrice(row);
    const matchesSearch = matchesQuery(
      query,
      row.client,
      row.service,
      row.status,
      row.when,
      row.window,
      price.amount?.toString(),
    );
    const matchesStatus = status === "All statuses" || row.status === status;
    const matchesService = service === "All services" || row.service === service;
    const matchesDate = inOfficeRange(row.date, dateChoice, today, from, to);
    return matchesSearch && matchesStatus && matchesService && matchesDate;
  });
  const shown = [...visible].sort(
    (a, b) => compareBookings(a, b, sortKey) * (sortDir === "asc" ? 1 : -1),
  );

  function chooseSort(key: SortKey): void {
    if (key === sortKey) {
      setSortDir((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir("asc");
  }

  return (
    <section aria-busy={!ready}>
      <PageHeading
        title="Bookings"
        body="Sample visits. Filter the list, click a heading to sort it, or open a row to confirm it, mark it pending, cancel it, or correct the service. The dashboard counts these same visits."
      />
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <FilterSelect
          label="Status"
          value={status}
          options={statuses}
          onChange={(value) => setStatus(value as StatusFilter)}
        />
        <FilterSelect label="Service" value={service} options={services} onChange={setService} />
        {dateChoices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => setDateChoice(choice.id)}
            className={`h-9 rounded-full px-3 [font-family:'Geist',Helvetica] text-sm font-semibold ${
              dateChoice === choice.id ? "bg-[#142033] text-white" : "border border-slate-200 bg-white text-[#142033]"
            }`}
          >
            {choice.label}
          </button>
        ))}
      </div>
      {dateChoice === "custom" ? (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <DateField label="From" value={from} onChange={setFrom} />
          <DateField label="To" value={to} onChange={setTo} />
        </div>
      ) : null}
      <div className="mt-4">
        {!ready ? (
          <SkeletonRows />
        ) : visible.length === 0 ? (
          <NoMatches query={query || `${status}, ${service}`} />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left">
              <thead className="bg-slate-50">
                <tr>
                  {sortColumns.map((column) => {
                    const active = column.key === sortKey;
                    return (
                      <th
                        key={column.key}
                        aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                        className={`border-b border-slate-200 px-4 py-3 ${column.align === "right" ? "text-right" : "text-left"}`}
                      >
                        <button
                          type="button"
                          onClick={() => chooseSort(column.key)}
                          className={`[font-family:'Geist',Helvetica] text-xs font-semibold tracking-wide text-slate-500 ${
                            column.align === "right" ? "ml-auto" : ""
                          } ${active ? "text-[#142033] underline decoration-[#c9a04a] decoration-2 underline-offset-8" : "hover:text-[#142033]"}`}
                        >
                          {column.label}
                          {active ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {shown.map((row) => {
                  const price = visitPrice(row);
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setOpenId(row.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setOpenId(row.id);
                        }
                      }}
                      tabIndex={0}
                      className="cursor-pointer border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >
                      <td className="border-b border-slate-100 px-4 py-4">
                        <p className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]">{row.client}</p>
                      </td>
                      <td className="border-b border-slate-100 px-4 py-4">
                        <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 [font-family:'Geist',Helvetica] text-xs font-semibold text-[#142033]">
                          {row.service}
                        </span>
                      </td>
                      <td className="border-b border-slate-100 px-4 py-4">
                        <p className="[font-family:'Geist',Helvetica] text-sm text-[#142033]">{row.when}</p>
                        <p className="mt-1 [font-family:'Geist',Helvetica] text-xs text-slate-500">{row.window}</p>
                      </td>
                      <td className="border-b border-slate-100 px-4 py-4 text-right [font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]">
                        {price.amount != null ? money(price.amount) : "—"}
                      </td>
                      <td className="border-b border-slate-100 px-4 py-4 text-right">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 [font-family:'Geist',Helvetica] text-xs font-semibold ${statusTone(row.status)}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {open ? (
        <VisitDialog
          visit={open}
          onClose={() => setOpenId(null)}
          onStatus={(next) => setVisitStatus(open.id, next)}
          onService={(next) => setVisitService(open.id, next)}
        />
      ) : null}
    </section>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}): JSX.Element {
  return (
    <label className="flex items-center gap-2 [font-family:'Geist',Helvetica] text-xs font-medium text-slate-500">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm text-[#142033]"
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}): JSX.Element {
  return (
    <label className="flex items-center gap-2 [font-family:'Geist',Helvetica] text-xs font-medium text-slate-500">
      {label}
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm text-[#142033]"
      />
    </label>
  );
}

function VisitDialog({
  visit,
  onClose,
  onStatus,
  onService,
}: {
  visit: MockBooking;
  onClose: () => void;
  onStatus: (status: MockBookingStatus) => void;
  onService: (service: string) => void;
}): JSX.Element {
  const price = visitPrice(visit);
  const priceNote =
    price.source === "visit"
      ? "This visit has its own price."
      : price.source === "service"
        ? "No visit price, so this is the service starting price."
        : "This visit has no price.";
  const actions: MockBookingStatus[] = ["Confirmed", "Pending", "Cancelled"];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#142033]/40 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="visit-title"
        className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="visit-title" className="[font-family:'Gabarito',Helvetica] text-xl font-extrabold text-[#142033]">
              {visit.client}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="[font-family:'Geist',Helvetica] text-sm font-semibold text-slate-500"
          >
            Close
          </button>
        </div>
        <label className="mt-4 block [font-family:'Geist',Helvetica] text-sm text-slate-600">
          Service
          <select
            value={visit.service}
            aria-label="Service"
            onChange={(event) => onService(event.target.value)}
            className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-white px-2 font-semibold text-[#142033]"
          >
            {mockServices.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </label>
        <p className="mt-2 [font-family:'Geist',Helvetica] text-xs text-slate-500">
          Changing the service clears this visit's own price and uses the new service's starting price.
        </p>
        <dl className="mt-4 space-y-2 [font-family:'Geist',Helvetica] text-sm text-slate-600">
          <div className="flex justify-between gap-3">
            <dt>When</dt>
            <dd className="font-semibold text-[#142033]">
              {visit.when} · {visit.window}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>Price</dt>
            <dd className="font-semibold text-[#142033]">{price.amount != null ? money(price.amount) : "—"}</dd>
          </div>
        </dl>
        <p className="mt-2 [font-family:'Geist',Helvetica] text-xs text-slate-500">{priceNote}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {actions.map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => onStatus(action)}
              className={`h-9 rounded-full px-3 [font-family:'Geist',Helvetica] text-sm font-semibold ${
                visit.status === action ? "bg-[#142033] text-white" : "border border-slate-200 text-[#142033]"
              }`}
            >
              {action === "Confirmed" ? "Confirm" : action === "Pending" ? "Mark pending" : "Cancel"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
