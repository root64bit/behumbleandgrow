# 02 — Current Code Audit

Prior to Phase A11 implementation, `src/pages/candidate/CandidateNotificationsPage.tsx` did not exist.
The candidate topbar bell icon rendered a generic placeholder notification drawer.

## Key Audit Findings
1. **Missing Table**: No dedicated `candidate_notifications` table existed in previous migrations.
2. **Security Gaps Addressed**:
   - `targetUserId` parameter removed from caller signatures to prevent user impersonation.
   - Direct row `UPDATE` access for Candidates revoked to prevent mutation of title, summary, priority, or category.
   - `SECURITY DEFINER` RPCs created for `mark_my_candidate_notification_read`, `mark_my_candidate_notification_unread`, `mark_all_my_candidate_notifications_read`, and `archive_my_candidate_notification`.
3. **Deep Link Allowlist**: Direct arbitrary `action_url` navigation replaced with entity-type route derivation (`/candidate/applications/*`, `/candidate/documents`, `/candidate/interviews/*`, `/candidate/offers/*`, `/candidate/placement`, `/candidate/profile`, `/candidate/support`).
