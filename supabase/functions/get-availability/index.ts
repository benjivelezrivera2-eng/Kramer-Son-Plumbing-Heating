import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { cors, json, serviceClient } from "./shared.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const from = String(body.from ?? "");
    const to = String(body.to ?? "");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to)) {
      return json({ error: "from and to dates are required" }, 400);
    }

    const supabase = serviceClient();
    const { data, error } = await supabase.rpc("get_open_windows", {
      p_from: from,
      p_to: to,
    });
    if (error) throw error;
    return json({ windows: data ?? [] });
  } catch (error) {
    return json(
      {
        error:
          error instanceof Error ? error.message : "Could not load windows",
      },
      500,
    );
  }
});
