# Candidate-Visible Status & Timeline Architecture

## Overview
The Candidate Application Details module decouples the **authoritative 8-stage progress roadmap** from the **historical timestamped event timeline**.

## Roadmap vs Timeline

| Concept | Purpose | Component | Data Source |
|---|---|---|---|
| **Roadmap** | Authoritative 8-stage progress track (`Application`, `Eligibility`, `Documents`, `Recruitment Review`, `Employer Review`, `Interview`, `Conditional Offer`, `Placement`) | `CandidateApplicationRoadmap.tsx` | Derived from `application.stage` |
| **Event Timeline** | Actual timestamped historical activity that really occurred | `CandidateApplicationStageTimeline.tsx` | Derived from `status_history` filtered to exclude internal notes |

## Internal Event Exclusion Rules
- Network queries select `status_history` events with candidate-visible messages.
- Internal reviewer notes (`internal_note`), recruiter internal logs, and operations escalation records are excluded prior to network transmission.
- Duplicate status transitions without new candidate messages are deduplicated.
- Events are sorted stably by `created_at ASC`, `id ASC`.
