# 6. Authentication, RBAC and Multi-Tenancy Audit

## 6.1 Authentication System Evaluation
- **AuthProvider Architecture**: Firebase Auth SDK stubs (`src/lib/firebaseAuth.js` and `firebaseClient.js`) and Supabase Auth configuration (`src/lib/supabaseClient.js`).
- **Real Session State**: **NONE**. The UI does not initialize `@supabase/supabase-js` or `firebase/auth`. Switching portal tabs in `PortalManager.jsx` instantly changes roles without password/MFA verification.

---

## 6.2 Role-Permission Matrix (Architectural Target vs Current State)

| Role Code | Target Permissions | Tenant Boundary | Frontend Control | Backend Enforced | Production Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `candidate` | View own profile, submit applications, pay fee | Candidate user ID | Tab selection | 🔴 None | `MOCK IMPLEMENTATION` |
| `partner_recruiter` | View assigned leads, shortlist candidates | Partner Organisation ID | Tab selection | 🔴 None | `MOCK IMPLEMENTATION` |
| `partner_admin` | Manage partner team, view commissions | Partner Organisation ID | Tab selection | 🔴 None | `MOCK IMPLEMENTATION` |
| `employer_hiring_manager`| View submitted applicant dossiers, post jobs | Employer Organisation ID | Tab selection | 🔴 None | `MOCK IMPLEMENTATION` |
| `ops_officer` | Verify candidate documents, assign leads | Platform-wide | Tab selection | 🔴 None | `MOCK IMPLEMENTATION` |
| `finance_officer` | Process refunds, audit payments | Platform-wide | Tab selection | 🔴 None | `MOCK IMPLEMENTATION` |
| `compliance_officer` | Audit partner licenses, view audit logs | Platform-wide | Tab selection | 🔴 None | `MOCK IMPLEMENTATION` |
| `super_admin` | Full system governance, role permissions | Global override | Tab selection | 🔴 None | `MOCK IMPLEMENTATION` |

---

## 6.3 Multi-Tenant Isolation Vulnerability Analysis

> [!CAUTION]
> **CRITICAL MULTI-TENANCY VULNERABILITY: COMPLETE TENANT SPOOFING**  
> In the current implementation, multi-tenancy is entirely visual. A user selecting the "Partner" tab in `PortalNavigation.jsx` is hardcoded to see `Mozambique Talent Solutions` (Org ID `00000000-0000-0000-0000-000000000002`). Selecting the "Employer" tab shows `Jumeirah Luxury Hospitality Group`. There is no session check preventing any user from viewing or interacting with another organization's workspace.
