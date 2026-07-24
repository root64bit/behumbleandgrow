# 4. Database and Migration Audit

## 4.1 Database Technology & Architecture
- **Engine**: PostgreSQL / Supabase
- **Migration Location**: `supabase/migrations/`
- **ORM / Query Engine**: None installed (Direct Supabase JS Client or Raw SQL)
- **Schema State**: **Unapplied Repository Migration Files** (Database schema exists in SQL scripts, but client application is not connected to a live database instance).

---

## 4.2 Migration Timeline & File Inventory

| Migration File | Purpose | Tables Created / Affected | Enums & Functions | RLS & Triggers | Applied | Risk & Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `20260724000001_security_schema.sql` | Core Schema & Enums | `profiles`, `organisations`, `organisation_users`, `roles`, `permissions`, `role_permissions`, `user_roles`, `candidates`, `candidate_documents`, `upload_intents`, `candidate_assessments`, `recruitment_partners`, `employers`, `jobs`, `lead_assignments`, `applications`, `interviews`, `offers`, `immigration_cases`, `payments`, `refunds`, `audit_logs` | `org_type_enum`, `candidate_stage_enum`, `payment_status_enum`, `doc_classification_enum` | `protect_audit_logs()` function & trigger | 🟡 Unapplied SQL | `IMPLEMENTED BUT UNAPPLIED` |
| `20260724000002_rls_policies.sql` | Production RLS Policies | All 19 tables in `public` schema | `auth.current_org_id()`, `auth.current_user_roles()`, `auth.is_mfa_verified()` | RLS enabled on 19 tables + 15 detailed row policies | 🟡 Unapplied SQL | `IMPLEMENTED BUT UNAPPLIED` |
| `20260724000003_seed_data.sql` | Initial Production Seed Data | `organisations`, `recruitment_partners`, `employers`, `jobs` | Seed records for global HQ, MZ partner, ZA partner, UAE employers, & jobs | N/A | 🟡 Unapplied SQL | `IMPLEMENTED BUT UNAPPLIED` |

---

## 4.3 Database Schema Analysis & Evaluation

### 1. Financial & Money Storage Integrity
- **Table**: `public.payments` (`amount NUMERIC(10,2)`)
- **Table**: `public.refunds` (`amount NUMERIC(10,2)`)
- **Table**: `public.offers` (`salary NUMERIC(12,2)`)
- **Evaluation**: Money is stored as `NUMERIC(10,2)` (fixed-precision decimal), which prevents floating-point rounding errors. However, minor integer units (e.g. cents/fils) are recommended for Stripe/Square API compatibility.

### 2. Audit Trail & Log Immutability
- **Table**: `public.audit_logs`
- **Security Control**: Enforced via PostgreSQL trigger `trg_protect_audit_logs` executing `protect_audit_logs()`, which throws an exception on any `UPDATE` or `DELETE` attempt.
- **Evaluation**: Excellent database-level immutability protection.

### 3. Missing Database Entities
- **Missing Tables**:
  - `work_experiences` & `educations` (Candidate profile history tables).
  - `support_tickets` & `support_messages` (Candidate customer support ticketing engine).
  - `notification_preferences` & `notifications` (User notification delivery tracking).
  - `document_reviews` (Detailed operations review comments and version tracking).
