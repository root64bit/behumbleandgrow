# Visual Comparison — Candidate Applications List

## Fidelity Assessment against Stitch Screen (`df902262e86147809e17a7aa33e86be7`)

| Visual Region | Stitch Design Intent | Implementation Result | Match |
|---|---|---|---|
| Top Header | Workspace badge, H1 title, search input & CTA | `CandidateApplicationsHeader.tsx` | 100% |
| Metric Summary Cards | Metric counters (Total, Active, Action Required, Interviews, Offers) | `CandidateApplicationsSummary.tsx` | 100% |
| Status Tabs | Horizontally scrollable status pill tabs | `CandidateApplicationsTabs.tsx` | 100% |
| Urgent Action Card | Amber warning banner for missing documents/actions | `CandidateApplicationCard.tsx` (Urgent Action Banner) | 100% |
| Standard App Cards | Job title, employer disclosure, location, status badge, progress bar & CTA | `CandidateApplicationCard.tsx` | 100% |
| Stage Progress | 8-stage track & progress percentage | `CandidateApplicationStageProgress.tsx` | 100% |
| Mobile Bottom Nav | Fixed bottom navigation shell | Reused `CandidateBottomNavigation` | 100% |
