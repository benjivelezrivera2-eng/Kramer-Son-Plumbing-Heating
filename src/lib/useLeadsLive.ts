import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { sourceLabel, type Lead } from "./leads";
import { supabase } from "./supabase";

export function useLeadsLive(): void {
  const navigate = useNavigate();

  useEffect(() => {
    const channel = supabase
      .channel("leads-live")
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
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [navigate]);
}
