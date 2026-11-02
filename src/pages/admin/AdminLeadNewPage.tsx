import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../../lib/supabase";
import { fieldClassName, primaryButtonClassName } from "../../lib/ui";
import { usePageTitle } from "../../lib/usePageTitle";

export function AdminLeadNewPage(): JSX.Element {
  usePageTitle("Type a lead");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Name and phone are required.");
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke("create-lead", {
      body: {
        source: "admin_manual",
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        city: city.trim(),
        description: description.trim(),
      },
    });
    setSubmitting(false);
    if (error || !data?.lead_id) {
      toast.error("Could not save that lead.");
      return;
    }
    toast.success("Lead saved.");
    navigate(`/admin/leads/${data.lead_id}`);
  }

  return (
    <section className="mx-auto w-full max-w-xl">
      <Link to="/admin/leads" className="text-sm font-semibold text-[#2a7a78]">
        Back to leads
      </Link>
      <h1 className="mt-4 [font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
        Type a lead
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Use this when they called the shop or emailed. Email is optional.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
        <label className="text-sm font-semibold text-[#142033]">
          Name
          <input className={`mt-1.5 ${fieldClassName}`} value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="text-sm font-semibold text-[#142033]">
          Phone
          <input className={`mt-1.5 ${fieldClassName}`} value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
        </label>
        <label className="text-sm font-semibold text-[#142033]">
          Email
          <input className={`mt-1.5 ${fieldClassName}`} value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        </label>
        <label className="text-sm font-semibold text-[#142033]">
          City
          <input className={`mt-1.5 ${fieldClassName}`} value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label className="text-sm font-semibold text-[#142033]">
          Notes
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1.5 min-h-[96px] w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal text-[#142033] outline-none focus-visible:border-[#2a7a78] focus-visible:ring-2 focus-visible:ring-[#2a7a78]"
          />
        </label>
        <button type="submit" disabled={submitting} className={primaryButtonClassName}>
          {submitting ? "Saving…" : "Save lead"}
        </button>
      </form>
    </section>
  );
}
