import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { sourceLabel, type Lead } from "./leads";
import { slotLabel, type Booking } from "./shop";
import { supabase } from "./supabase";

export function useShopLive(): void {
  const navigate = useNavigate();

  useEffect(() => {
    const channel = supabase
      .channel("shop-live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        (payload) => {
          const lead = payload.new as Lead;
          toast.success(
            `New lead from ${sourceLabel(lead.source)} — ${lead.name}`,
            {
              action: {
                label: "View",
                onClick: () => navigate(`/admin/leads/${lead.id}`),
              },
            },
          );
        },
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookings" },
        (payload) => {
          const booking = payload.new as Booking;
          toast.success(
            `New booking — ${slotLabel(booking.window_slot)} ${booking.window_date}`,
            {
              action: {
                label: "View",
                onClick: () => navigate(`/admin/bookings/${booking.id}`),
              },
            },
          );
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bookings" },
        (payload) => {
          const booking = payload.new as Booking;
          if (booking.status === "cancelled") {
            toast.message("A visit was cancelled.", {
              action: {
                label: "View",
                onClick: () => navigate(`/admin/bookings/${booking.id}`),
              },
            });
          }
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [navigate]);
}
