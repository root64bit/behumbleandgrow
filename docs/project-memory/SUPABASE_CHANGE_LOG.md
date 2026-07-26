# Supabase Change Log - YAKA Project Memory

Log of all database schema changes, migrations, RLS policies, and database functions.

| Date | Migration/Change | Branch | Applied? | Tables Affected | Functions Affected | RLS Impact | Risk | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **2026-07-15** | `20260715000000_superadmin_tables.sql` | `codex/superadmin-backend-contracts` | Yes | `condominiums`, `subscriptions` | `get_superadmin_stats()` | Super Admin full read/write policy | Low | Initial superadmin schema setup |
| **2026-07-18** | `20260718000000_auth_roles_policy.sql` | `codex/fix-api-base-and-login-context` | Yes | `profiles`, `user_roles` | `handle_new_user()` | Role-based row isolation updated | Medium | Ensured proper tenant separation |
