# 7. Database, Migrations and RLS

## 7.1 Database Technology & Architecture
- **Engine**: PostgreSQL (Firebase Cloud SQL / Firebase Data Connect)
- **Authentication Context**: Firebase Auth ID Tokens with custom claims injected into PostgreSQL session parameters via `buildPostgresClaimContext(firebaseClaims)` (`SET LOCAL request.jwt.claims = ...`)
- **Migration Location**: `supabase/migrations/` (PostgreSQL DDL & RLS scripts)
- **ORM / Query Engine**: PostgreSQL Native Client / pg-pool
- **Schema State**: **Unapplied Repository Migration Files** (PostgreSQL DDL scripts exist, but client application is not connected to a live Cloud SQL database instance).

---

## 7.2 Database Table & RLS Audit Inventory

| Table Name | Entity Scope | Foreign Keys | RLS Enabled | Policies Defined | Applied to DB | Production Status |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `public.profiles` | User Profiles | `auth.users(id)` | ✅ Yes | `profile_select_own`, `profile_update_own`, `profile_select_admin` | 🔴 Unapplied | `UNAPPLIED SQL` |
| `public.organisations` | Tenant Orgs | None | ✅ Yes | Enforced via tenant org check | 🔴 Unapplied | `UNAPPLIED SQL` |
| `public.candidates` | Candidate Pipeline | `profiles(id)` | ✅ Yes | `candidate_read_own`, `partner_read_assigned`, `employer_read_applicant` | 🔴 Unapplied | `UNAPPLIED SQL` |
| `public.candidate_documents`| Private Storage Vault | `candidates(id)` | ✅ Yes | `candidate_docs_read_own`, `ops_compliance_docs_read` | 🔴 Unapplied | `UNAPPLIED SQL` |
| `public.jobs` | Vacancies | `employers(id)` | ✅ Yes | `jobs_select_published`, `employer_jobs_all` | 🔴 Unapplied | `UNAPPLIED SQL` |
| `public.applications` | Job Applications | `jobs(id)`, `candidates(id)` | ✅ Yes | `candidate_applications_read_own`, `employer_applications_read` | 🔴 Unapplied | `UNAPPLIED SQL` |
| `public.payments` | Verification Fees | `profiles(id)` | ✅ Yes | `candidate_payments_read_own`, `finance_payments_all`, `deny_candidate_payment_update` | 🔴 Unapplied | `UNAPPLIED SQL` |
| `public.refunds` | Fee Adjustments | `payments(id)` | ✅ Yes | `finance_refunds_all` | 🔴 Unapplied | `UNAPPLIED SQL` |
| `public.audit_logs` | Security Logs | `profiles(id)` | ✅ Yes | `compliance_audit_read`, `deny_client_audit_insert`, Immutable Trigger | 🔴 Unapplied | `UNAPPLIED SQL` |

---

## 7.3 Schema Drift & Unimplemented Entity Domains
1. **Candidate Profile Entities**: `work_experiences`, `educations`, and `certifications` tables are missing from migrations.
2. **Communication Entities**: `notifications` and `support_tickets` tables are missing from migrations.
