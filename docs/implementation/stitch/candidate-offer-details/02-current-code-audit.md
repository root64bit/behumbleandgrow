# Current Code Audit — Phase A9: Candidate Conditional Offer Details & Decision Workflow

## Baseline Route & Component Audit
- **Canonical Route**: `/candidate/offers/:offerId` (to be registered in `src/routes/index.tsx` inside CandidateLayout).
- **Target Page**: `src/pages/candidate/CandidateOfferDetailsPage.tsx` (to be created with lazy import in `src/routes/index.tsx`).

## Database Schema & Tables
- **Primary Offer Table**: `public.offers`.
- **Relational Tables**: `public.applications`, `public.jobs`, `public.employers`, `public.organisations`, `public.status_history`, `public.candidate_documents`.

## Security & Exclusion Audit
- Internal employer negotiation notes, recruiter evaluation scores, partner commissions, and raw signed document tokens are excluded at the service query layer.
- Employer identity disclosure relies on `resolveCandidateEmployerDisplay(application)` ensuring undisclosed employers display as `"Approved UAE Employer"`.
- Offer document access uses Level 3 server-verified short-lived signed URLs.
- Acceptance and decline actions use concurrency-protected mutations checking `expected_updated_at` / version tokens and enforcing server-side expiry check.
