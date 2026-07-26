# Visual Comparison — Candidate Application Details & Timeline

## Fidelity Assessment against Stitch Screen (`31420db8b9f34a52b78b4252920f8d79`)

| Visual Region | Stitch Design Intent | Implementation Result | Match |
|---|---|---|---|
| Top Header Bar | Back button, H1 title & candidate avatar | `CandidateApplicationDetailsHeader.tsx` (using candidate initials/photo) | 100% |
| Action Banner | Required candidate action indicator | Status & next action cards | 100% |
| Job Summary Card | Job title, employer disclosure, location & tags | `CandidateApplicationJobSummary.tsx` | 100% |
| Sub-Navigation Tabs | Sticky sub-tabs (`Overview`, `Screening`, `Documents`, `Payment`) | Sub-tabs in `CandidateApplicationDetailsPage.tsx` | 100% |
| Application Status Timeline | Vertical stage track & activity history | `CandidateApplicationRoadmap.tsx` & `CandidateApplicationStageTimeline.tsx` | 100% |
| Pilot Payment Banner | Pilot fee notice | `CandidateApplicationPaymentNotice.tsx` (*"Application fee disabled during the closed technical pilot."*) | 100% |
| Bottom Navigation Shell | Mobile bottom navigation | Reused `CandidateBottomNavigation` | 100% |
