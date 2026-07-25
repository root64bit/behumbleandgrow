# Component & Query Architecture — Candidate Placement

## Component Tree
- `CandidatePlacementPage.tsx`
  - `CandidatePlacementHeader.tsx`
  - `CandidatePlacementOverview.tsx`
  - `CandidatePlacementCurrentStatusCard.tsx`
  - `CandidatePlacementNextAction.tsx`
    - `CandidatePlacementAcknowledgementDialog.tsx`
  - `CandidatePlacementTimeline.tsx`
  - `CandidatePlacementDocumentReadinessCard.tsx`
  - `CandidatePlacementWorkPermitCard.tsx`
  - `CandidatePlacementVisaCard.tsx`
  - `CandidatePlacementMedicalCard.tsx`
  - `CandidatePlacementTravelCard.tsx`
  - `CandidatePlacementAccommodationCard.tsx`
  - `CandidatePlacementOnboardingCard.tsx`
  - `CandidatePlacementComplianceNotice.tsx`
  - `CandidatePlacementSupportCard.tsx`
  - `CandidatePlacementSkeleton.tsx`
  - `CandidatePlacementEmptyState.tsx`
  - `CandidatePlacementErrorState.tsx`
  - `CandidatePlacementConflictState.tsx`

## Query Architecture
- Single authenticated candidate lookup with explicit `candidate_id = auth.uid()` resolution.
- Projections select only candidate-visible columns, excluding internal staff notes, government portal secrets, or raw credentials.
