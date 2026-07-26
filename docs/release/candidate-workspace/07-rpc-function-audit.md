# 07 — RPC & SECURITY DEFINER Function Audit

| Function Name | Ownership Check | Search Path | Concurrency Protection | Idempotency | Grants / Permissions | Audit Status |
|---|---|---|---|---|---|---|
| `load_my_candidate_account_settings` | `auth.uid()` -> Candidate | `pg_catalog, public` | Read-only | N/A | `REVOKE FROM PUBLIC; GRANT TO authenticated;` | PASS |
| `update_my_candidate_preferences` | `auth.uid()` -> Candidate | `pg_catalog, public` | Optimistic Version Token | Yes | `REVOKE FROM PUBLIC; GRANT TO authenticated;` | PASS |
| `update_my_candidate_notification_preference` | `auth.uid()` -> Candidate | `pg_catalog, public` | Category Lock Guard | Yes | `REVOKE FROM PUBLIC; GRANT TO authenticated;` | PASS |
| `create_my_candidate_support_ticket` | `auth.uid()` -> Candidate | `pg_catalog, public` | Internal Rate Guard | Yes | `REVOKE FROM PUBLIC; GRANT TO authenticated;` | PASS |
| `reply_to_my_candidate_support_ticket` | `auth.uid()` -> Ticket Owner | `pg_catalog, public` | State Lock Guard | Yes | `REVOKE FROM PUBLIC; GRANT TO authenticated;` | PASS |
| `confirm_candidate_interview_attendance` | `auth.uid()` -> Application Owner | `pg_catalog, public` | Version Token | Yes | `REVOKE FROM PUBLIC; GRANT TO authenticated;` | PASS |
| `submit_candidate_offer_decision` | `auth.uid()` -> Application Owner | `pg_catalog, public` | State Token & Locks | Yes | `REVOKE FROM PUBLIC; GRANT TO authenticated;` | PASS |
