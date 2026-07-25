# Component Mapping — Candidate Interviews List

## Modular Components (`src/components/candidate/interviews/`)

| Component | Purpose |
|---|---|
| `CandidateInterviewsHeader.tsx` | Header bar with back button, H1 title & candidate avatar / initials |
| `CandidateInterviewsSummary.tsx` | Metric cards (Upcoming, Action Required, Confirmed, Completed) |
| `CandidateInterviewsTabs.tsx` | Filter tabs (`Upcoming`, `Action Required`, `Completed`, `Rescheduled`, `All`) |
| `CandidateInterviewsSearch.tsx` | Search bar filtering by job title or employer |
| `CandidateInterviewCard.tsx` | Interview card displaying job title, dual time, format, and actions |
| `CandidateInterviewStatusBadge.tsx` | Canonical status badge component |
| `CandidateInterviewTimeDisplay.tsx` | Dual time component (Candidate Local vs UAE `Asia/Dubai`) |
| `CandidateInterviewJoinState.tsx` | Access window status indicator & Join room button |
| `CandidateInterviewConfirmDialog.tsx` | Concurrency-safe confirmation dialog |
| `CandidateInterviewRescheduleDialog.tsx` | Reschedule request modal dialog |
| `CandidateInterviewsPreparationSummary.tsx` | Preparation checklist component |
| `CandidateInterviewsSkeleton.tsx` | Pulse loading skeleton loader |
| `CandidateInterviewsEmptyState.tsx` | Genuine empty state component ("No interviews scheduled yet") |
| `CandidateInterviewsErrorState.tsx` | Fatal error state component |
