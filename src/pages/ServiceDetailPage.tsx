import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CallButton } from "../components/CallButton";
import { business } from "../config/business";
import { type ServiceType } from "../lib/shop";
import { supabase } from "../lib/supabase";
import { primaryButtonClassName, secondaryButtonClassName } from "../lib/ui";
import { usePageTitle } from "../lib/usePageTitle";

export function ServiceDetailPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<ServiceType | null>(null);
  const [loading, setLoading] = useState(true);

  usePageTitle(service?.title ?? "Service");

  useEffect(() => {
    if (!slug) return;
    let mounted = true;
    supabase
      .from("service_types")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle()
      .then(({ data }) => {
        if (!mounted) return;
        setService((data as ServiceType | null) ?? null);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return <p className="px-4 py-16 text-sm text-slate-600">Loading service…</p>;
  }

  if (!service) {
    return (
      <section className="mx-auto w-full max-w-xl px-4 py-16">
        <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
          Service not found
        </h1>
        <Link to="/services" className="mt-4 inline-flex text-sm font-semibold text-[#2a7a78]">
          Back to services
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-8 lg:py-16">
      {service.is_emergency ? (
        <p className="mb-3 inline-flex rounded-md bg-[#142033] px-2 py-1 text-xs font-semibold text-[#c9a04a]">
          After-hours
        </p>
      ) : null}
      <h1 className="[font-family:'Gabarito',Helvetica] text-[34px] font-extrabold text-[#142033] sm:text-[44px]">
        {service.title}
      </h1>
      <p className="mt-4 [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700">
        {service.description}
      </p>
      {service.service_area ? (
        <p className="mt-3 text-sm text-slate-600">{service.service_area}</p>
      ) : null}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to={`/book/${service.slug}`} className={primaryButtonClassName}>
          Book this
        </Link>
        <Link to="/contact" className={secondaryButtonClassName}>
          Request service
        </Link>
        <CallButton className={secondaryButtonClassName}>
          Call {business.phoneDisplay}
        </CallButton>
      </div>
    </section>
  );
}
