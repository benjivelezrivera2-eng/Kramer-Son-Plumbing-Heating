import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type ServiceType } from "../../lib/shop";
import { supabase } from "../../lib/supabase";
import { usePageTitle } from "../../lib/usePageTitle";

export function AdminServicesPage(): JSX.Element {
  usePageTitle("Services");
  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    void supabase
      .from("service_types")
      .select("*")
      .order("sort_order")
      .then(({ data }) => setServices((data ?? []) as ServiceType[]));
  }, []);

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="flex items-end justify-between gap-3">
        <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
          Services
        </h1>
        <Link
          to="/admin/services/new"
          className="inline-flex h-11 items-center rounded-md bg-[#c9a04a] px-4 text-sm font-semibold text-[#142033]"
        >
          Add service
        </Link>
      </div>
      <ul className="mt-8 flex flex-col gap-3">
        {services.map((service) => (
          <li key={service.id}>
            <Link
              to={`/admin/services/${service.id}`}
              className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-4"
            >
              <div>
                <p className="font-semibold text-[#142033]">{service.title}</p>
                <p className="text-xs text-slate-500">/{service.slug}</p>
              </div>
              <span className="text-xs text-slate-500">
                {service.is_active ? "On site" : "Hidden"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
