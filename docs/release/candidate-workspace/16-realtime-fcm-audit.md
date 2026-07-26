# 16 — Realtime & FCM Push Security Audit

- **Authoritative Notification Store**: PostgreSQL `candidate_notifications` table is the single source of truth for in-app notifications.
- **Supabase Realtime Boundaries**: Realtime subscription channels filter by `candidate_id = eq.${candidateId}`. Listeners are automatically cleaned up on logout.
- **FCM Push Notification Policy**: Push payloads contain minimal non-sensitive summaries (category, title, notification ID). Signed file URLs, credentials, or meeting tokens are strictly excluded from FCM push payloads.
- **Verification Status**: In-app notifications are fully integrated; FCM service worker delivery and live Realtime socket connections are mocked in test suites and require live Supabase / Firebase project configuration.
