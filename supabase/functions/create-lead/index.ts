import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const source = String(body.source ?? "contact_form");
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const city = String(body.city ?? "").trim();
    const description = String(body.description ?? "").trim();
    const isAfterHours = Boolean(body.is_after_hours);

    if (!["contact_form", "click_to_call", "admin_manual"].includes(source)) {
      return json({ error: "Unknown source" }, 400);
    }

    if (source === "contact_form" || source === "admin_manual") {
      if (!name) return json({ error: "Name is required" }, 400);
      if (!phone) return json({ error: "Phone is required" }, 400);
    }
    if (source === "contact_form") {
      if (!email || !isEmail(email)) {
        return json({ error: "A valid email is required" }, 400);
      }
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    let customerId: string | null = null;
    const digits = normalizePhone(phone);

    if (email) {
      const { data: byEmail } = await supabase
        .from("customers")
        .select("id")
        .eq("email", email)
        .maybeSingle();
      customerId = byEmail?.id ?? null;
    }

    if (!customerId && digits) {
      const { data: phoneRows } = await supabase
        .from("customers")
        .select("id, phone")
        .limit(200);
      const match = (phoneRows ?? []).find(
        (row) => normalizePhone(row.phone ?? "") === digits,
      );
      customerId = match?.id ?? null;
    }

    if (customerId) {
      await supabase
        .from("customers")
        .update({
          name: name || undefined,
          phone: phone || undefined,
          email: email || undefined,
          city: city || undefined,
        })
        .eq("id", customerId);
    } else if (name || phone || email) {
      const { data: created, error: customerError } = await supabase
        .from("customers")
        .insert({
          name: name || "Unknown caller",
          phone,
          email,
          city,
        })
        .select("id")
        .single();
      if (customerError) throw customerError;
      customerId = created.id;
    }

    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert({
        customer_id: customerId,
        source,
        status: "new",
        name: name || "Unknown caller",
        phone,
        email,
        city,
        description,
        is_after_hours: isAfterHours,
      })
      .select("id, name, source")
      .single();
    if (leadError) throw leadError;

    await supabase.rpc("log_activity", {
      p_entity_type: "lead",
      p_entity_id: lead.id,
      p_action: "lead.created",
      p_actor_type: "system",
      p_metadata: { source },
    });

    const { data: settings } = await supabase
      .from("shop_settings")
      .select("shop_name, notify_email, phone")
      .limit(1)
      .maybeSingle();

    const shopEmail = settings?.notify_email;
    const shopName = settings?.shop_name ?? "the shop";
    const shopPhone = settings?.phone ?? "";
    const siteUrl =
      Deno.env.get("SITE_URL") ??
      "https://kramer-son-plumbing-heating.vercel.app";
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const from =
      Deno.env.get("RESEND_FROM") ?? "Kramer & Son <beth.t@example.com>";

    async function sendEmail(
      kind: string,
      to: string,
      subject: string,
      html: string,
    ) {
      const { data: note } = await supabase
        .from("notifications")
        .insert({
          kind,
          to_email: to,
          entity_type: "lead",
          entity_id: lead.id,
          status: "queued",
          provider: "resend",
        })
        .select("id")
        .single();

      if (!note) return;
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
        body: JSON.stringify({ from, to: [to], subject, html }),
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

    if (shopEmail) {
      await sendEmail(
        "admin_new_lead",
        shopEmail,
        `New website lead — ${lead.name} — ${source}`,
        `<p>New lead from the website.</p>
         <p><strong>${lead.name}</strong><br>${phone}<br>${email}<br>${city}</p>
         <p>${description || "(no description)"}</p>
         <p><a href="${siteUrl}/admin/leads/${lead.id}">Open in the shop office</a></p>`,
      );
    }

    if (email && source === "contact_form") {
      await sendEmail(
        "customer_confirm",
        email,
        `We got your request — ${shopName}`,
        `<p>Hi ${name},</p>
         <p>We got your request. We'll call ${phone} to confirm the visit.</p>
         ${shopPhone ? `<p>If it cannot wait, call ${shopPhone}.</p>` : ""}`,
      );
    }

    return json({ lead_id: lead.id });
  } catch (error) {
    return json(
      {
        error:
          error instanceof Error ? error.message : "Could not save the request",
      },
      500,
    );
  }
});
