# 13. Production Roadmap

## Phase 0 — Critical Safety & Core Architecture (Weeks 1 - 2)
> **Focus**: Secure credentials, database infrastructure, and backend routing foundation.

1. **Credential & Secret Remediation**: Revoke exposed Firebase API keys in `.env`, sanitize repository, and configure Vercel production secrets.
2. **Database Provisioning & Migration Execution**: Apply `supabase/migrations/` to a live Supabase PostgreSQL database.
3. **Application Routing Framework**: Introduce React Router (`react-router-dom`) or migrate to Next.js App Router to establish explicit URL paths (`/candidate/dashboard`, `/employer/jobs`).
4. **Authentication & Session Wiring**: Connect Supabase Auth / Firebase Auth SDKs, replacing hardcoded portal tab state in `PortalManager.jsx`.

---

## Phase 1 — Candidate Application & Document Vault (Weeks 3 - 4)
> **Focus**: Enable candidates to create accounts, upload documents, and submit applications.

1. **Secure Document Storage Vault**: Wire `storageSecurity.js` to real Supabase Storage private buckets with signed 15-minute download URLs.
2. **Verification Fee Engine Integration**: Integrate Stripe Checkout SDK with backend webhook listener for server-validated £15 payment capture.
3. **Candidate Onboarding & Profile Sync**: Replace static local state with real database queries for candidate profile updates.

---

## Phase 2 — Operations & Partner Lead Distribution (Weeks 5 - 6)
> **Focus**: Operations reviewer interface and partner agency distribution pipeline.

1. **Operations Verification Console**: Connect `CandidateVerificationVault.jsx` to live database table `candidate_documents`.
2. **Partner Lead Distribution Pipeline**: Wire `lead_assignments` table to allow ops officers to assign candidate leads to recruitment partner agencies.

---

## Phase 3 — Employer Submissions, Interviews & Offers (Weeks 7 - 8)
> **Focus**: Employer job management, candidate dossier reviews, and formal offer issuance.

1. **Employer Portal Persistence**: Connect `EmployerJobCreateModal.jsx` to `jobs` table with server-side field validation.
2. **Interview & Offer Management**: Enable employers to schedule interviews and issue digital job offers with salary and currency specifications.

---

## Phase 4 — Testing, QA & Production Hardening (Weeks 9 - 10)
> **Focus**: End-to-end verification, security audits, and production deployment.

1. **Automated Test Coverage**: Write Vitest unit tests for financial math/security helpers and Playwright E2E tests for candidate application flows.
2. **Performance Optimization**: Implement dynamic imports (`React.lazy()`) to reduce production JS bundle below 200 kB.
3. **Legal Compliance & Privacy Forms**: Deploy binding Privacy Policy, Terms of Service, and candidate data retention mechanisms.
