# 01. Square Payment Architecture Specification

## Overview
This report documents the integration of **Square Payments API** (replacing Stripe) into the **BE HUMBLE & GROW** recruitment platform.

## Key Architectural Decisions
1. **Frontend Web Payments SDK**:
   - Integrated `SquarePaymentForm.tsx` in `src/components/SquarePaymentForm.tsx`.
   - Uses `VITE_SQUARE_APP_ID`, `VITE_SQUARE_LOCATION_ID`, and `VITE_SQUARE_ENVIRONMENT`.
2. **Feature Flag Control**:
   - Controlled by `VITE_APPLICATION_FEE_ENABLED`. When `false`, payments automatically bypass with a clear pilot notification.
3. **Secret Isolation**:
   - `SQUARE_ACCESS_TOKEN` and `SQUARE_WEBHOOK_SIGNATURE_KEY` are kept strictly in Supabase Edge Function environment secrets (`supabase secrets set`). Zero backend payment tokens are exposed to Vite browser bundles.
