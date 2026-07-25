# Current Code Audit — Candidate Placement & Relocation

## Audit Findings

### 1. Existing Page & Route
- **Page File**: [CandidatePlacementPage.tsx](file:///C:/Users/IBZ/Downloads/behumbleandgrow/src/pages/candidate/CandidatePlacementPage.tsx)
- **Current Route**: `/candidate/placement` inside `CandidateLayout` in [src/routes/index.tsx](file:///C:/Users/IBZ/Downloads/behumbleandgrow/src/routes/index.tsx).
- **Existing Logic**: Simple hardcoded 7-step timeline array with mock values (`Premier Hospitality Group`, `15 Aug 2026`). Missing dynamic backend integration, Supabase queries, candidate action resolvers, real RLS checks, and error/empty state handling.

### 2. Connected Placement Components & References
- [CandidatePlacementCard.tsx](file:///C:/Users/IBZ/Downloads/behumbleandgrow/src/components/candidate/CandidatePlacementCard.tsx): Displays mobility tracker on dashboard.
- [CandidatePlacementSummary.tsx](file:///C:/Users/IBZ/Downloads/behumbleandgrow/src/components/candidate/CandidatePlacementSummary.tsx): Summary card component.
- [CandidateApplicationPlacementSummary.tsx](file:///C:/Users/IBZ/Downloads/behumbleandgrow/src/components/candidate/application-details/CandidateApplicationPlacementSummary.tsx): Placement summary on Application Details page.
- [CandidateOfferDecisionSuccess.tsx](file:///C:/Users/IBZ/Downloads/behumbleandgrow/src/components/candidate/offer-details/CandidateOfferDecisionSuccess.tsx): Directs candidate to `/candidate/placement` after accepting offer.

### 3. Identified Gaps & Deficiencies
- No database table or service for loading candidate placement state (`placements`, `placement_milestones`, `placement_candidate_actions`, `placement_acknowledgements`).
- Lack of security projection: Sensitive references (e.g. visa numbers, passport numbers, work permit numbers) were unmasked.
- Missing candidate next-action resolution.
- Missing Section Error and Fatal Error recovery states.
- Missing digital acknowledgement modal & concurrency handling.
