import { bookingStatusLabel, type BookingStatus } from "../lib/shop";

const styles: Record<BookingStatus, string> = {
  pending: "bg-slate-100 text-slate-700",
  confirmed: "bg-[#2a7a78] text-white",
  completed: "bg-[#142033] text-white",
  cancelled: "border border-red-600 text-red-600",
  no_show: "bg-red-50 text-red-700",
};

export function BookingStatusBadge({
  status,
}: {
  status: BookingStatus;
}): JSX.Element {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-md px-2 [font-family:'Geist',Helvetica] text-xs font-semibold ${styles[status]}`}
    >
      {bookingStatusLabel(status)}
    </span>
  );
}
