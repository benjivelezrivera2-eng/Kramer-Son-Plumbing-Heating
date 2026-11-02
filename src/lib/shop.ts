export type WindowSlot = "morning" | "afternoon" | "after_hours";
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export type ServiceType = {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimated_duration_minutes: number;
  service_area: string;
  is_emergency: boolean;
  is_active: boolean;
  sort_order: number;
};

export type Technician = {
  id: string;
  name: string;
  color: string;
  is_active: boolean;
  sort_order: number;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  address_line: string;
  created_at: string;
};

export type Booking = {
  id: string;
  lead_id: string | null;
  customer_id: string | null;
  service_type_id: string | null;
  technician_id: string | null;
  status: BookingStatus;
  window_date: string;
  window_slot: WindowSlot;
  cancel_reason: string | null;
  cancelled_at: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
};

export type OpenWindow = {
  window_date: string;
  slot: WindowSlot;
  remaining: number;
  capacity: number;
};

export const bookingStatuses: BookingStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
];

export function slotLabel(slot: string): string {
  if (slot === "morning") return "Morning";
  if (slot === "afternoon") return "Afternoon";
  if (slot === "after_hours") return "After-hours";
  return slot;
}

export function bookingStatusLabel(status: string): string {
  if (status === "pending") return "Pending";
  if (status === "confirmed") return "Confirmed";
  if (status === "completed") return "Completed";
  if (status === "cancelled") return "Cancelled";
  if (status === "no_show") return "No-show";
  return status;
}

export function formatWindowDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function denverToday(): string {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Denver",
  });
}

export function addDays(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const next = new Date(year, month - 1, day + days);
  const y = next.getFullYear();
  const m = String(next.getMonth() + 1).padStart(2, "0");
  const d = String(next.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
