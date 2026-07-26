# Current Code Audit — Phase A8: Candidate Conditional Offers List

## Baseline Route & Page Audit
- **Canonical Route**: `/candidate/offers` (registered in `src/routes/index.tsx` inside `CandidateLayout`).
- **Page File**: `src/pages/candidate/CandidateOffersPage.tsx` previously contained single hardcoded mock offer object without pagination, filtering, search, or status categorization.

## Database Schema & Tables
- **Primary Offer Table**: `public.offers` (and legacy alias `public.job_offers`).
- **Relational Tables**: `public.applications`, `public.jobs`, `public.employers`, `public.organisations`, `public.status_history`, `public.candidate_documents`.

## Security & Exclusion Audit
- Internal employer negotiation notes, recruiter evaluation scores, partner commissions, and raw signed document tokens are excluded at the service query layer.
- Employer identity disclosure relies on `resolveCandidateEmployerDisplay(application)` ensuring undisclosed employers display as `"Approved UAE Employer"`.
