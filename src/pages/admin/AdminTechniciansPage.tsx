import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { type Technician } from "../../lib/shop";
import { supabase } from "../../lib/supabase";
import { usePageTitle } from "../../lib/usePageTitle";

export function AdminTechniciansPage(): JSX.Element {
  usePageTitle("Technicians");
  const [techs, setTechs] = useState<Technician[]>([]);

  useEffect(() => {
    void supabase
      .from("technicians")
      .select("*")
      .order("sort_order")
      .then(({ data }) => setTechs((data ?? []) as Technician[]));
  }, []);

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="flex items-end justify-between gap-3">
        <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
          Technicians
        </h1>
        <Link
          to="/admin/technicians/new"
          className="inline-flex h-11 items-center rounded-md bg-[#c9a04a] px-4 text-sm font-semibold text-[#142033]"
        >
          Add tech
        </Link>
      </div>
      <ul className="mt-8 flex flex-col gap-3">
        {techs.map((tech) => (
          <li key={tech.id}>
            <Link
              to={`/admin/technicians/${tech.id}`}
              className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-4"
            >
              <span className="font-semibold" style={{ color: tech.color }}>
                {tech.name}
              </span>
              <span className="text-xs text-slate-500">
                {tech.is_active ? "Active" : "Off"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
