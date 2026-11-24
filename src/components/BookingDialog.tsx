import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { business } from "../config/business";
import {
  categoryJobs,
  primaryJobTitle,
  type ServiceCategory,
} from "../lib/publicServices";
import { fieldClassName, primaryButtonClassName, secondaryButtonClassName } from "../lib/ui";
import { sendVisitEmails } from "../lib/visitEmail";

export type OpenBookingOptions = {
  service?: string;
  categoryTitle?: string;
  mode?: "book" | "learn";
};

export const expectedTech = "A Kramer & Son tech";

export type VisitWindow = "" | "Morning" | "Afternoon";

export type BookingDraft = {
  name: string;
  phone: string;
  address: string;
  service: string;
  day: string;
  window: VisitWindow;
};

type DayOption = { value: string; label: string };

const problems = [
  { label: "Drain or clog", service: "Drain Cleaning" },
  { label: "Leak or water damage", service: "Leak Detection" },
  { label: "No heat", service: "Furnace & Heating Repair" },
  { label: "Something else", service: "" },
] as const;

export function emptyBooking(service = ""): BookingDraft {
  return {
    name: "",
    phone: "",
    address: "",
    service,
    day: "",
    window: "",
  };
}

export function visitDayOptions(today = new Date()): DayOption[] {
  const options: DayOption[] = [];
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  while (options.length < 6) {
    const weekday = cursor.getDay();
    if (weekday !== 0 && weekday !== 6) {
      const value = [
        cursor.getFullYear(),
        String(cursor.getMonth() + 1).padStart(2, "0"),
        String(cursor.getDate()).padStart(2, "0"),
      ].join("-");
      options.push({
        value,
        label: cursor.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return options;
}

export function dayLabel(value: string, options: DayOption[]): string {
  return options.find((day) => day.value === value)?.label ?? value;
}

const fieldOrder: (keyof BookingDraft)[] = [
  "name",
  "phone",
  "address",
  "service",
  "day",
  "window",
];

function problemsFor(draft: BookingDraft): Record<keyof BookingDraft, string> {
  const digits = draft.phone.replace(/\D/g, "");
  return {
    name: draft.name.trim() ? "" : "Enter your name.",
    phone: digits.length >= 10 ? "" : "Enter a phone number we can call.",
    address: draft.address.trim() ? "" : "Enter the street address.",
    service: draft.service ? "" : "Choose a service.",
    day: draft.day ? "" : "Choose a day.",
    window: draft.window ? "" : "Choose morning or afternoon.",
  };
}

export function BookingForm({
  initialService = "",
  idPrefix,
  onConfirm,
  onCancel,
  focusName = false,
}: {
  initialService?: string;
  idPrefix: string;
  onConfirm: (draft: BookingDraft) => void;
  onCancel?: () => void;
  focusName?: boolean;
}): JSX.Element {
  const nameRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState<BookingDraft>(() => emptyBooking(initialService));
  const [tried, setTried] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof BookingDraft, boolean>>>({});
  const days = useMemo(() => visitDayOptions(), []);
  const fieldProblems = problemsFor(draft);

  useEffect(() => {
    setDraft(emptyBooking(initialService));
    setTried(false);
    setTouched({});
  }, [initialService]);

  useEffect(() => {
    if (focusName) nameRef.current?.focus();
  }, [focusName]);

  function update<K extends keyof BookingDraft>(key: K, value: BookingDraft[K]): void {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function touch(key: keyof BookingDraft): void {
    setTouched((current) => ({ ...current, [key]: true }));
  }

  function shown(key: keyof BookingDraft): string {
    return tried || touched[key] ? fieldProblems[key] : "";
  }

  function submit(event: FormEvent): void {
    event.preventDefault();
    setTried(true);
    const first = fieldOrder.find((key) => fieldProblems[key]);
    if (first) {
      document.getElementById(`${idPrefix}-${first}`)?.focus();
      return;
    }
    const visit = {
      ...draft,
      name: draft.name.trim(),
      phone: draft.phone.trim(),
      address: draft.address.trim(),
    };
    sendVisitEmails(visit);
    onConfirm(visit);
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
      <Field label="Name" error={shown("name")} htmlFor={`${idPrefix}-name`}>
        <input
          ref={nameRef}
          id={`${idPrefix}-name`}
          name="name"
          autoComplete="name"
          value={draft.name}
          onChange={(event) => update("name", event.target.value)}
          onBlur={() => touch("name")}
          className={fieldClassName}
          placeholder="Your name"
        />
      </Field>
      <Field label="Phone" error={shown("phone")} htmlFor={`${idPrefix}-phone`}>
        <input
          id={`${idPrefix}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          value={draft.phone}
          onChange={(event) => update("phone", event.target.value)}
          onBlur={() => touch("phone")}
          className={fieldClassName}
          placeholder="(970) 555-0142"
        />
      </Field>
      <Field
        label="Service address"
        error={shown("address")}
        htmlFor={`${idPrefix}-address`}
      >
        <input
          id={`${idPrefix}-address`}
          name="address"
          autoComplete="street-address"
          value={draft.address}
          onChange={(event) => update("address", event.target.value)}
          onBlur={() => touch("address")}
          className={fieldClassName}
          placeholder="123 Main St, Sterling, CO"
        />
      </Field>
      <Field label="Service" error={shown("service")} htmlFor={`${idPrefix}-service`}>
        <select
          id={`${idPrefix}-service`}
          name="service"
          value={draft.service}
          onChange={(event) => update("service", event.target.value)}
          onBlur={() => touch("service")}
          className={fieldClassName}
        >
          <option value="">Choose a service</option>
          {business.services.map((service) => (
            <option key={service.title} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Day" error={shown("day")} htmlFor={`${idPrefix}-day`}>
          <select
            id={`${idPrefix}-day`}
            name="day"
            value={draft.day}
            onChange={(event) => update("day", event.target.value)}
            onBlur={() => touch("day")}
            className={fieldClassName}
          >
            <option value="">Choose a day</option>
            {days.map((day) => (
              <option key={day.value} value={day.value}>
                {day.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Window" error={shown("window")} htmlFor={`${idPrefix}-window`}>
          <select
            id={`${idPrefix}-window`}
            name="window"
            value={draft.window}
            onChange={(event) => update("window", event.target.value as VisitWindow)}
            onBlur={() => touch("window")}
            className={fieldClassName}
          >
            <option value="">Morning or afternoon</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
          </select>
        </Field>
      </div>
      <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        {onCancel ? (
          <button type="button" onClick={onCancel} className={secondaryButtonClassName}>
            Cancel
          </button>
        ) : null}
        <button type="submit" className={primaryButtonClassName}>
          Book this job
        </button>
      </div>
    </form>
  );
}

export function BookingConfirmation({
  draft,
  onDone,
  onBookAnother,
}: {
  draft: BookingDraft;
  onDone?: () => void;
  onBookAnother?: () => void;
}): JSX.Element {
  const days = useMemo(() => visitDayOptions(), []);
  const doneRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (onBookAnother) doneRef.current?.focus();
  }, [onBookAnother]);

  return (
    <div>
      <p className="[font-family:'Geist',Helvetica] text-xs font-semibold uppercase tracking-wide text-[#2a7a78]">
        Confirmed
      </p>
      <h3 className="mt-2 [font-family:'Gabarito',Helvetica] text-2xl font-extrabold text-[#142033]">
        {draft.service} is booked
      </h3>
      <dl className="mt-4 flex flex-col gap-3 [font-family:'Geist',Helvetica] text-sm">
        <Detail label="When" value={`${dayLabel(draft.day, days)} · ${draft.window}`} />
        <Detail label="Who to expect" value={expectedTech} />
        <Detail label="Name" value={draft.name} />
        <Detail label="Phone" value={draft.phone} />
        <Detail label="Service address" value={draft.address} />
      </dl>
      {onDone || onBookAnother ? (
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {onDone ? (
            <button
              ref={doneRef}
              type="button"
              onClick={onDone}
              className={onBookAnother ? secondaryButtonClassName : primaryButtonClassName}
            >
              Done
            </button>
          ) : null}
          {onBookAnother ? (
            <button type="button" onClick={onBookAnother} className={primaryButtonClassName}>
              Book another visit
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function ProblemStep({
  onPick,
}: {
  onPick: (service: string) => void;
}): JSX.Element {
  return (
    <div className="flex flex-col gap-3">
      <p className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]">
        What&apos;s going on?
      </p>
      <ul className="flex flex-col gap-2">
        {problems.map((item) => (
          <li key={item.label}>
            <button
              type="button"
              onClick={() => onPick(item.service)}
              className="flex h-12 w-full items-center rounded-md border border-slate-300 px-4 text-left text-sm font-semibold text-[#142033] hover:border-[#142033] hover:bg-slate-50"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-2 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
        Need someone sooner?{" "}
        <a href={business.phoneHref} className="font-semibold text-[#142033] underline">
          Call {business.phoneDisplay}
        </a>
      </p>
    </div>
  );
}

function CategoryInfoStep({
  category,
  onBook,
}: {
  category: ServiceCategory;
  onBook: (service: string) => void;
}): JSX.Element {
  const jobs = categoryJobs(category);
  const [selected, setSelected] = useState(primaryJobTitle(category));

  return (
    <div className="flex flex-col gap-5">
      <p className="[font-family:'Geist',Helvetica] text-base leading-7 text-slate-700">
        {category.summary}
      </p>
      <dl className="grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="[font-family:'Geist',Helvetica] text-xs font-semibold uppercase tracking-wide text-[#2a7a78]">
            Signs
          </dt>
          <dd className="mt-1 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-700">
            {category.signs}
          </dd>
        </div>
        <div>
          <dt className="[font-family:'Geist',Helvetica] text-xs font-semibold uppercase tracking-wide text-[#2a7a78]">
            On site
          </dt>
          <dd className="mt-1 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-700">
            {category.onSite}
          </dd>
        </div>
        <div>
          <dt className="[font-family:'Geist',Helvetica] text-xs font-semibold uppercase tracking-wide text-[#2a7a78]">
            Window
          </dt>
          <dd className="mt-1 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-700">
            {category.window}
          </dd>
        </div>
      </dl>
      {jobs.length > 1 ? (
        <div>
          <p className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]">
            Which job?
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {jobs.map((job) => {
              const active = selected === job.title;
              return (
                <li key={job.title}>
                  <button
                    type="button"
                    onClick={() => setSelected(job.title)}
                    className={[
                      "h-10 rounded-md border px-3 text-sm font-semibold",
                      active
                        ? "border-[#142033] bg-[#142033] text-white"
                        : "border-slate-300 text-[#142033] hover:border-[#142033]",
                    ].join(" ")}
                  >
                    {job.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => onBook(selected)}
          className={primaryButtonClassName}
        >
          Book this visit
        </button>
      </div>
      <p className="[font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
        Prefer the phone?{" "}
        <a href={business.phoneHref} className="font-semibold text-[#142033] underline">
          Call {business.phoneDisplay}
        </a>
      </p>
    </div>
  );
}

export function BookingDialog({
  initialService = "",
  initialCategoryTitle = "",
  initialMode = "book",
  onClose,
}: {
  initialService?: string;
  initialCategoryTitle?: string;
  initialMode?: "book" | "learn";
  onClose: () => void;
}): JSX.Element {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const category = business.serviceCategories.find(
    (item) => item.title === initialCategoryTitle,
  );
  const [service, setService] = useState(initialService);
  const [showInfo, setShowInfo] = useState(
    initialMode === "learn" && Boolean(category),
  );
  const [pickedProblem, setPickedProblem] = useState(
    Boolean(initialService) || (initialMode === "learn" && Boolean(category)),
  );
  const [booked, setBooked] = useState<BookingDraft | null>(null);
  const needsProblem = !showInfo && !service && !pickedProblem;

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtml = html.style.overflow;
    const previousBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = previousHtml;
      body.style.overflow = previousBody;
    };
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const target = booked
      ? panel.querySelector<HTMLElement>("button")
      : showInfo || needsProblem
        ? panel.querySelector<HTMLButtonElement>("button")
        : panel.querySelector<HTMLInputElement>('input[name="name"]');
    target?.focus();
  }, [booked, needsProblem, showInfo]);

  useEffect(() => {
    function onKey(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = [
        ...panel.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), input, select, textarea",
        ),
      ].filter((item) => !item.hasAttribute("disabled") && item.tabIndex !== -1);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!panel.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const heading = booked
    ? "Your visit is booked"
    : showInfo && category
      ? category.title
      : "Book a visit";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#142033]/40 p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-md border border-slate-200 bg-white p-6 shadow-xl"
      >
        <h2
          id={titleId}
          className="[font-family:'Gabarito',Helvetica] text-2xl font-extrabold text-[#142033]"
        >
          {heading}
        </h2>
        {booked || showInfo ? null : (
          <p className="mt-2 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
            The days listed are weekdays. Kramer &amp; Son is the Sterling shop, covering{" "}
            {business.proposalNote}.{" "}
            <a href={business.phoneHref} className="font-semibold text-[#142033] underline">
              Call {business.phoneDisplay}
            </a>{" "}
            if it is a leak, a clog, or no heat.
          </p>
        )}
        <div className="mt-4">
          {booked ? (
            <BookingConfirmation
              draft={booked}
              onDone={onClose}
              onBookAnother={() => {
                setBooked(null);
                setService("");
                setShowInfo(false);
                setPickedProblem(false);
              }}
            />
          ) : showInfo && category ? (
            <CategoryInfoStep
              category={category}
              onBook={(next) => {
                setService(next);
                setShowInfo(false);
                setPickedProblem(true);
              }}
            />
          ) : needsProblem ? (
            <ProblemStep
              onPick={(next) => {
                setService(next);
                setPickedProblem(true);
              }}
            />
          ) : (
            <BookingForm
              initialService={service}
              idPrefix="book-dialog"
              onConfirm={setBooked}
              onCancel={onClose}
              focusName
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error: string;
  htmlFor: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]"
      >
        {label}
      </label>
      {children}
      <span aria-live="polite" className="text-xs text-red-600">
        {error}
      </span>
    </div>
  );
}

type OpenBookingFn = (next?: string | OpenBookingOptions) => void;

const OpenBookingContext = createContext<OpenBookingFn>(() => {});

export function useOpenBooking(): OpenBookingFn {
  return useContext(OpenBookingContext);
}

function normalizeOpenOptions(next?: string | OpenBookingOptions): OpenBookingOptions {
  if (typeof next === "string") return { service: next, mode: "book" };
  return {
    service: next?.service ?? "",
    categoryTitle: next?.categoryTitle ?? "",
    mode: next?.mode ?? "book",
  };
}

export function BookingProvider({ children }: { children: ReactNode }): JSX.Element {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<OpenBookingOptions>({ mode: "book" });
  const [ticket, setTicket] = useState(0);

  const openBooking = useCallback<OpenBookingFn>((next) => {
    setOptions(normalizeOpenOptions(next));
    setTicket((current) => current + 1);
    setOpen(true);
  }, []);

  return (
    <OpenBookingContext.Provider value={openBooking}>
      {children}
      {open ? (
        <BookingDialog
          key={ticket}
          initialService={options.service}
          initialCategoryTitle={options.categoryTitle}
          initialMode={options.mode}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </OpenBookingContext.Provider>
  );
}

function Detail({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div>
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-[#142033]">{value}</dd>
    </div>
  );
}
