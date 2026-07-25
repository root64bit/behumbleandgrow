// Supabase Edge Function: create-square-payment
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SQUARE_ACCESS_TOKEN = Deno.env.get("SQUARE_ACCESS_TOKEN");
const SQUARE_LOCATION_ID = Deno.env.get("SQUARE_LOCATION_ID");
const SQUARE_ENV = Deno.env.get("SQUARE_ENVIRONMENT") || "sandbox";

const SQUARE_API_URL = SQUARE_ENV === "production" 
  ? "https://connect.squareup.com/v2/payments"
  : "https://connect.squareupsandbox.com/v2/payments";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const { applicationId, candidateId, amountGBP, nonce } = await req.json();

    if (!SQUARE_ACCESS_TOKEN) {
      throw new Error("Missing SQUARE_ACCESS_TOKEN secret in Edge Function environment.");
    }

    const idempotencyKey = `idemp-sq-${applicationId}-${Date.now()}`;

    // Execute charge via Square Payments API v2
    const sqResponse = await fetch(SQUARE_API_URL, {
      method: "POST",
      headers: {
        "Square-Version": "2024-01-18",
        "Authorization": `Bearer ${SQUARE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_id: nonce || "cnon:card-nonce-ok",
        idempotency_key: idempotencyKey,
        amount_money: {
          amount: (amountGBP || 15) * 100, // Amount in pence/cents
          currency: "GBP",
        },
        location_id: SQUARE_LOCATION_ID,
        note: `Be Humble & Grow Application Fee: ${applicationId}`,
      }),
    });

    const sqResult = await sqResponse.json();

    if (!sqResponse.ok) {
      return new Response(JSON.stringify({ success: false, error: sqResult.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      paymentId: sqResult.payment.id,
      status: sqResult.payment.status,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
