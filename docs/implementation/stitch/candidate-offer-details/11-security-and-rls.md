# Security & RLS Policy Mapping — Phase A9

## Real vs Mocked Verification Distinction
- **Frontend Verification**: Proved by Vitest unit tests & Playwright E2E suite using mocked session.
- **Hosted/Deployed PostgreSQL RLS**: Requires live Supabase connection to verify backend enforcement on `public.offers` and `public.status_history`.
- **Ownership Scope**: `applications.candidate_id = auth.uid()`.
- **Data Protection**: Ephemeral signed URLs for document access expire in 10 minutes and are never persisted in local storage or client logs.
