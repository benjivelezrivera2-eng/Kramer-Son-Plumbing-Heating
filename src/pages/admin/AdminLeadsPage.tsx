import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LeadStatusBadge } from "../../components/LeadStatusBadge";
import { formatShopTime, sourceLabel, type Lead } from "../../lib/leads";
import { supabase } from "../../lib/supabase";
import { usePageTitle } from "../../lib/usePageTitle";

export function AdminLeadsPage(): JSX.Element {
  usePageTitle("Leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (!mounted) return;
      if (!error) setLeads((data ?? []) as Lead[]);
      setLoading(false);
    }

    void load();

    const channel = supabase
      .channel("leads-list")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "leads" },
        () => {
          void load();
        },
      )
      .subscribe();

    return () => {
      mounted = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
            Leads
          </h1>
          <p className="mt-2 [font-family:'Geist',Helvetica] text-sm text-slate-600">
            Form, call tap, and typed-in leads land here. Leave this page open
            during a demo.
          </p>
        </div>
        <Link
          to="/admin/leads/new"
          className="inline-flex h-11 items-center rounded-md bg-[#c9a04a] px-4 text-sm font-semibold text-[#142033]"
        >
          Type a lead
        </Link>
      </div>

      {loading ? (
        <p className="mt-8 [font-family:'Geist',Helvetica] text-sm text-slate-600">
          Loading leads…
        </p>
      ) : leads.length === 0 ? (
        <div className="mt-8 rounded-md border border-slate-200 bg-white p-6">
          <p className="[font-family:'Geist',Helvetica] text-sm leading-6 text-slate-700">
            No leads yet. Open the contact page on your phone and send a
            request.
          </p>
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-3">
          {leads.map((lead) => (
            <li key={lead.id}>
              <Link
                to={`/admin/leads/${lead.id}`}
                className="flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-4 hover:border-[#2a7a78] md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate [font-family:'Gabarito',Helvetica] text-lg font-bold text-[#142033]">
                    {lead.name}
                  </p>
                  <p className="mt-1 [font-family:'Geist',Helvetica] text-sm text-slate-600">
                    {lead.phone || "No phone"}
                    {lead.city ? ` · ${lead.city}` : ""}
                  </p>
                  <p className="mt-1 [font-family:'Geist',Helvetica] text-xs text-slate-500">
                    {sourceLabel(lead.source)} · {formatShopTime(lead.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {lead.is_after_hours ? (
                    <span className="rounded-md bg-[#142033] px-2 py-1 [font-family:'Geist',Helvetica] text-xs font-semibold text-[#c9a04a]">
                      After-hours
                    </span>
                  ) : null}
                  <LeadStatusBadge status={lead.status} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
