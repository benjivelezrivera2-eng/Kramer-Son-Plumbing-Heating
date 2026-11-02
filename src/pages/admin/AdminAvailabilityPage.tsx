import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { ConfirmModal } from "../../components/ConfirmModal";
import { slotLabel, type WindowSlot } from "../../lib/shop";
import { supabase } from "../../lib/supabase";
import { fieldClassName, primaryButtonClassName } from "../../lib/ui";
import { usePageTitle } from "../../lib/usePageTitle";

type Rule = {
  id: string;
  day_of_week: number;
  slot: WindowSlot;
  starts_at: string;
  ends_at: string;
  capacity: number;
  is_active: boolean;
};

type ExceptionRow = {
  id: string;
  exception_date: string;
  kind: string;
  slot: string | null;
  capacity: number | null;
  note: string;
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function AdminAvailabilityPage(): JSX.Element {
  usePageTitle("Hours");
  const [rules, setRules] = useState<Rule[]>([]);
  const [exceptions, setExceptions] = useState<ExceptionRow[]>([]);
  const [dayOff, setDayOff] = useState("");
  const [removeId, setRemoveId] = useState<string | null>(null);

  async function load() {
    const [{ data: ruleRows }, { data: exceptionRows }] = await Promise.all([
      supabase.from("availability_rules").select("*").order("day_of_week"),
      supabase
        .from("availability_exceptions")
        .select("*")
        .order("exception_date"),
    ]);
    setRules((ruleRows ?? []) as Rule[]);
    setExceptions((exceptionRows ?? []) as ExceptionRow[]);
  }

  useEffect(() => {
    void load();
  }, []);

  async function saveRule(rule: Rule, patch: Partial<Rule>) {
    const { error } = await supabase
      .from("availability_rules")
      .update(patch)
      .eq("id", rule.id);
    if (error) {
      toast.error("Could not save hours.");
      return;
    }
    toast.success("Hours saved.");
    void load();
  }

  async function addDayOff(event: FormEvent) {
    event.preventDefault();
    if (!dayOff) return;
    const { error } = await supabase.from("availability_exceptions").insert({
      exception_date: dayOff,
      kind: "closed",
      note: "Day off",
    });
    if (error) {
      toast.error("Could not add that day off.");
      return;
    }
    setDayOff("");
    toast.success("Day off added. Public picker will hide it.");
    void load();
  }

  return (
    <section className="mx-auto w-full max-w-4xl">
      <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
        Hours
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Capacities hide a window on /book when it is full. Days off hide the
        whole date.
      </p>
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#f4f6f8] text-slate-500">
            <tr>
              <th className="px-3 py-2 font-medium">Day</th>
              <th className="px-3 py-2 font-medium">Window</th>
              <th className="px-3 py-2 font-medium">Capacity</th>
              <th className="px-3 py-2 font-medium">On</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id} className="border-t border-slate-200 bg-white">
                <td className="px-3 py-2">{DAYS[rule.day_of_week]}</td>
                <td className="px-3 py-2">{slotLabel(rule.slot)}</td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    min={0}
                    className="h-11 w-20 rounded-md border border-slate-300 px-2"
                    defaultValue={rule.capacity}
                    onBlur={(event) =>
                      void saveRule(rule, {
                        capacity: Number(event.target.value),
                      })
                    }
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={rule.is_active}
                    onChange={(event) =>
                      void saveRule(rule, { is_active: event.target.checked })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-xl font-bold text-[#142033]">Days off</h2>
      <form onSubmit={addDayOff} className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          type="date"
          className={fieldClassName}
          value={dayOff}
          onChange={(event) => setDayOff(event.target.value)}
        />
        <button type="submit" className={primaryButtonClassName}>
          Add day off
        </button>
      </form>
      <ul className="mt-4 flex flex-col gap-2">
        {exceptions
          .filter((row) => row.kind === "closed")
          .map((row) => (
            <li
              key={row.id}
              className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3 text-sm"
            >
              <span>{row.exception_date}</span>
              <button
                type="button"
                className="font-semibold text-red-600"
                onClick={() => setRemoveId(row.id)}
              >
                Remove
              </button>
            </li>
          ))}
      </ul>

      {removeId ? (
        <ConfirmModal
          title="Remove this day off?"
          confirmLabel="Remove"
          danger
          onCancel={() => setRemoveId(null)}
          onConfirm={() => {
            void supabase
              .from("availability_exceptions")
              .delete()
              .eq("id", removeId)
              .then(() => {
                setRemoveId(null);
                void load();
              });
          }}
        >
          The public book page will offer that date again if hours are open.
        </ConfirmModal>
      ) : null}
    </section>
  );
}
