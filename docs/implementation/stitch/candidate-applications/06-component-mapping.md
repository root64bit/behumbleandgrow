# Component Mapping — Candidate Applications List

## Modular Architecture (`src/components/candidate/applications/`)

| Component | Responsibility |
|---|---|
| `CandidateApplicationsHeader.tsx` | Header banner with workspace badge, H1 title, subtitle, search input & primary action |
| `CandidateApplicationsSummary.tsx` | Metric cards (Total, Active, Action Required, Interviews, Offers) |
| `CandidateApplicationsTabs.tsx` | Horizontally scrollable status pill tabs |
| `CandidateApplicationCard.tsx` | Application card with job info, disclosure, status badge, stage progress & next action CTA |
| `CandidateApplicationStageProgress.tsx` | 8-stage progress track bar & percentage indicator |
| `CandidateApplicationStatusBadge.tsx` | Tone-coded canonical status badge |
| `CandidateApplicationsPagination.tsx` | Pagination control for multi-page application lists |
| `CandidateApplicationsEmptyState.tsx` | Empty applications state for new candidates |
| `CandidateApplicationsNoResults.tsx` | Filtered search no-results state |
| `CandidateApplicationsSkeleton.tsx` | Pulse skeleton loading state |
| `CandidateApplicationsSectionError.tsx` | Inline error banner for section-level failures |
| `CandidateApplicationsErrorState.tsx` | Fatal error page wrapper |
