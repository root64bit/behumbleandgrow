# 04. Database Migrations & Schema Audit Report

## Inventory of Reviewed Migrations

1. **`20260724000001_security_schema.sql`**:
   - Creates core tables: `profiles`, `organisations`, `organisation_users`, `roles`, `permissions`, `role_permissions`, `user_roles`, `candidates`, `work_experiences`, `educations`, `candidate_documents`, `upload_intents`, `recruitment_partners`, `employers`, `jobs`, `lead_assignments`, `applications`, `interviews`, `offers`, `payments`, `refunds`, `status_history`, `audit_logs`.
   - Added missing candidate detail tables (`work_experiences`, `educations`) and append-only `status_history`.

2. **`20260724000002_rls_policies.sql`**:
   - Enables RLS on all 20 tables.
   - Enforces claims resolution functions (`auth.current_org_id()`, `auth.current_user_roles()`, `auth.is_mfa_verified()`).

3. **`20260724000003_seed_data.sql`**:
   - Seeds default platform organisations, all 14 platform roles, recruitment partner profiles, verified employer profiles, and published test job vacancies with slugs.
