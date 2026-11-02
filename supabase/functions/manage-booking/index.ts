import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
  cors,
  json,
  sendEmail,
  serviceClient,
  sha256Hex,
  shopSettings,
  siteUrl,
} from "./shared.ts";

function slotLabel(slot: string) {
  if (slot === "morning") return "Morning";
  if (slot === "afternoon") return "Afternoon";
  if (slot === "after_hours") return "After-hours";
  return slot;
}

async function findBooking(supabase: ReturnType<typeof serviceClient>, token: string) {
  const hash = await sha256Hex(token);
  const { data } = await supabase
    .from("bookings")
    .select(
      "id, status, window_date, window_slot, cancel_reason, cancelled_at, notes, service_type_id, customer_id, lead_id, token_expires_at",
    )
    .eq("manage_token_hash", hash)
    .maybeSingle();
  return data;
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
    const token = String(body.token ?? "").trim();
    const action = String(body.action ?? "get");
    if (!token) return json({ error: "Missing link" }, 400);

    const supabase = serviceClient();
    const booking = await findBooking(supabase, token);
    if (!booking) return json({ error: "Visit not found" }, 404);
    if (
      booking.token_expires_at &&
      new Date(booking.token_expires_at).getTime() < Date.now()
    ) {
      return json({ error: "This link has expired" }, 410);
    }

    let serviceTitle = "Visit";
    if (booking.service_type_id) {
      const { data: service } = await supabase
        .from("service_types")
        .select("title")
        .eq("id", booking.service_type_id)
        .maybeSingle();
      serviceTitle = service?.title ?? serviceTitle;
    }

    const { data: customer } = booking.customer_id
      ? await supabase
          .from("customers")
          .select("name, email, phone")
          .eq("id", booking.customer_id)
          .maybeSingle()
      : { data: null };

    if (action === "get") {
      return json({
        booking: {
          id: booking.id,
          status: booking.status,
          window_date: booking.window_date,
          window_slot: booking.window_slot,
          cancel_reason: booking.cancel_reason,
          service_title: serviceTitle,
        },
      });
    }

    const settings = await shopSettings(supabase);
    const origin = siteUrl();

    if (action === "reschedule") {
      const windowDate = String(body.window_date ?? "");
      const windowSlot = String(body.window_slot ?? "");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(windowDate)) {
        return json({ error: "Pick a date" }, 400);
      }
      if (!["morning", "afternoon", "after_hours"].includes(windowSlot)) {
        return json({ error: "Pick a window" }, 400);
      }
      if (booking.status === "cancelled") {
        return json({ error: "This visit was cancelled." }, 400);
      }

      const { error } = await supabase.rpc("try_reschedule_booking", {
        p_booking_id: booking.id,
        p_window_date: windowDate,
        p_window_slot: windowSlot,
      });
      if (error) {
        if ((error.message ?? "").includes("WINDOW_FULL")) {
          return json({ error: "That window just filled up. Pick another." }, 409);
        }
        throw error;
      }

      await supabase.rpc("log_activity", {
        p_entity_type: "booking",
        p_entity_id: booking.id,
        p_action: "booking.rescheduled",
        p_actor_type: "customer",
        p_metadata: {
          from: `${booking.window_date} ${booking.window_slot}`,
          to: `${windowDate} ${windowSlot}`,
        },
      });

      if (settings.shopEmail) {
        await sendEmail(supabase, {
          kind: "admin_new_booking",
          to: settings.shopEmail,
          subject: `Reschedule — ${customer?.name ?? "Customer"} — ${windowDate}`,
          html: `<p>${customer?.name ?? "A customer"} moved a visit to ${windowDate}, ${slotLabel(windowSlot)}.</p>
            <p><a href="${origin}/admin/bookings/${booking.id}">Open in the shop office</a></p>`,
          entityType: "booking",
          entityId: booking.id,
        });
      }
      if (customer?.email) {
        await sendEmail(supabase, {
          kind: "customer_reschedule",
          to: customer.email,
          subject: `Visit moved — ${settings.shopName}`,
          html: `<p>Hi ${customer.name},</p>
            <p>Your ${serviceTitle} is now <strong>${windowDate}</strong>, ${slotLabel(windowSlot)}.</p>
            <p><a href="${origin}/b/${token}">Manage this visit</a></p>`,
          entityType: "booking",
          entityId: booking.id,
        });
      }

      return json({
        booking: {
          id: booking.id,
          status: booking.status,
          window_date: windowDate,
          window_slot: windowSlot,
          service_title: serviceTitle,
        },
      });
    }

    if (action === "cancel") {
      const reason = String(body.reason ?? "").trim();
      if (!reason) return json({ error: "Tell us why you are cancelling" }, 400);
      if (booking.status === "cancelled") {
        return json({ error: "This visit is already cancelled." }, 400);
      }

      const cancelledAt = new Date().toISOString();
      const { error } = await supabase
        .from("bookings")
        .update({
          status: "cancelled",
          cancel_reason: reason,
          cancelled_at: cancelledAt,
        })
        .eq("id", booking.id);
      if (error) throw error;

      await supabase.rpc("log_activity", {
        p_entity_type: "booking",
        p_entity_id: booking.id,
        p_action: "booking.cancelled",
        p_actor_type: "customer",
        p_metadata: { reason },
      });

      if (settings.shopEmail) {
        await sendEmail(supabase, {
          kind: "admin_new_booking",
          to: settings.shopEmail,
          subject: `Cancelled visit — ${customer?.name ?? "Customer"}`,
          html: `<p>${customer?.name ?? "A customer"} cancelled ${booking.window_date} ${slotLabel(booking.window_slot)}.</p>
            <p>Reason: ${reason}</p>
            <p><a href="${origin}/admin/bookings/${booking.id}">Open in the shop office</a></p>`,
          entityType: "booking",
          entityId: booking.id,
        });
      }
      if (customer?.email) {
        await sendEmail(supabase, {
          kind: "customer_cancel",
          to: customer.email,
          subject: `Visit cancelled — ${settings.shopName}`,
          html: `<p>Hi ${customer.name},</p>
            <p>We cancelled your ${serviceTitle} on ${booking.window_date}.</p>
            ${settings.shopPhone ? `<p>Need us back? Call ${settings.shopPhone}.</p>` : ""}`,
          entityType: "booking",
          entityId: booking.id,
        });
      }

      return json({
        booking: {
          id: booking.id,
          status: "cancelled",
          window_date: booking.window_date,
          window_slot: booking.window_slot,
          cancel_reason: reason,
          service_title: serviceTitle,
        },
      });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (error) {
    return json(
      {
        error:
          error instanceof Error ? error.message : "Could not update that visit",
      },
      500,
    );
  }
});
