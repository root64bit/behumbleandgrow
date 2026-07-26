# Application Status & 8-Stage Progress Model

## Overview
The Candidate Applications module projects canonical PostgreSQL application statuses into clear, human-readable labels, stage progress percentages, and active vs closed categorizations.

## Status Mapping Table

| Canonical DB Status | Candidate-Facing Label | Stage Index (1–8) | Stage Progress % | Category |
|---|---|---|---|---|
| `draft` | Draft | 1 | 13% | Active |
| `submitted` | Submitted | 1 | 13% | Active |
| `eligibility_passed` / `qualified` | Eligibility Passed | 2 | 25% | Active |
| `onboarding` | Document Review | 3 | 38% | Active |
| `partner_assigned` / `partner_interview` | Partner Review | 4 | 50% | Active |
| `employer_submitted` | Submitted to Employer | 5 | 63% | Active |
| `employer_interview` / `interview_scheduled` | Interview Scheduled | 6 | 75% | Active |
| `offer_issued` | Conditional Offer | 7 | 88% | Active |
| `offer_accepted` | Offer Accepted | 7 | 88% | Active |
| `visa_processing` / `placed` | Placement in Progress | 8 | 100% | Active |
| `rejected` | Not Selected | 1 | 13% | Closed |
| `withdrawn` | Withdrawn | 1 | 13% | Closed |
| `closed` | Closed | 1 | 13% | Closed |
| *Fallback* | Status being updated | 1 | 13% | Active |
