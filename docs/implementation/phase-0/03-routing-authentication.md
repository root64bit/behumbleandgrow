# 03. Routing & Authentication Architecture

## Route Hierarchy & Access Control

| Route Pattern | Layout | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `/` | `PublicLayout` | Public | Homepage & value proposition |
| `/eligibility` | `PublicLayout` | Public | Candidate pre-screening eligibility tool |
| `/jobs` | `PublicLayout` | Public | Published vacancies marketplace |
| `/jobs/:slug` | `PublicLayout` | Public | Detailed job vacancy view & application trigger |
| `/login` | `AuthLayout` | Unauthenticated | User login form |
| `/register` | `AuthLayout` | Unauthenticated | Candidate registration form |
| `/verify-email` | `AuthLayout` | Public / Auth | Email verification notice |
| `/forgot-password` | `AuthLayout` | Public | Password recovery request |
| `/reset-password` | `AuthLayout` | Public | Password update form |
| `/candidate/*` | `CandidateLayout` | Candidate Role | Candidate dashboard, profile, documents, applications |
| `/operations/*` | `OperationsLayout` | Operations Roles | Candidate pool inspection, application review, ops control console |
| `/recruiter/*` | `RecruiterLayout` | Recruiter Roles | Partner agency lead distribution & pipeline |
| `/employer/*` | `EmployerLayout` | Employer Roles | Verified employer dashboard & dossiers review |

## Authentication Security Controls
- **Client Session Restoration**: Handled asynchronously in `AuthContext.tsx` via Supabase PKCE flow.
- **Role Control**: User roles read strictly from database records (`public.user_roles`). Interactive client role switching is completely disabled.
