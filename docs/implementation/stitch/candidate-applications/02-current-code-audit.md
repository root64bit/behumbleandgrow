# Current Code Audit — Candidate Applications List

## File Inspection Results
- **Page Component**: `src/pages/candidate/CandidateApplicationsPage.tsx`
- **Application Services**: `src/services/application.service.ts`
- **TypeScript Schema**: `Application` interface in `src/lib/supabase/types.ts`

## Current Code Gaps & Required Enhancements
1. **Layout Integration**:
   - `/candidate/applications` is rendered as a child route inside `<CandidateLayout>` in `src/routes/index.tsx`. `CandidateApplicationsPage.tsx` must render inner page content directly without double-mounting `CandidateLayout`.
2. **Stitch Visual & Hierarchy Alignment**:
   - Missing top summary metrics cards (Total Applications, Active, Action Required, Interviews, Offers).
   - Missing search bar input (`placeholder="Search applications..."`).
   - Missing horizontal pill tabs (`All`, `Active`, `Action Required`, `Interviews`, `Offers`, `Closed`).
   - Missing application stage progress bar and percentage track (0–100%).
   - Missing deterministic candidate next-action resolver (e.g. `Upload Document`, `Complete Screening`, `Review Interview`, `Review Offer`).
3. **Employer Disclosure Security**:
   - Must implement `resolveCandidateEmployerDisplay(application)` to show `"Approved UAE Employer"` prior to authorized disclosure stage and legal trading name post-disclosure.
4. **Network Field Projection Privacy**:
   - Database queries must select Candidate-visible fields explicitly, excluding internal Operations, Employer, or Recruitment Partner notes over the network.
5. **Pilot Policy Disclaimer**:
   - Fee state displays: *"Application fee disabled during closed technical pilot."*
