# 02. Migration Application & Schema Audit Report

## Migration Audit Inventory

1. `20260724000001_security_schema.sql`:
   - Configures schema structure for 20 tables: `profiles`, `organisations`, `candidates`, `work_experiences`, `educations`, `candidate_documents`, `jobs`, `applications`, `status_history`, `payments`, `refunds`, `audit_logs`, etc.
   - Enforces foreign key constraints and indexes on candidate/org lookup IDs.

2. `20260724000002_rls_policies.sql`:
   - Enables RLS on all public tables with tenant isolation helper functions (`auth.current_org_id()`, `auth.current_user_roles()`).

3. `20260724000003_seed_data.sql`:
   - Seed data for 14 required roles, test organisations, and initial published requisitions.
