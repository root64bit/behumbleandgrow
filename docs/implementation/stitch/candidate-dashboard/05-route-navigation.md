# Route & Navigation Verification Matrix — Candidate Dashboard

## Overview
All Candidate Dashboard cards and layout navigation items link directly to canonical detail or list routes.

---

## Navigation Verification Matrix

| Action / Widget Element | Destination Canonical Route | Route Parameter Usage | Guard Status |
|---|---|---|---|
| Dashboard Link | `/candidate/dashboard` | None | Protected (`candidate`) |
| Profile Link | `/candidate/profile` | None | Protected (`candidate`) |
| Documents Link | `/candidate/documents` | None | Protected (`candidate`) |
| Jobs Navigation Link | `/candidate/jobs` | None | Protected (`candidate`) |
| Applications Link | `/candidate/applications` | None | Protected (`candidate`) |
| Interviews Link | `/candidate/interviews` | None | Protected (`candidate`) |
| Offers Link | `/candidate/offers` | None | Protected (`candidate`) |
| Placement Link | `/candidate/placement` | None | Protected (`candidate`) |
| Support Link | `/candidate/support` | None | Protected (`candidate`) |
| Settings Link | `/candidate/settings` | None | Protected (`candidate`) |
| Active Application Card | `/candidate/applications/:applicationId` | `:applicationId` | Protected (`candidate`) |
| Scheduled Interview Card | `/candidate/interviews/:interviewId` | `:interviewId` | Protected (`candidate`) |
| Conditional Offer Card | `/candidate/offers/:offerId` | `:offerId` | Protected (`candidate`) |
| Recommended Job Card | `/candidate/jobs/:slug` | `:slug` | Protected (`candidate`) |
| Urgent Action Card | Specific route (`/candidate/documents`, `/eligibility`, etc.) | None | Protected (`candidate`) |

---

## Settings Route Safeguard
The route `/candidate/settings` is bound to `CandidateSettingsPage`. It resolves to an intentional settings management view and does not trigger fallback redirects.
