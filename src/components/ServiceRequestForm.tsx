import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { business } from "../config/business";

type FormState = {
  name: string;
  phone: string;
  city: string;
  description: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  city: "",
  description: "",
};

const fieldClassName =
  "h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-[#142033] outline-none focus-visible:border-[#2a7a78] focus-visible:ring-2 focus-visible:ring-[#2a7a78]";

export function ServiceRequestForm(): JSX.Element {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: { name?: string; phone?: string } = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.phone.trim()) nextErrors.phone = "Phone is required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
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
        className="mt-1 h-11 rounded-md bg-[#c9a04a] px-6 text-sm font-semibold text-[#142033] transition-colors hover:bg-[#b8903f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#142033] focus-visible:ring-offset-2"
      >
        Send request
      </button>
    </form>
  );
}
