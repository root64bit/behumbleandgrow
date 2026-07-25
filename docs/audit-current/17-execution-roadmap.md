# 17. Execution Roadmap

## Phase 0 — Critical Foundation (Weeks 1 - 2)
> **Goal**: Secure environment, establish database connection, install routing engine, wire real authentication.

1. **Secret Remediation**: Revoke committed Firebase keys in `.env`, remove `.env` from Git tracking, configure Vercel environment variables.
2. **Database Deployment**: Apply `supabase/migrations/` (Schema, RLS, Seed Data) to live PostgreSQL / Supabase instance.
3. **Client Routing Framework**: Install `react-router-dom` to replace tab switching with real URL paths (`/candidate/dashboard`, `/partner/pipeline`).
4. **Authentication Provider Connection**: Connect Supabase Auth / Firebase Auth, enforcing JWT claim verification in `src/lib/authMiddleware.js`.

---

## Phase 1 — Real Candidate Workflow (Weeks 3 - 4)
> **Goal**: Candidate eligibility, profile persistence, private document uploads.

1. **Private Document Storage Vault**: Connect `storageSecurity.js` to private Supabase Storage buckets with signed 15-minute URLs.
2. **Candidate Profile Persistence**: Replace static candidate state with real database queries for profile updates and eligibility checks.

---

## Phase 2 — Operations Workflow & Lead Distribution (Weeks 5 - 6)
> **Goal**: Operations reviewer console and partner agency lead assignment pipeline.

1. **Operations Verification Queue**: Connect `CandidateVerificationVault.jsx` to live `candidate_documents` database table.
2. **Partner Lead Assignment**: Implement dynamic lead distribution from operations officers to recruitment partner agencies.

---

## Phase 3 — Partner & Employer Portal Integration (Weeks 7 - 8)
> **Goal**: Partner agency candidate submissions and employer vacancy management.

1. **Employer Vacancy Persistence**: Connect `EmployerJobCreateModal.jsx` to database `jobs` table with server field validation.
2. **Interview & Offer Engine**: Enable employers to schedule candidate interviews and issue digital employment offer letters.

---

## Phase 4 — Payments & Financial Controls (Weeks 9 - 10)
> **Goal**: £15 verification fee integration, webhook listener, and refund controls.

1. **Stripe Checkout Integration**: Build server endpoint for £15 verification fee creation and webhook signature listener.
2. **Dual-Approval Refund Engine**: Wire `FinanceRefundApprovalModal.jsx` to execute refunds upon dual officer approval.

---

## Phase 5 — Production Operations & Hardening (Weeks 11 - 12)
> **Goal**: Testing, performance optimization, legal compliance, and launch.

1. **Automated Testing Suite**: Configure Vitest for security/financial helper unit tests and Playwright for E2E candidate journey tests.
2. **Bundle Optimization**: Implement dynamic imports (`React.lazy()`) to reduce bundle chunk sizes below 200 kB.
3. **Legal Compliance**: Bind legal privacy policies and candidate data consent forms.
