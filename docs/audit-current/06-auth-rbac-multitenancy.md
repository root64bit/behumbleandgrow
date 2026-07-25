# 6. Authentication, RBAC and Multi-Tenancy

## 6.1 Authentication System Evaluation
- **Configured Identity Provider**: Firebase Auth SDK (`src/lib/firebaseAuth.js` and `firebaseClient.js`) storing custom claims (`user_roles`, `active_org_id`, `org_type`, `permissions`, `mfa_verified`).
- **PostgreSQL Context Injection**: `buildPostgresClaimContext(firebaseClaims)` in `src/lib/postgresClient.js` converts Firebase Auth JWT claims into PostgreSQL session settings (`SET LOCAL request.jwt.claims = '...'`).
- **Runtime Execution**: Firebase Auth is not connected to a live session context in the UI.
- **Role Switching Vulnerability**: `PortalNavigation.jsx` exposes tab switcher buttons allowing any anonymous visitor to assume `SuperAdmin`, `Finance`, `Ops`, `Employer`, or `Partner` roles instantly.

---

## 6.2 Role & Permission Matrix

| System Role | Intended Scope | Current UI Access | API Authorization | DB Policy (SQL File) | Verified Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `candidate` | Own Candidate Record | Hardcoded `Amina Mabote` | 🔴 None | `candidate_read_own` | `MOCK IMPLEMENTATION` |
| `partner_admin` | Partner Org Leads | Hardcoded `Mozambique Talent`| 🔴 None | `partner_read_assigned` | `MOCK IMPLEMENTATION` |
| `employer_admin` | Employer Vacancies | Hardcoded `Jumeirah Group` | 🔴 None | `employer_jobs_all` | `MOCK IMPLEMENTATION` |
| `ops_officer` | Candidate Vault & Queue | Full Ops Access | 🔴 None | `ops_read_candidates` | `PARTIALLY IMPLEMENTED` |
| `finance_officer` | Ledger & Refunds | Dual-Approval Trigger | 🔴 None | `finance_refunds_all` | `PARTIALLY IMPLEMENTED` |
| `super_admin` | System Governance | Permission Checkboxes | 🔴 None | `super_admin` override | `MOCK IMPLEMENTATION` |

---

## 6.3 Multi-Tenant Boundary Security
- **Tenant Isolation Verdict**: **FAILED (VISUAL MOCK ONLY)**
- **Risk**: Organization boundaries are hardcoded strings. Switching tabs grants full access to candidate files, partner commission figures, and employer applicant dossiers without verifying user token claims.
