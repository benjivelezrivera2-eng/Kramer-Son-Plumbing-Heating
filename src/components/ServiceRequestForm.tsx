import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { business } from "../config/business";
import { supabase } from "../lib/supabase";

type FormState = {
  name: string;
  phone: string;
  email: string;
  city: string;
  description: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  description: "",
};

const fieldClassName =
  "h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-[#142033] outline-none focus-visible:border-[#2a7a78] focus-visible:ring-2 focus-visible:ring-[#2a7a78]";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ServiceRequestForm(): JSX.Element {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: { name?: string; phone?: string; email?: string } = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.phone.trim()) nextErrors.phone = "Phone is required";
    if (!form.email.trim() || !isEmail(form.email.trim())) {
      nextErrors.email = "A valid email is required";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke("create-lead", {
      body: {
        source: "contact_form",
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        city: form.city.trim(),
        description: form.description.trim(),
      },
    });
    setSubmitting(false);

    if (error || !data?.lead_id) {
      toast.error("We could not send that. Check the fields and try again.");
      return;
    }

    navigate("/confirmation");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="sr-name"
          className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]"
        >
          Name <span className="text-red-600">*</span>
        </label>
        <input
          id="sr-name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className={fieldClassName}
          placeholder="Your name"
        />
        {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="sr-phone"
          className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]"
        >
          Phone <span className="text-red-600">*</span>
        </label>
        <input
          id="sr-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
          className={fieldClassName}
          placeholder={business.phoneDisplay}
        />
        {errors.phone && (
          <span className="text-xs text-red-600">{errors.phone}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="sr-email"
          className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]"
        >
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="sr-email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          className={fieldClassName}
          placeholder="you@email.com"
        />
        {errors.email && (
          <span className="text-xs text-red-600">{errors.email}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="sr-city"
          className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]"
        >
          City
        </label>
        <input
          id="sr-city"
          name="city"
          type="text"
          autoComplete="address-level2"
          value={form.city}
          onChange={(event) => setForm({ ...form, city: event.target.value })}
          className={fieldClassName}
          placeholder={business.city}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="sr-desc"
          className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]"
        >
          What's going on
        </label>
        <textarea
          id="sr-desc"
          name="description"
          autoComplete="off"
          value={form.description}
          onChange={(event) =>
            setForm({ ...form, description: event.target.value })
          }
          rows={4}
          className="min-h-[96px] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-[#142033] outline-none focus-visible:border-[#2a7a78] focus-visible:ring-2 focus-visible:ring-[#2a7a78]"
          placeholder="Leak, no heat, backed-up drain…"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 h-11 rounded-md bg-[#c9a04a] px-6 text-sm font-semibold text-[#142033] transition-colors hover:bg-[#b8903f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#142033] focus-visible:ring-offset-2 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
