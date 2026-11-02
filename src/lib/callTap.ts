import { business } from "../config/business";
import { supabase } from "./supabase";

const STORAGE_KEY = "kramer_last_call_tap";
const DEBOUNCE_MS = 60_000;

export async function logCallTap(): Promise<void> {
  const now = Date.now();
  const last = Number(window.localStorage.getItem(STORAGE_KEY) || 0);
  if (now - last < DEBOUNCE_MS) return;

  window.localStorage.setItem(STORAGE_KEY, String(now));
  try {
    await supabase.functions.invoke("create-lead", {
      body: {
        source: "click_to_call",
        name: "Unknown caller",
      },
    });
  } catch {
    // Never block the dialer.
  }
}

export function openDialer(): void {
  window.location.href = business.phoneHref;
}
