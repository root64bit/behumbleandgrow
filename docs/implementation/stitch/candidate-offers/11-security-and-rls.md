# Security & RLS Policy Mapping — Phase A8

## Real vs Mocked Verification Distinction
- **Frontend Verification**: Proved by Vitest unit tests & Playwright E2E suite using mocked session.
- **Hosted/Deployed PostgreSQL RLS**: Requires live Supabase connection to verify backend enforcement on `public.offers`.
- **Ownership Scope**: `applications.candidate_id = auth.uid()`.
- **Data Protection**: Internal employer notes and partner private comments are omitted at the network select level.
