# Current Code Audit — Candidate Document Vault

## File Inspection Results
- **Page Component**: `src/pages/candidate/CandidateDocumentsPage.tsx`
- **Document Services**: `src/services/document.service.ts`, `src/services/storage.service.ts`
- **TypeScript Schema**: `CandidateDocument` interface in `src/lib/supabase/types.ts`

## Current Code Gaps & Required Enhancements
1. **Layout & Shell**:
   - Current `CandidateDocumentsPage.tsx` uses a standalone form container instead of wrapping inside `CandidateLayout` with `CandidateSidebar` and `CandidateBottomNavigation`.
2. **Stitch Visual Alignment**:
   - Missing the top **Verification Progress / Document Readiness Summary Card** with completion progress bar.
   - Missing required vs optional document card grid with status badges (`Verified`, `Under Review`, `Rejected`, `Missing`).
   - Missing slide-up upload action sheet modal for mobile.
3. **Security & Privacy Controls**:
   - Short-lived signed URLs generated via `storage.service.ts` (30 mins / 1800s default) require expiration parameter parameterization (5–30 mins max).
   - Candidate identity ownership must resolve via schema chain: `auth.uid()` → `profiles.id` → `candidates.id` → `candidate_documents.candidate_id`.
   - Rejection reasons must display only Candidate-visible messages, excluding internal Operations notes.
4. **File Validation & Types**:
   - Enforce 5MB limit for CVs and 10MB limit for identity documents/certificates.
   - Enforce MIME types: `application/pdf`, `image/jpeg`, `image/png`, `image/webp`.
5. **Demo Data Restrictions**:
   - Controlled by `import.meta.env.DEV && import.meta.env.VITE_DEMO_DATA_ENABLED === "true"`. Empty database queries show intentional empty vault state without sample file injection.
