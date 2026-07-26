# 07 — Realtime and FCM Delivery Security

## Security Principles
1. **Authoritative Record**: PostgreSQL `candidate_notifications` table is authoritative.
2. **FCM Supplementary Delivery**: Push notification payload contains minimal safe metadata (`notification_id`, generic category, safe title).
3. **Excluded Fields**: Push payloads and client projections omit signed URLs, meeting URLs, access tokens, passport numbers, visa numbers, and medical data.
4. **Push Open Flow**: Opening push forces session re-authentication and re-queries PostgreSQL under candidate RLS before resolving the safe candidate deep link.
