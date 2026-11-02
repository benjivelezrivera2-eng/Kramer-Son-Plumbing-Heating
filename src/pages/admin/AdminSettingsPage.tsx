import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { ConfirmModal } from "../../components/ConfirmModal";
import { supabase } from "../../lib/supabase";
import { fieldClassName, primaryButtonClassName } from "../../lib/ui";
import { usePageTitle } from "../../lib/usePageTitle";

export function AdminSettingsPage(): JSX.Element {
  usePageTitle("Settings");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timezone, setTimezone] = useState("America/Denver");
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    void supabase
      .from("shop_settings")
      .select("*")
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        setNotifyEmail(data.notify_email ?? "");
        setPhone(data.phone ?? "");
        setTimezone(data.timezone ?? "America/Denver");
      });
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { error } = await supabase
      .from("shop_settings")
      .update({
        notify_email: notifyEmail.trim(),
        phone: phone.trim(),
        timezone: timezone.trim() || "America/Denver",
      })
      .eq("id", 1);
    if (error) {
      toast.error("Could not save settings.");
      return;
    }
    toast.success("Settings saved.");
  }

  async function resetDemo() {
    const { error } = await supabase.rpc("reset_demo_data");
    if (error) {
      toast.error("Reset failed.");
      return;
    }
    setResetOpen(false);
    toast.success("Demo board is clean. Services and techs stayed.");
  }

  return (
    <section className="mx-auto w-full max-w-xl">
      <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
        Settings
      </h1>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="text-sm font-semibold text-[#142033]">
          Shop notify email
          <input
            className={`mt-1.5 ${fieldClassName}`}
            value={notifyEmail}
            onChange={(event) => setNotifyEmail(event.target.value)}
          />
        </label>
        <label className="text-sm font-semibold text-[#142033]">
          Shop phone
          <input
            className={`mt-1.5 ${fieldClassName}`}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>
        <label className="text-sm font-semibold text-[#142033]">
          Timezone
          <input
            className={`mt-1.5 ${fieldClassName}`}
            value={timezone}
            onChange={(event) => setTimezone(event.target.value)}
          />
        </label>
        <button type="submit" className={primaryButtonClassName}>
          Save settings
        </button>
      </form>

      <div className="mt-12 rounded-md border border-red-200 bg-white p-5">
        <h2 className="text-xl font-bold text-[#142033]">Reset demo data</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Wipes leads, bookings, customers, and shop history. Keeps services,
          techs, hours, and your login. Use this the morning of a sales call.
        </p>
        <button
          type="button"
          onClick={() => setResetOpen(true)}
          className="mt-4 h-11 rounded-md bg-red-600 px-4 text-sm font-semibold text-white"
        >
          Reset demo data
        </button>
      </div>

      {resetOpen ? (
        <ConfirmModal
          title="Reset the demo board?"
          confirmLabel="Reset"
          danger
          onCancel={() => setResetOpen(false)}
          onConfirm={() => void resetDemo()}
        >
          This deletes every lead, booking, and customer. You cannot undo it.
        </ConfirmModal>
      ) : null}
    </section>
  );
}
