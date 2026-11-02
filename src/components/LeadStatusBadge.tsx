import { statusLabel, type LeadStatus } from "../lib/leads";

const styles: Record<LeadStatus, string> = {
  new: "bg-[#2a7a78]/10 text-[#2a7a78]",
  contacted: "bg-slate-100 text-slate-700",
  booked: "bg-[#142033] text-white",
  won: "bg-[#2a7a78] text-white",
  lost: "border border-red-600 text-red-600",
};

export function LeadStatusBadge({
  status,
}: {
  status: LeadStatus;
}): JSX.Element {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-md px-2 [font-family:'Geist',Helvetica] text-xs font-semibold ${styles[status]}`}
    >
      {statusLabel(status)}
    </span>
  );
}
