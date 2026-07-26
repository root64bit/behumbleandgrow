# Current Code Audit — Candidate Application Details & Timeline

## File Inspection Results
- **Page Component**: `src/pages/candidate/CandidateApplicationDetailsPage.tsx` `[NEW]`
- **Router Configuration**: `src/routes/index.tsx` (Route `/candidate/applications/:applicationId` to be added)
- **Services & Hooks**:
  - `src/services/candidate-application-details.service.ts` `[NEW]`
  - `src/hooks/candidate/useCandidateApplicationDetails.ts` `[NEW]`
  - `src/lib/candidate/applicationTimeline.ts` `[NEW]`
  - Reused `applicationStatus.ts` and `applicationNextAction.ts` from Phase A4.

## Current Code Gaps & Required Enhancements
1. **Route Addition**:
   - Register `/candidate/applications/:applicationId` under Candidate `RoleGuard` in `src/routes/index.tsx`.
2. **Ownership & RLS Protection**:
   - `loadMyApplicationDetails(applicationId)` verifies that `application.candidate_id` matches `auth.uid()` -> `profiles.id` -> `candidates.id`.
   - Access to unowned or invalid application IDs returns a safe 404 Not Found state without disclosing existence to unauthorized users.
3. **Internal Event & Note Exclusion**:
   - Timeline maps candidate-visible events (`application_submitted`, `documents_reviewed`, `employer_submitted`, `interview_scheduled`, `offer_issued`), strictly excluding internal Operations notes, recruiter scores, or employer private feedback.
4. **Employer Disclosure Rules**:
   - Masks employer name (`"Approved UAE Employer"`) prior to stage 5 (`employer_submitted`) and shows legal trading name post-stage 5.
5. **Fee Disclaimer**:
   - Fee state displays: *"Application fee disabled during closed technical pilot."*
