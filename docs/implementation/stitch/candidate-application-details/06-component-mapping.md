# Component Mapping — Candidate Application Details & Timeline

## Modular Architecture (`src/components/candidate/application-details/`)

| Component | Responsibility |
|---|---|
| `CandidateApplicationDetailsHeader.tsx` | Header bar with back button, H1 title & candidate avatar / initials |
| `CandidateApplicationJobSummary.tsx` | Job title, employer disclosure, location, reference badge & job tags |
| `CandidateApplicationEmployerDisplay.tsx` | Database-backed employer disclosure component |
| `CandidateApplicationRoadmap.tsx` | Authoritative 8-stage progress track & percentage bar |
| `CandidateApplicationStageTimeline.tsx` | Actual timestamped historical event timeline |
| `CandidateApplicationScreeningSummary.tsx` | Read-only screening answers snapshot |
| `CandidateApplicationDocumentRequirements.tsx` | Connected vault document status list & `/candidate/documents` link |
| `CandidateApplicationInterviewSummary.tsx` | Scheduled interview card with detail link (`/candidate/interviews/:interviewId`) |
| `CandidateApplicationOfferSummary.tsx` | Conditional offer card with detail link (`/candidate/offers/:offerId`) |
| `CandidateApplicationPlacementSummary.tsx` | Placement milestone card with detail link (`/candidate/placement`) |
| `CandidateApplicationPaymentNotice.tsx` | Exact pilot fee notice (*"Application fee disabled during the closed technical pilot."*) |
| `CandidateApplicationWithdrawalDialog.tsx` | Concurrency-protected withdrawal dialog |
| `CandidateApplicationSupportCard.tsx` | Contact support & escalation CTA card |
| `CandidateApplicationDetailsSkeleton.tsx` | Pulse loading skeleton loader |
| `CandidateApplicationDetailsNotFound.tsx` | 404 Not Found state component |
| `CandidateApplicationDetailsErrorState.tsx` | Fatal error state component |
