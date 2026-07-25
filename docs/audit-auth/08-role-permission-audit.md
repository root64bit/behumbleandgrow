# 08. Role & Permission Audit
**Platform**: Be Humble & Grow  
**Audit Date**: July 25, 2026  

---

## 1. Canonical Role Model & Database Alignment

| Role Name | Scope | Defined in TS (`rbac.ts`) | Present in DB (`public.roles`) | Permissions & Privileges |
| :--- | :--- | :---: | :---: | :--- |
| `candidate` | Candidate Portal | Yes | Yes | Own profile, applications, documents, payment history. |
| `super_admin` | Global Platform | Yes | Yes | Full platform administrative control, finance, system settings. |
| `operations_admin` | Platform HQ | Yes | Yes | Candidate pool management, application queue review. |
| `operations_manager` | Platform HQ | Yes | Yes | Operations management and candidate workflow escalation. |
| `candidate_reviewer` | Platform HQ | Yes | Yes | Review candidate profiles and eligibility qualifications. |
| `document_reviewer` | Platform HQ | Yes | Yes | Compliance officer reviewing identity documents. |
| `finance_reviewer` | Platform HQ | Yes | Yes | Verification fee and refund review. |
| `support_agent` | Platform HQ | Yes | Yes | Candidate and partner support ticketing. |
| `recruitment_partner_admin` | Agency | Yes | Yes | Partner agency administration and recruiter management. |
| `recruitment_manager` | Agency | Yes | Yes | Lead assignment and candidate pipeline oversight. |
| `recruiter` | Agency | Yes | Yes | Assigned candidate lead tracking and submission. |
| `interview_coordinator` | Agency | Yes | Yes | Scheduling candidate partner/employer interviews. |
| `employer_admin` | Corporate | Yes | Yes | Employer company portal administration and job posting. |
| `employer_reviewer` | Corporate | Yes | Yes | Reviewing submitted candidate applications and interviewing. |

---

## 2. Role Provisioning Security

- **Public Candidate Registration**: Handled automatically via PostgreSQL trigger `handle_new_user()`. Publishes `'candidate'` role into `public.user_roles`.
- **Privileged Roles Provisioning**: Cannot be assigned from public sign-up form. Privileged roles require a `super_admin` or `operations_admin` inserting into `public.user_roles`.
