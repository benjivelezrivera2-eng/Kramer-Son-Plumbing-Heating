import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";

export const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

export function serviceClient(): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );
}

export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function siteUrl() {
  return (
    Deno.env.get("SITE_URL") ??
    "https://kramer-son-plumbing-heating.vercel.app"
  );
}

export async function sha256Hex(value: string) {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function upsertCustomer(
  supabase: SupabaseClient,
  input: {
    name: string;
    phone: string;
    email: string;
    city?: string;
    address_line?: string;
  },
) {
  let customerId: string | null = null;
  const digits = normalizePhone(input.phone);

  if (input.email) {
    const { data: byEmail } = await supabase
      .from("customers")
      .select("id")
      .eq("email", input.email)
      .maybeSingle();
    customerId = byEmail?.id ?? null;
  }

  if (!customerId && digits) {
    const { data: phoneRows } = await supabase
      .from("customers")
      .select("id, phone")
      .limit(400);
    const match = (phoneRows ?? []).find(
      (row) => normalizePhone(row.phone ?? "") === digits,
    );
    customerId = match?.id ?? null;
  }

  if (customerId) {
    await supabase
      .from("customers")
      .update({
        name: input.name || undefined,
        phone: input.phone || undefined,
        email: input.email || undefined,
        city: input.city || undefined,
        address_line: input.address_line || undefined,
      })
      .eq("id", customerId);
    return customerId;
  }

  const { data: created, error } = await supabase
    .from("customers")
    .insert({
      name: input.name || "Unknown caller",
      phone: input.phone,
      email: input.email,
      city: input.city ?? "",
      address_line: input.address_line ?? "",
    })
    .select("id")
    .single();
  if (error) throw error;
  return created.id as string;
}

export async function sendEmail(
  supabase: SupabaseClient,
  input: {
    kind: string;
    to: string;
    subject: string;
    html: string;
    entityType: string;
    entityId: string;
  },
) {
  const { data: note } = await supabase
    .from("notifications")
    .insert({
      kind: input.kind,
      to_email: input.to,
      entity_type: input.entityType,
      entity_id: input.entityId,
      status: "queued",
      provider: "resend",
    })
    .select("id")
    .single();

  if (!note) return;
  const resendKey = Deno.env.get("RESEND_API_KEY");
  const from =
    Deno.env.get("RESEND_FROM") ?? "Kramer & Son <beth.t@example.com>";

  if (!resendKey) {
    await supabase
      .from("notifications")
      .update({ status: "failed", error: "Missing RESEND_API_KEY" })
      .eq("id", note.id);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: input.subject,
      html: input.html,
    }),
  });
  const payload = (await res.json()) as { id?: string; message?: string };
  if (!res.ok) {
    await supabase
      .from("notifications")
      .update({
        status: "failed",
        error: payload.message ?? JSON.stringify(payload),
      })
      .eq("id", note.id);
    return;
  }
  await supabase
    .from("notifications")
    .update({ status: "sent", provider_id: payload.id ?? null })
    .eq("id", note.id);
}

export async function shopSettings(supabase: SupabaseClient) {
  const { data } = await supabase
    .from("shop_settings")
    .select("shop_name, notify_email, phone")
    .limit(1)
    .maybeSingle();
  return {
    shopName: data?.shop_name ?? "the shop",
    shopEmail: data?.notify_email as string | undefined,
    shopPhone: data?.phone ?? "",
  };
}
