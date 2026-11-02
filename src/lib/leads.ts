export type LeadStatus = "new" | "contacted" | "booked" | "won" | "lost";
export type LeadSource = "contact_form" | "click_to_call" | "admin_manual";

export type Lead = {
  id: string;
  customer_id: string | null;
  service_type_id: string | null;
  source: LeadSource;
  status: LeadStatus;
  name: string;
  phone: string;
  email: string;
  city: string;
  description: string;
  is_after_hours: boolean;
  lost_reason: string | null;
  created_at: string;
  updated_at: string;
  contacted_at: string | null;
  booked_at: string | null;
  closed_at: string | null;
};

export const leadStatuses: LeadStatus[] = [
  "new",
  "contacted",
  "booked",
  "won",
  "lost",
];

export function sourceLabel(source: string): string {
  if (source === "click_to_call") return "Call tap";
  if (source === "admin_manual") return "Typed in";
  return "Website form";
}

export function statusLabel(status: string): string {
  if (status === "new") return "New";
  if (status === "contacted") return "Contacted";
  if (status === "booked") return "Booked";
  if (status === "won") return "Won";
  if (status === "lost") return "Lost";
  return status;
}

export function formatShopTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: "America/Denver",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function timestampsForStatus(
  status: LeadStatus,
): Pick<Lead, "contacted_at" | "booked_at" | "closed_at"> {
  const now = new Date().toISOString();
  if (status === "contacted") {
    return { contacted_at: now, booked_at: null, closed_at: null };
  }
  if (status === "booked") {
    return { contacted_at: now, booked_at: now, closed_at: null };
  }
  if (status === "won" || status === "lost") {
    return { contacted_at: now, booked_at: null, closed_at: now };
  }
  return { contacted_at: null, booked_at: null, closed_at: null };
}
