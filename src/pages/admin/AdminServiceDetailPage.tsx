import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { slugify } from "../../lib/shop";
import { supabase } from "../../lib/supabase";
import { fieldClassName, primaryButtonClassName } from "../../lib/ui";
import { usePageTitle } from "../../lib/usePageTitle";

export function AdminServiceDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isEmergency, setIsEmergency] = useState(false);
  usePageTitle(isNew ? "New service" : title || "Service");

  useEffect(() => {
    if (!id || isNew) return;
    void supabase
      .from("service_types")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        setTitle(data.title);
        setSlug(data.slug);
        setDescription(data.description);
        setIsActive(data.is_active);
        setIsEmergency(data.is_emergency);
      });
  }, [id, isNew]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }
    const nextSlug = slug.trim() || slugify(title);
    const payload = {
      title: title.trim(),
      slug: nextSlug,
      description: description.trim(),
      is_active: isActive,
      is_emergency: isEmergency,
    };
    if (isNew) {
      const { data, error } = await supabase
        .from("service_types")
        .insert(payload)
        .select("id")
        .single();
      if (error || !data) {
        toast.error("Could not add that service.");
        return;
      }
      navigate(`/admin/services/${data.id}`);
      return;
    }
    const { error } = await supabase.from("service_types").update(payload).eq("id", id);
    if (error) {
      toast.error("Could not save.");
      return;
    }
    toast.success("Saved.");
  }

  return (
    <section className="mx-auto w-full max-w-xl">
      <Link to="/admin/services" className="text-sm font-semibold text-[#2a7a78]">
        Back to services
      </Link>
      <h1 className="mt-4 [font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
        {isNew ? "Add service" : "Edit service"}
      </h1>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <input className={fieldClassName} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input className={fieldClassName} value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug" />
        <textarea
          className="min-h-[96px] rounded-md border border-slate-300 px-3 py-2 text-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <label className="flex h-11 items-center gap-2 text-sm font-semibold">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          Show on the public site
        </label>
        <label className="flex h-11 items-center gap-2 text-sm font-semibold">
          <input type="checkbox" checked={isEmergency} onChange={(e) => setIsEmergency(e.target.checked)} />
          After-hours / emergency
        </label>
        <button type="submit" className={primaryButtonClassName}>
          Save
        </button>
      </form>
    </section>
  );
}
