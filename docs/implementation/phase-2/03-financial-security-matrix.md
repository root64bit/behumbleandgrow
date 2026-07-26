# 03. Financial Security & RLS Compliance Matrix

## Security Controls Tested (`src/test/payment.test.ts`)
- Candidate RLS Restriction: **STRICT DENY** (Candidates cannot mutate payment status or record fake payments directly in PostgreSQL).
- Secret Exposure Audit: **PASSED** (`SQUARE_ACCESS_TOKEN` is prohibited from Vite environment declarations).
- Feature Flag Bypass: **VERIFIED** (Application fee automatically bypassed during technical candidate pilot).
- Transaction Logging: Payments logged to `public.payments` with `payment_provider = 'square'`.
