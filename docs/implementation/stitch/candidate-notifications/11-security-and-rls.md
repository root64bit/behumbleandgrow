# 11 — Security and RLS Documentation

## RLS & RPC Security Policy
1. **Candidate `SELECT` RLS**:
   `candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid())`
2. **Revoked Direct `UPDATE`**: Candidates cannot execute generic row `UPDATE` statements on `candidate_notifications`.
3. **Hardened `SECURITY DEFINER` RPCs**:
   - `mark_my_candidate_notification_read`
   - `mark_my_candidate_notification_unread`
   - `mark_all_my_candidate_notifications_read`
   - `archive_my_candidate_notification`
   - Each function executes with `SET search_path = pg_catalog, public`, resolves `auth.uid()`, revokes `PUBLIC` access, and grants execution to `authenticated`.

## Mandatory Disclaimers
- *Mocked Playwright, Vitest, Realtime, and FCM tests prove frontend behavior under controlled service conditions.*
- *Verification of deployed PostgreSQL RLS, live Supabase RPC endpoints, live Realtime channel isolation, and FCM push delivery require separate live database deployment.*
