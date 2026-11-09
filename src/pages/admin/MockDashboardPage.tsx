import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import { HoverMark, HoverTip, hoverLiftClass, visitStatusTip } from "../../components/admin/HoverTip";
import { NoMatches, PageHeading, SkeletonBlock, useMockReady } from "../../components/admin/MockBits";
import {
  countOfficeCards,
  inOfficeRange,
  localDateString,
  matchesQuery,
  mockClients,
  mockServices,
  type MockActivityKind,
  type OfficeContext,
  type OfficeDateRange,
} from "../../lib/adminMock";
import { usePageTitle } from "../../lib/usePageTitle";

const ranges: Array<{ id: OfficeDateRange; label: string }> = [
  { id: "all", label: "All visits" },
  { id: "today", label: "Today" },
  { id: "week", label: "This week" },
  { id: "month", label: "This month" },
];

const activityFilters: Array<{ id: "all" | MockActivityKind; label: string }> = [
  { id: "admin", label: "Admin actions" },
  { id: "client", label: "Client bookings" },
  { id: "all", label: "All activity" },
];

const cardHelp = {
  revenue: "Confirmed visits only.",
  clients: "Different customers on these visits.",
  jobs: "Visits still ahead, not finished or cancelled.",
  pending: "Visits the office marked pending.",
} as const;

export function MockDashboardPage(): JSX.Element {
  usePageTitle("Dashboard");
  const { query, bookings: officeBookings, activity: officeActivity } = useOutletContext<OfficeContext>();
  const ready = useMockReady();
  const [range, setRange] = useState<OfficeDateRange>("all");
  const [activityKind, setActivityKind] = useState<"all" | MockActivityKind>("admin");
  const today = localDateString(new Date());
  const summary = countOfficeCards(officeBookings, range, today);
  const bookings = officeBookings.filter(
    (row) =>
      inOfficeRange(row.date, range, today) &&
      matchesQuery(query, row.client, row.service, row.status, row.when, row.window),
  );
  const activity = officeActivity.filter(
    (row) =>
      inOfficeRange(row.date, range, today) &&
      (activityKind === "all" || row.kind === activityKind) &&
      matchesQuery(query, row.title, row.detail, row.kind === "admin" ? "admin" : "client booking"),
  );
  const serviceHits = mockServices.filter((row) =>
    matchesQuery(query, row.name, row.category, row.summary),
  );
  const clientHits = mockClients.filter((row) =>
    matchesQuery(query, row.name, row.city, row.phone, row.role),
  );
  const searching = query.trim().length > 0;
  const nothing =
    searching &&
    bookings.length === 0 &&
    activity.length === 0 &&
    serviceHits.length === 0 &&
    clientHits.length === 0;

  return (
    <section className="w-full" aria-busy={!ready}>
      <PageHeading
        title="Dashboard"
        body="A wide view of the office. The cards count the same visits as Bookings, so a confirm, pending, or cancel shows up here."
      />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <QuickLink to="/admin/services" label="Services" />
          <QuickLink to="/admin/clients" label="Team" />
          <QuickLink to="/admin/bookings" label="Bookings" />
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Date range">
          {ranges.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={range === item.id}
              onClick={() => setRange(item.id)}
              className={`h-9 rounded-full px-3 [font-family:'Geist',Helvetica] text-sm font-semibold ${
                range === item.id ? "bg-[#142033] text-white" : "border border-slate-200 bg-white text-[#142033]"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            className="h-11 rounded-md bg-[#142033] px-4 [font-family:'Geist',Helvetica] text-sm font-semibold text-white"
            onClick={() => toast("Sample only. A booking was not created.")}
          >
            New booking
          </button>
        </div>
      </div>

      {!ready ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <SkeletonBlock key={index} className="h-28" />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 overflow-visible sm:grid-cols-2 xl:grid-cols-4">
          <Stat label="Revenue" value={summary.revenue} tip={cardHelp.revenue} />
          <Stat label="New clients" value={summary.clients} tip={cardHelp.clients} />
          <Stat label="Active jobs" value={summary.jobs} tip={cardHelp.jobs} />
          <Stat label="Pending" value={summary.pending} tip={cardHelp.pending} />
        </div>
      )}

      {!ready ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <SkeletonBlock className="h-72" />
          <SkeletonBlock className="h-72" />
        </div>
      ) : nothing ? (
        <div className="mt-4">
          <NoMatches query={query} />
        </div>
      ) : (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {bookings.length > 0 && (
            <Panel title="Recent bookings">
              <ul className="space-y-2 overflow-visible">
                {bookings.map((row) => (
                  <li
                    key={row.id}
                    className={`${hoverLiftClass} flex items-center justify-between gap-3 rounded-lg px-3 py-3`}
                  >
                    <HoverTip text={visitStatusTip(row.status)} />
                    <div>
                      <p className="flex items-center gap-1.5 [font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]">
                        {row.client}
                        <HoverMark />
                      </p>
                      <p className="[font-family:'Geist',Helvetica] text-xs text-slate-500">
                        {row.service} · {row.when} {row.window.toLowerCase()}
                      </p>
                    </div>
                    <StatusPill status={row.status} />
                  </li>
                ))}
              </ul>
            </Panel>
          )}
          <Panel
            title="Recent activity"
            extra={
              <div className="flex flex-wrap gap-1" role="group" aria-label="Activity type">
                {activityFilters.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={activityKind === item.id}
                    onClick={() => setActivityKind(item.id)}
                    className={`h-7 rounded-full px-2 [font-family:'Geist',Helvetica] text-xs font-semibold ${
                      activityKind === item.id
                        ? "bg-[#142033] text-white"
                        : "border border-slate-200 text-[#142033]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            }
          >
            {activity.length === 0 ? (
              <p className="py-6 [font-family:'Geist',Helvetica] text-sm text-slate-500">
                Nothing in this view. Admin actions are confirms, pending marks, cancellations, and service changes. Client bookings are requests that came in from the site.
              </p>
            ) : (
              <ul className="space-y-2 overflow-visible">
                {activity.map((row) => (
                  <li key={row.id} className={`${hoverLiftClass} rounded-lg px-3 py-3`}>
                    <HoverTip
                      text={
                        row.kind === "admin"
                          ? "Office action: confirm, pending, cancel, or a service change."
                          : "A request that came in from the website."
                      }
                    />
                    <div className="flex items-center justify-between gap-3">
                      <p className="flex items-center gap-1.5 [font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]">
                        {row.title}
                        <HoverMark />
                      </p>
                      <span
                        className={`rounded-full px-2 py-1 [font-family:'Geist',Helvetica] text-[10px] font-semibold uppercase tracking-wide ${
                          row.kind === "admin"
                            ? "bg-[#142033] text-white"
                            : "bg-[#c9a04a]/20 text-[#8a6a2f]"
                        }`}
                      >
                        {row.kind === "admin" ? "Admin" : "Client"}
                      </span>
                    </div>
                    <p className="[font-family:'Geist',Helvetica] text-xs leading-5 text-slate-500">
                      {row.detail} · {row.when}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          {searching && (serviceHits.length > 0 || clientHits.length > 0) && (
            <Panel title="Also in the catalog">
              <ul className="space-y-2">
                {serviceHits.map((row) => (
                  <li key={row.id}>
                    <Link
                      to="/admin/services"
                      className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78]"
                    >
                      {row.name}
                    </Link>
                    <p className="[font-family:'Geist',Helvetica] text-xs text-slate-500">{row.category}</p>
                  </li>
                ))}
                {clientHits.map((row) => (
                  <li key={row.id}>
                    <Link
                      to="/admin/clients"
                      className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78]"
                    >
                      {row.name}
                    </Link>
                    <p className="[font-family:'Geist',Helvetica] text-xs text-slate-500">
                      {row.city} · {row.role}
                    </p>
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </div>
      )}
    </section>
  );
}

function QuickLink({ to, label }: { to: string; label: string }): JSX.Element {
  return (
    <Link
      to={to}
      className="inline-flex h-9 items-center rounded-full border border-slate-200 bg-white px-3 [font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033] hover:border-[#2a7a78]"
    >
      {label}
    </Link>
  );
}

function Stat({ label, value, tip }: { label: string; value: string; tip: string }): JSX.Element {
  return (
    <article className={`${hoverLiftClass} rounded-xl p-5`}>
      <HoverTip text={tip} />
      <div className="flex items-center gap-1.5">
        <p className="[font-family:'Geist',Helvetica] text-xs font-medium text-slate-500 transition group-hover/hover:text-[#2a7a78]">
          {label}
        </p>
        <HoverMark />
      </div>
      <p className="mt-2 [font-family:'Gabarito',Helvetica] text-3xl font-extrabold text-[#142033]">{value}</p>
      <p className="mt-2 [font-family:'Geist',Helvetica] text-xs text-slate-500">{tip}</p>
    </article>
  );
}

function Panel({
  title,
  extra,
  children,
}: {
  title: string;
  extra?: JSX.Element;
  children: JSX.Element;
}): JSX.Element {
  return (
    <section className="overflow-visible rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="[font-family:'Gabarito',Helvetica] text-base font-extrabold text-[#142033]">{title}</h2>
        {extra}
      </div>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function StatusPill({ status }: { status: string }): JSX.Element {
  const tone =
    status === "Confirmed" || status === "Done"
      ? "bg-[#2a7a78]/10 text-[#2a7a78]"
      : status === "Requested" || status === "Pending"
        ? "bg-[#c9a04a]/20 text-[#8a6a2f]"
        : "bg-slate-100 text-slate-600";
  return (
    <span className={`rounded-full px-2 py-1 [font-family:'Geist',Helvetica] text-xs font-semibold ${tone}`}>
      {status}
    </span>
  );
}
