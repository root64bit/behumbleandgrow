# 02. Supabase Edge Functions & Square Webhook Specifications

## Implemented Edge Functions
1. `supabase/functions/create-square-payment/index.ts`:
   - Endpoint receiving application payment token (nonce), executing charge via Square `/v2/payments` API with idempotency keys.
2. `supabase/functions/handle-square-webhook/index.ts`:
   - Webhook listener verifying Square HMAC-SHA256 signature and updating `public.payments` and `public.refunds` tables.
