import { useEffect, useState } from "react";
import { formatShopTime } from "../../lib/leads";
import { supabase } from "../../lib/supabase";
import { usePageTitle } from "../../lib/usePageTitle";

type EventRow = {
  id: string;
  entity_type: string;
  action: string;
  actor_type: string;
  created_at: string;
  metadata: Record<string, unknown>;
};

export function AdminActivityPage(): JSX.Element {
  usePageTitle("Activity");
  const [events, setEvents] = useState<EventRow[]>([]);
  const [type, setType] = useState("all");

  useEffect(() => {
    let query = supabase
      .from("activity_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (type !== "all") query = query.eq("entity_type", type);
    void query.then(({ data }) => setEvents((data ?? []) as EventRow[]));
  }, [type]);

  return (
    <section className="mx-auto w-full max-w-3xl">
      <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
        Activity
      </h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {["all", "lead", "booking", "auth", "settings"].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setType(value)}
            className={`h-11 rounded-md px-4 text-sm font-semibold ${
              type === value
                ? "bg-[#142033] text-white"
                : "border border-slate-300 text-[#142033]"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
      <ul className="mt-6 flex flex-col gap-2">
        {events.map((event) => (
          <li
            key={event.id}
            className="rounded-md border border-slate-200 bg-white p-4 text-sm"
          >
            <p className="font-semibold text-[#142033]">{event.action}</p>
            <p className="text-xs text-slate-500">
              {event.entity_type} · {event.actor_type} · {formatShopTime(event.created_at)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
