import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  addDays,
  denverToday,
  formatWindowDate,
  slotLabel,
  type OpenWindow,
  type WindowSlot,
} from "../lib/shop";
import { supabase } from "../lib/supabase";
import { primaryButtonClassName } from "../lib/ui";
import { usePageTitle } from "../lib/usePageTitle";

const SLOTS: WindowSlot[] = ["morning", "afternoon", "after_hours"];

export function RescheduleBookingPage(): JSX.Element {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [windowDate, setWindowDate] = useState("");
  const [windowSlot, setWindowSlot] = useState<WindowSlot | "">("");
  const [submitting, setSubmitting] = useState(false);

  usePageTitle("Reschedule visit");

  useEffect(() => {
    const from = denverToday();
    const to = addDays(from, 13);
    void supabase.functions
      .invoke("get-availability", { body: { from, to } })
      .then(({ data }) => {
        setWindows((data?.windows ?? []) as OpenWindow[]);
      });
  }, []);

  const dates = useMemo(
    () => [...new Set(windows.map((row) => row.window_date))],
    [windows],
  );
  const slotsForDate = windows.filter((row) => row.window_date === windowDate);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!windowDate || !windowSlot) {
      toast.error("Pick a day and a window.");
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke("manage-booking", {
      body: {
        token,
        action: "reschedule",
        window_date: windowDate,
        window_slot: windowSlot,
      },
    });
    setSubmitting(false);
    if (error || !data?.booking) {
      toast.error(data?.error || "That window is no longer open.");
      return;
    }
    toast.success("Visit moved.");
    navigate(`/b/${token}`);
  }

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-16">
      <Link to={`/b/${token}`} className="text-sm font-semibold text-[#2a7a78]">
        Back to visit
      </Link>
      <h1 className="mt-4 [font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
        Reschedule
      </h1>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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
        {windowDate ? (
          <div className="flex flex-col gap-2">
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
                  <span className="text-xs opacity-80">{open.remaining} left</span>
                </button>
              );
            })}
          </div>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className={primaryButtonClassName}
        >
          {submitting ? "Saving…" : "Save new window"}
        </button>
      </form>
    </section>
  );
}
