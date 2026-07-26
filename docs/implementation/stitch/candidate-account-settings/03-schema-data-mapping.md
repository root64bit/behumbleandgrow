# 03 — Schema Data Mapping: Candidate Account Settings & Preferences

## Table & Ownership Mapping

| Setting Concern | Actual Source | Ownership Relationship | Candidate-Writable Fields | RLS & Security Policy |
|---|---|---|---|---|
| Account Identity | `auth.users` + `public.profiles` | `auth.uid() = profiles.id` | None (Auth managed) | Authenticated SELECT own profile |
| Candidate Profile | `public.candidates` | `candidates.user_id = auth.uid()` | None | Authenticated SELECT own candidate |
| General Preferences | `public.candidate_preferences` | `candidate_preferences.candidate_id = candidates.id` | `language_code`, `time_zone`, `quiet_hours_enabled`, `quiet_hours_start`, `quiet_hours_end`, `marketing_consent_granted` | `SECURITY DEFINER` RPC `update_my_candidate_preferences` |
| Notification Preferences | `public.candidate_notification_preferences` | `candidate_notification_preferences.candidate_id = candidates.id` | `push_enabled`, `email_enabled` | `SECURITY DEFINER` RPC `update_my_candidate_notification_preference` |

## Migration Details
- File: `supabase/migrations/20260726000003_candidate_account_settings.sql`
- Direct table `INSERT`/`UPDATE`/`DELETE` grants revoked from `authenticated` role.
- State mutations execute strictly through narrow RPCs with `search_path = pg_catalog, public`.
