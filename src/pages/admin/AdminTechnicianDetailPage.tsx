import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../../lib/supabase";
import { fieldClassName, primaryButtonClassName } from "../../lib/ui";
import { usePageTitle } from "../../lib/usePageTitle";

export function AdminTechnicianDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#2a7a78");
  const [isActive, setIsActive] = useState(true);
  usePageTitle(isNew ? "New technician" : name || "Technician");

  useEffect(() => {
    if (!id || isNew) return;
    void supabase
      .from("technicians")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        setName(data.name);
        setColor(data.color);
        setIsActive(data.is_active);
      });
  }, [id, isNew]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }
    if (isNew) {
      const { data, error } = await supabase
        .from("technicians")
        .insert({ name: name.trim(), color, is_active: isActive })
        .select("id")
        .single();
      if (error || !data) {
        toast.error("Could not add that tech.");
        return;
      }
      navigate(`/admin/technicians/${data.id}`);
      return;
    }
    const { error } = await supabase
      .from("technicians")
      .update({ name: name.trim(), color, is_active: isActive })
      .eq("id", id);
    if (error) {
      toast.error("Could not save.");
      return;
    }
    toast.success("Saved.");
  }

  return (
    <section className="mx-auto w-full max-w-xl">
      <Link to="/admin/technicians" className="text-sm font-semibold text-[#2a7a78]">
        Back to technicians
      </Link>
      <h1 className="mt-4 [font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
        {isNew ? "Add technician" : "Edit technician"}
      </h1>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <input className={fieldClassName} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <label className="text-sm font-semibold text-[#142033]">
          Color
          <input
            type="color"
            className="mt-1.5 h-11 w-20 rounded-md border border-slate-300"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <label className="flex h-11 items-center gap-2 text-sm font-semibold text-[#142033]">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active (uncheck to hide from the week board)
        </label>
        <button type="submit" className={primaryButtonClassName}>
          Save
        </button>
      </form>
    </section>
  );
}
