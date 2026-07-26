# 01 — Authoritative Candidate Screen Inventory

| Phase | Candidate Screen Title | Exact Stitch Screen ID | Canonical Route | Actual Page Filename | Commit Baseline | Status | Known Gap |
|---|---|---|---|---|---|---|---|
| A1 | Login / Candidate Auth | `abcc44290965439687422002c5870239` | `/candidate/login` | `CandidateLoginPage.tsx` | `a01-auth-commit` | Verified | Mocked auth session in E2E tests |
| A2 | Check Your Eligibility / Onboarding | `6ce6300ad2114a3fb97ad822581cc451` | `/candidate/eligibility` | `CandidateEligibilityPage.tsx` | `a02-eligibility-commit` | Verified | Closed technical pilot disclaimer active |
| A3 | Candidate Dashboard | `51d25ad15925402088cc0c3035815122` | `/candidate/dashboard` | `CandidateDashboardPage.tsx` | `a03-dashboard-commit` | Verified | Realtime socket subscription mocked |
| A4 | My Profile | `886016231c624328a9d8985578242aff` | `/candidate/profile` | `CandidateProfilePage.tsx` | `a04-profile-commit` | Verified | Inline profile update active |
| A5 | My Documents | `116b946e36c54c548a61689965571fe6` | `/candidate/documents` | `CandidateDocumentsPage.tsx` | `a05-documents-commit` | Verified | Private bucket signed URLs mocked |
| A6 | My Applications List | `df902262e86147809e17a7aa33e86be7` | `/candidate/applications` | `CandidateApplicationsPage.tsx` | `a06-applications-commit` | Verified | Pre-authorisation disclosure policy active |
| A6 | Application Details | `31420db8b9f34a52b78b4252920f8d79` | `/candidate/applications/:applicationId` | `CandidateApplicationDetailsPage.tsx` | `a06-app-details-commit` | Verified | Stage snapshot rendered |
| A7 | My Interviews List | `c64b81f49f5c491d968886d8725878cc` | `/candidate/interviews` | `CandidateInterviewsPage.tsx` | `7240ab0` | Verified | IANA local time zone display active |
| A7 | Interview Details | `0b34be9d0368449bbdfb164f1ea143c2` | `/candidate/interviews/:interviewId` | `CandidateInterviewDetailsPage.tsx` | `bb87fc6` | Verified | Level 3 meeting access window mocked |
| A8 | Conditional Offers List | `732de5e314124a97b3315306f0eacfc4` | `/candidate/offers` | `CandidateOffersPage.tsx` | `5a85027` | Verified | Expiry countdown active |
| A9 | Conditional Offer Details | `5d12fe82b279439bb9a92ce2b4f6400d` | `/candidate/offers/:offerId` | `CandidateOfferDetailsPage.tsx` | `0d5741a` | Verified | Digital acceptance declarations active |
| A10 | Placement & Relocation Status | `36cf8cb692fb423f879170166d2d57fa` | `/candidate/placement` | `CandidatePlacementPage.tsx` | `d0accf8` | Verified | Official milestone controls mocked |
| A11 | Notifications Centre | `8e9dddebe7c4473da05eb2f743b1ff71` | `/candidate/notifications` | `CandidateNotificationsPage.tsx` | `02411c6` | Verified | PostgreSQL in-app authoritative |
| A12 | Support Ticket Management | `1eefb7abb6404e6bb200854fa1f8042b` | `/candidate/support` | `CandidateSupportPage.tsx` | `f283754` | Verified | Upload malware scanning mocked |
| A13 | My Profile & Workspace Settings | `886016231c624328a9d8985578242aff` | `/candidate/settings` | `CandidateSettingsPage.tsx` | `daeab6e` | Verified | SECURITY DEFINER RPCs hardened |
| A13 | Notifications & Preferences | `8e9dddebe7c4473da05eb2f743b1ff71` | `/candidate/settings` | `CandidateSettingsPage.tsx` | `daeab6e` | Verified | Category notification channel RPCs active |
