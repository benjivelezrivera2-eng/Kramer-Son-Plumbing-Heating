import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
  cors,
  isEmail,
  json,
  randomToken,
  sendEmail,
  serviceClient,
  sha256Hex,
  shopSettings,
  siteUrl,
  upsertCustomer,
} from "./shared.ts";

function slotLabel(slot: string) {
  if (slot === "morning") return "Morning";
  if (slot === "afternoon") return "Afternoon";
  if (slot === "after_hours") return "After-hours";
  return slot;
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
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const city = String(body.city ?? "").trim();
    const addressLine = String(body.address_line ?? "").trim();
    const description = String(body.description ?? "").trim();
    const windowDate = String(body.window_date ?? "");
    const windowSlot = String(body.window_slot ?? "");
    const serviceTypeId = body.service_type_id
      ? String(body.service_type_id)
      : null;
    const existingLeadId = body.lead_id ? String(body.lead_id) : null;

    if (!name) return json({ error: "Name is required" }, 400);
    if (!phone) return json({ error: "Phone is required" }, 400);
    if (!email || !isEmail(email)) {
      return json({ error: "A valid email is required" }, 400);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(windowDate)) {
      return json({ error: "Pick a date" }, 400);
    }
    if (!["morning", "afternoon", "after_hours"].includes(windowSlot)) {
      return json({ error: "Pick a window" }, 400);
    }

    const supabase = serviceClient();
    const customerId = await upsertCustomer(supabase, {
      name,
      phone,
      email,
      city,
      address_line: addressLine,
    });

    let leadId = existingLeadId;
    if (leadId) {
      const { data: existing } = await supabase
        .from("leads")
        .select("id")
        .eq("id", leadId)
        .maybeSingle();
      if (!existing) leadId = null;
    }

    if (!leadId) {
      const { data: lead, error: leadError } = await supabase
        .from("leads")
        .insert({
          customer_id: customerId,
          service_type_id: serviceTypeId,
          source: "contact_form",
          status: "booked",
          name,
          phone,
          email,
          city,
          description,
          is_after_hours: windowSlot === "after_hours",
          booked_at: new Date().toISOString(),
        })
        .select("id")
        .single();
      if (leadError) throw leadError;
      leadId = lead.id;
      await supabase.rpc("log_activity", {
        p_entity_type: "lead",
        p_entity_id: leadId,
        p_action: "lead.created",
        p_actor_type: "system",
        p_metadata: { source: "booking" },
      });
    } else {
      await supabase
        .from("leads")
        .update({
          status: "booked",
          booked_at: new Date().toISOString(),
          service_type_id: serviceTypeId,
          is_after_hours: windowSlot === "after_hours",
        })
        .eq("id", leadId);
    }

    const token = randomToken();
    const tokenHash = await sha256Hex(token);
    const expires = new Date();
    expires.setDate(expires.getDate() + 90);

    const { data: bookingId, error: bookingError } = await supabase.rpc(
      "try_create_booking",
      {
        p_lead_id: leadId,
        p_customer_id: customerId,
        p_service_type_id: serviceTypeId,
        p_window_date: windowDate,
        p_window_slot: windowSlot,
        p_notes: description,
        p_token_hash: tokenHash,
        p_token_expires: expires.toISOString(),
      },
    );
    if (bookingError) {
      const message = bookingError.message ?? "";
      if (message.includes("WINDOW_FULL")) {
        return json({ error: "That window just filled up. Pick another." }, 409);
      }
      throw bookingError;
    }

    await supabase.rpc("log_activity", {
      p_entity_type: "booking",
      p_entity_id: bookingId,
      p_action: "booking.created",
      p_actor_type: "customer",
      p_metadata: { window_date: windowDate, window_slot: windowSlot },
    });

    const settings = await shopSettings(supabase);
    const origin = siteUrl();
    const manageUrl = `${origin}/b/${token}`;
    let serviceTitle = "Visit";
    if (serviceTypeId) {
      const { data: service } = await supabase
        .from("service_types")
        .select("title")
        .eq("id", serviceTypeId)
        .maybeSingle();
      serviceTitle = service?.title ?? serviceTitle;
    }

    if (settings.shopEmail) {
      await sendEmail(supabase, {
        kind: "admin_new_booking",
        to: settings.shopEmail,
        subject: `New booking — ${name} — ${windowDate} ${slotLabel(windowSlot)}`,
        html: `<p>New booking from the website.</p>
          <p><strong>${name}</strong><br>${phone}<br>${email}<br>${city}<br>${addressLine}</p>
          <p>${serviceTitle}<br>${windowDate} · ${slotLabel(windowSlot)}</p>
          <p>${description || "(no notes)"}</p>
          <p><a href="${origin}/admin/bookings/${bookingId}">Open in the shop office</a></p>`,
        entityType: "booking",
        entityId: bookingId,
      });
    }

    await sendEmail(supabase, {
      kind: "customer_confirm",
      to: email,
      subject: `You're on the board — ${settings.shopName}`,
      html: `<p>Hi ${name},</p>
        <p>We booked ${serviceTitle} for <strong>${windowDate}</strong>, ${slotLabel(windowSlot)}.</p>
        <p><a href="${manageUrl}">Manage this visit</a> — reschedule or cancel from that page. No account needed.</p>
        ${settings.shopPhone ? `<p>If it cannot wait, call ${settings.shopPhone}.</p>` : ""}`,
      entityType: "booking",
      entityId: bookingId,
    });

    return json({
      booking_id: bookingId,
      manage_token: token,
    });
  } catch (error) {
    return json(
      {
        error:
          error instanceof Error ? error.message : "Could not book that window",
      },
      500,
    );
  }
});
