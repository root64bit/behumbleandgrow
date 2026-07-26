# 05 — Migration Chain & Schema Integrity Audit

- **Migration Directory**: `supabase/migrations/`
- **Total Migrations**: 18 migration files executed sequentially.
- **Migration Audit Findings**:
  - `20260726000001_candidate_support_centre.sql`: Created `candidate_support_tickets`, `candidate_support_messages`, `candidate_support_attachments`, Indexes, RLS, and RPCs.
  - `20260726000002_candidate_support_fix.sql`: Fixed PostgREST route ambiguities and function signature search paths.
  - `20260726000003_candidate_account_settings.sql`: Created `candidate_preferences`, `candidate_notification_preferences`, foreign key cascades, unique constraints, and 4 `SECURITY DEFINER` RPCs.
- **Schema Constraints Verified**:
  - All candidate child tables use foreign keys referencing `candidates(id)` or `profiles(id)` with `ON DELETE CASCADE`.
  - All enums, check constraints (e.g. `quiet_hours_start <= quiet_hours_end`), and unique constraints are defined cleanly.
  - All migrations set explicit `search_path = pg_catalog, public`.
