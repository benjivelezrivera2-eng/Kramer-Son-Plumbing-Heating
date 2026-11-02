import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ConfirmModal } from "../components/ConfirmModal";
import { business } from "../config/business";
import { formatWindowDate, slotLabel } from "../lib/shop";
import { supabase } from "../lib/supabase";
import { fieldClassName, primaryButtonClassName, secondaryButtonClassName } from "../lib/ui";
import { usePageTitle } from "../lib/usePageTitle";

type Visit = {
  id: string;
  status: string;
  window_date: string;
  window_slot: string;
  cancel_reason?: string | null;
  service_title: string;
};

export function ManageBookingPage(): JSX.Element {
  const { token } = useParams<{ token: string }>();
  const [visit, setVisit] = useState<Visit | null>(null);
  const [missing, setMissing] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [reason, setReason] = useState("");

  usePageTitle("Manage visit");

  useEffect(() => {
    if (!token) return;
    let mounted = true;
    supabase.functions
      .invoke("manage-booking", { body: { token, action: "get" } })
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error || !data?.booking) {
          setMissing(true);
          return;
        }
        setVisit(data.booking as Visit);
      });
    return () => {
      mounted = false;
    };
  }, [token]);

  async function cancelVisit() {
    if (!reason.trim()) {
      toast.error("Add a short reason.");
      return;
    }
    const { data, error } = await supabase.functions.invoke("manage-booking", {
      body: { token, action: "cancel", reason: reason.trim() },
    });
    if (error || !data?.booking) {
      toast.error(data?.error || "Could not cancel that visit.");
      return;
    }
    setVisit(data.booking as Visit);
    setCancelOpen(false);
    toast.success("Visit cancelled.");
  }

  if (missing) {
    return (
      <section className="mx-auto w-full max-w-xl px-4 py-16">
        <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
          Link not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          This manage link is not valid. It does not show anyone else's visit.
          Call the shop if you need help.
        </p>
        <a href={business.phoneHref} className={`mt-6 ${primaryButtonClassName}`}>
          Call {business.phoneDisplay}
        </a>
      </section>
    );
  }

  if (!visit) {
    return (
      <p className="px-4 py-16 text-sm text-slate-600">Loading your visit…</p>
    );
  }

  const cancelled = visit.status === "cancelled";

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-16">
      <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
        Your visit
      </h1>
      <div className="mt-6 rounded-md border border-slate-200 bg-white p-6">
        <p className="text-lg font-bold text-[#142033]">{visit.service_title}</p>
        <p className="mt-2 text-sm text-slate-700">
          {formatWindowDate(visit.window_date)} · {slotLabel(visit.window_slot)}
        </p>
        <p className="mt-2 text-sm text-slate-500">
          {cancelled ? "Cancelled" : "Confirmed"} · No account needed
        </p>
        {visit.cancel_reason ? (
          <p className="mt-3 text-sm text-slate-700">
            Reason: {visit.cancel_reason}
          </p>
        ) : null}
      </div>
      <p className="mt-4 text-sm text-slate-600">
        Shop phone: {business.phoneDisplay}
      </p>
      {!cancelled ? (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to={`/b/${token}/reschedule`}
            className={primaryButtonClassName}
          >
            Reschedule
          </Link>
          <button
            type="button"
            onClick={() => setCancelOpen(true)}
            className={secondaryButtonClassName}
          >
            Cancel visit
          </button>
        </div>
      ) : null}

      {cancelOpen ? (
        <ConfirmModal
          title="Cancel this visit?"
          confirmLabel="Cancel visit"
          danger
          onCancel={() => setCancelOpen(false)}
          onConfirm={() => void cancelVisit()}
        >
          <label htmlFor="cancel-reason" className="mb-1.5 block font-semibold text-[#142033]">
            Why are you cancelling?
          </label>
          <input
            id="cancel-reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className={fieldClassName}
            placeholder="Schedule changed, already fixed…"
          />
        </ConfirmModal>
      ) : null}
    </section>
  );
}
