# Component Mapping — Stitch Candidate Dashboard

## Overview
This document maps each section of the Stitch Candidate Dashboard screen (`51d25ad15925402088cc0c3035815122`) to modular React components in the codebase.

---

## Component Inventory & Mapping Table

| Stitch Screen Section | Target Component File | Primary Purpose | State Dependencies |
|---|---|---|---|
| Welcome Header & Profile Bar | `src/components/candidate/CandidateWelcomeCard.tsx` | Displays greeting, candidate name, candidate ref ID, and progress bar | `CandidateProfile`, completeness % |
| Urgent Action Cards (Bento) | `src/components/candidate/CandidateNextActionCard.tsx` | Urgent priority next step card linking to detail action | `CandidateNextStep` |
| Application Journey Timeline | `src/components/candidate/CandidateJourneyTimeline.tsx` | 10-stage UAE career journey node timeline | DB `CandidateStage` & DB statuses |
| Profile Readiness Card | `src/components/candidate/CandidateProfileReadiness.tsx` | Completeness %, missing section checklist, link to `/candidate/profile` | Profile sections breakdown |
| Document Summary Card | `src/components/candidate/CandidateDocumentSummary.tsx` | Document verification breakdown, link to `/candidate/documents` | DB `candidate_documents` summary |
| Active Applications Card | `src/components/candidate/CandidateApplicationsSummary.tsx` | Latest active applications summary, link to `/candidate/applications/:id` | DB `applications` |
| Upcoming Interview Card | `src/components/candidate/CandidateInterviewSummary.tsx` | Scheduled interview notice, local & GST times, link to `/candidate/interviews/:id` | Interview record (if exists) |
| Conditional Offer Card | `src/components/candidate/CandidateOfferSummary.tsx` | Offer salary AED, benefits, compliance warning, link to `/candidate/offers/:id` | Offer record (if exists) |
| Placement Progress Card | `src/components/candidate/CandidatePlacementSummary.tsx` | Relocation milestone & visa status, link to `/candidate/placement` | Placement record (if exists) |
| Recommended Jobs | `src/components/candidate/CandidateRecommendedJobs.tsx` | Recommended active jobs cards, link to `/candidate/jobs/:slug` | DB `jobs` |
| Notifications Summary | `src/components/candidate/CandidateNotificationSummary.tsx` | Candidate-visible alerts and deep links | Safe candidate notifications |
| Skeleton Loading State | `src/components/candidate/CandidateDashboardSkeleton.tsx` | Skeleton matching Stitch layout during data fetch | `isLoading` state |
| Workspace Empty State | `src/components/candidate/CandidateDashboardEmptyState.tsx` | Guidance for newly registered candidate with no applications | Empty resource states |
| Error State | `src/components/candidate/CandidateDashboardErrorState.tsx` | Error banner with retry & support actions | Fatal error state |
