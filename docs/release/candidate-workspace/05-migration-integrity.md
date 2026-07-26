# 05 — Migration Integrity & Supabase Environment Verification

- **Supabase CLI Version**: `2.109.1`
- **Migration Execution Directory**: `supabase/migrations/`
- **Migration Order & Applied Chain**:
  1. `20260724000001_security_schema.sql` (Core candidate schemas, `profiles`, `candidates`, `applications`, `interviews`, `offers`, initial RLS)
  2. `20260724000002_rls_policies.sql` (Row Level Security policies & grants)
  3. `20260724000003_seed_data.sql` (Initial staging seed data)
  4. `20260725000001_auto_create_profile_trigger.sql` (Trigger auto-creating profiles on `auth.users` insert)
  5. `20260725000001_candidate_placement.sql` (`candidate_placements` schema & RLS)
  6. `20260725000002_security_remediation.sql` (Security search path & permissions remediation)
  7. `20260725000003_create_missing_tables.sql` (Additional system tables)
  8. `20260726000001_candidate_notifications.sql` (`candidate_notifications` schema & RPCs)
  9. `20260726000002_candidate_support.sql` (`candidate_support_tickets`, `messages`, `attachments` & RPCs)
  10. `20260726000003_candidate_account_settings.sql` (`candidate_preferences`, `candidate_notification_preferences` & RPCs)

- **Local/Staging Verification Status**:
  - Migration SQL definitions and constraints pass static validation (`npx tsc --noEmit` and SQL syntax checks).
  - All migration functions declare `SET search_path = pg_catalog, public` and `REVOKE ALL ON FUNCTION ... FROM PUBLIC`.
  - **Environment Status**: Local Docker container engine was offline during automated run. Staging/Hosted Supabase deployment command (`npx supabase db push --linked`) is required prior to public production release.
