# 01 — Authoritative Candidate Screen Inventory

| Phase | Candidate screen | Stitch ID | Route | Page | Status | Gap |
|---|---|---|---|---|---|---|
| A1 | Candidate Auth | `a01-auth-screen-id` | `/candidate/login` | `CandidateLoginPage.tsx` | Implemented | Mocked auth session in test |
| A2 | Candidate Eligibility & Onboarding | `a02-eligibility-id` | `/candidate/eligibility` | `CandidateEligibilityPage.tsx` | Implemented | Technical pilot disclaimer active |
| A3 | Candidate Dashboard | `a03-dashboard-id` | `/candidate/dashboard` | `CandidateDashboardPage.tsx` | Implemented | Responsive cards verified |
| A4 | Candidate Profile | `a04-profile-id` | `/candidate/profile` | `CandidateProfilePage.tsx` | Implemented | Inline editing supported |
| A5 | Candidate Document Vault | `a05-documents-id` | `/candidate/documents` | `CandidateDocumentsPage.tsx` | Implemented | Private bucket signed URLs mocked |
| A6 | Candidate Applications List | `a06-applications-id` | `/candidate/applications` | `CandidateApplicationsPage.tsx` | Implemented | Disclosure policy active |
| A6 | Candidate Application Details | `a06-app-details-id` | `/candidate/applications/:applicationId` | `CandidateApplicationDetailsPage.tsx` | Implemented | Disclosure policy active |
| A7 | Candidate Interviews List | `a07-interviews-id` | `/candidate/interviews` | `CandidateInterviewsPage.tsx` | Implemented | Local time zone formatting |
| A7 | Candidate Interview Details | `a07-int-details-id` | `/candidate/interviews/:interviewId` | `CandidateInterviewDetailsPage.tsx` | Implemented | Level 3 meeting access mocked |
| A8 | Candidate Conditional Offers List | `a08-offers-id` | `/candidate/offers` | `CandidateOffersPage.tsx` | Implemented | Expiry countdown active |
| A9 | Candidate Offer Details & Decision | `5d12fe82b279439bb9a92ce2b4f6400d` | `/candidate/offers/:offerId` | `CandidateOfferDetailsPage.tsx` | Implemented | Digital acceptance legal disclaimer active |
| A10 | Candidate Placement & Relocation | `a10-placement-id` | `/candidate/placement` | `CandidatePlacementPage.tsx` | Implemented | Official milestone controls mocked |
| A11 | Candidate Notifications Centre | `a11-notifications-id` | `/candidate/notifications` | `CandidateNotificationsPage.tsx` | Implemented | In-app PostgreSQL authoritative |
| A12 | Candidate Support Centre | `a12-support-id` | `/candidate/support` | `CandidateSupportPage.tsx` | Implemented | Category routing verified |
| A13 | Candidate Account Settings & Preferences | `886016231c624328a9d8985578242aff` / `8e9dddebe7c4473da05eb2f743b1ff71` | `/candidate/settings` | `CandidateSettingsPage.tsx` | Implemented | Hardened SECURITY DEFINER RPCs |
