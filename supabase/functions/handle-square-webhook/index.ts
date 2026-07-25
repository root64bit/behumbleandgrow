// Supabase Edge Function: handle-square-webhook
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SQUARE_WEBHOOK_SIGNATURE_KEY = Deno.env.get("SQUARE_WEBHOOK_SIGNATURE_KEY");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*" } });
  }

  try {
    const signature = req.headers.get("x-square-hmacsha256-signature");
    const bodyText = await req.text();

    if (!SQUARE_WEBHOOK_SIGNATURE_KEY) {
      console.warn("Square Webhook Key not configured. Skipping signature validation.");
    }

    const payload = JSON.parse(bodyText);
    const eventType = payload.type;

    console.log(`[Square Webhook] Received event: ${eventType}`, payload.event_id);

    // Process payment.updated or refund.updated events
    if (eventType === "payment.updated") {
      const payment = payload.data.object.payment;
      console.log(`Square Payment ${payment.id} status updated to: ${payment.status}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
});
