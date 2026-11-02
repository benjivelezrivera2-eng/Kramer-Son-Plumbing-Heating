import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ConfirmModal } from "../../components/ConfirmModal";
import { LeadStatusBadge } from "../../components/LeadStatusBadge";
import {
  formatShopTime,
  leadStatuses,
  sourceLabel,
  statusLabel,
  timestampsForStatus,
  type Lead,
  type LeadStatus,
} from "../../lib/leads";
import { supabase } from "../../lib/supabase";
import { usePageTitle } from "../../lib/usePageTitle";

export function AdminLeadDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [lostOpen, setLostOpen] = useState(false);
  const [lostReason, setLostReason] = useState("");
  const [pendingStatus, setPendingStatus] = useState<LeadStatus | null>(null);

  usePageTitle(lead ? lead.name : "Lead");

  useEffect(() => {
    if (!id) return;
    let mounted = true;

    async function load() {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (!mounted) return;
      if (error || !data) setLead(null);
      else setLead(data as Lead);
      setLoading(false);
    }

    void load();
    return () => {
      mounted = false;
    };
  }, [id]);

  async function saveStatus(status: LeadStatus, reason?: string) {
    if (!lead) return;
    const stamps = timestampsForStatus(status);
    const { data, error } = await supabase
      .from("leads")
      .update({
        status,
        lost_reason: status === "lost" ? reason ?? "" : null,
        ...stamps,
      })
      .eq("id", lead.id)
      .select("*")
      .single();
    if (error || !data) {
      toast.error("Could not update that lead.");
      return;
    }
    setLead(data as Lead);
    await supabase.rpc("log_activity", {
      p_entity_type: "lead",
      p_entity_id: lead.id,
      p_action: "lead.status_changed",
      p_actor_type: "admin",
      p_metadata: { from: lead.status, to: status },
    });
    toast.success(`Marked ${statusLabel(status).toLowerCase()}.`);
  }

  function handleStatusClick(status: LeadStatus) {
    if (status === "lost") {
      setPendingStatus("lost");
      setLostReason(lead?.lost_reason ?? "");
      setLostOpen(true);
      return;
    }
    void saveStatus(status);
  }

  if (loading) {
    return (
      <p className="[font-family:'Geist',Helvetica] text-sm text-slate-600">
        Loading lead…
      </p>
    );
  }

  if (!lead) {
    return (
      <section>
        <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
          Lead not found
        </h1>
        <Link
          to="/admin/leads"
          className="mt-4 inline-flex h-11 items-center text-sm font-semibold text-[#2a7a78]"
        >
          Back to leads
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <Link
        to="/admin/leads"
        className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#2a7a78]"
      >
        Back to leads
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
          {lead.name}
        </h1>
        <LeadStatusBadge status={lead.status} />
        {lead.is_after_hours ? (
          <span className="rounded-md bg-[#142033] px-2 py-1 [font-family:'Geist',Helvetica] text-xs font-semibold text-[#c9a04a]">
            After-hours
          </span>
        ) : null}
      </div>
      <p className="mt-2 [font-family:'Geist',Helvetica] text-sm text-slate-500">
        {sourceLabel(lead.source)} · {formatShopTime(lead.created_at)}
      </p>

      <dl className="mt-8 grid gap-4 rounded-md border border-slate-200 bg-white p-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-slate-500">Phone</dt>
          <dd className="mt-1 font-medium text-[#142033]">
            {lead.phone || "—"}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Email</dt>
          <dd className="mt-1 font-medium text-[#142033]">
            {lead.email || "—"}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">City</dt>
          <dd className="mt-1 font-medium text-[#142033]">{lead.city || "—"}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs text-slate-500">What's going on</dt>
          <dd className="mt-1 font-medium leading-6 text-[#142033]">
            {lead.description || "—"}
          </dd>
        </div>
        {lead.lost_reason ? (
          <div className="sm:col-span-2">
            <dt className="text-xs text-slate-500">Lost reason</dt>
            <dd className="mt-1 font-medium text-[#142033]">{lead.lost_reason}</dd>
          </div>
        ) : null}
      </dl>

      {lead.status !== "booked" && lead.status !== "won" && lead.status !== "lost" ? (
        <Link
          to={`/admin/bookings/new?leadId=${lead.id}`}
          className="mt-6 inline-flex h-11 items-center rounded-md bg-[#c9a04a] px-4 text-sm font-semibold text-[#142033]"
        >
          Book this lead
        </Link>
      ) : null}

      <h2 className="mt-8 [font-family:'Gabarito',Helvetica] text-xl font-bold text-[#142033]">
        Status
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {leadStatuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => handleStatusClick(status)}
            className={
              lead.status === status
                ? "h-11 rounded-md bg-[#142033] px-4 text-sm font-semibold text-white"
                : "h-11 rounded-md border border-slate-300 px-4 text-sm font-semibold text-[#142033] hover:bg-slate-50"
            }
          >
            {statusLabel(status)}
          </button>
        ))}
      </div>

      {lostOpen && pendingStatus === "lost" ? (
        <ConfirmModal
          title="Mark this lead lost?"
          confirmLabel="Mark lost"
          danger
          onCancel={() => {
            setLostOpen(false);
            setPendingStatus(null);
          }}
          onConfirm={() => {
            if (!lostReason.trim()) {
              toast.error("Add a short reason.");
              return;
            }
            void saveStatus("lost", lostReason.trim());
            setLostOpen(false);
            setPendingStatus(null);
          }}
        >
          <label
            htmlFor="lost-reason"
            className="mb-1.5 block font-semibold text-[#142033]"
          >
            Why did we lose it?
          </label>
          <input
            id="lost-reason"
            value={lostReason}
            onChange={(event) => setLostReason(event.target.value)}
            className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm text-[#142033] outline-none focus-visible:border-[#2a7a78] focus-visible:ring-2 focus-visible:ring-[#2a7a78]"
            placeholder="Price, already hired someone…"
          />
        </ConfirmModal>
      ) : null}
    </section>
  );
}
