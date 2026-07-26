# 15. Current Gap Register

| ID | Area | Gap Description | Current Status | Severity | Production Blocker | User Impact | Security Impact | Affected Files | Required Fix | Effort |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **GAP-01** | Backend / API | Absence of API server / edge functions layer | `MISSING` | 🔴 Critical | 🚨 YES | System unusable for real operations | Critical data bypass | Entire project | Implement Next.js App Router or Express/Supabase Edge Functions | **XL** |
| **GAP-02** | Auth / RBAC | Unauthenticated portal tab switcher | `MOCK IMPLEMENTATION` | 🔴 Critical | 🚨 YES | Unauthorized access to all portal data | Total RBAC breakdown | `PortalNavigation.jsx`, `PortalManager.jsx` | Wire Firebase/Supabase Auth with claim verification middleware | **L** |
| **GAP-03** | Database | Unapplied SQL migrations | `UNAPPLIED SQL` | 🔴 Critical | 🚨 YES | Data changes lost on page refresh | Zero database security | `supabase/migrations/` | Deploy database schema to Supabase/PostgreSQL instance | **M** |
| **GAP-04** | Security | Committed Firebase API credentials | `NOT PRODUCTION-SAFE` | 🔴 Critical | 🚨 YES | Quota abuse / unauthorized access | Secret leak | `.env` | Revoke Firebase keys, move secrets to environment settings | **S** |
| **GAP-05** | Payments | Client-side visual payment status | `MOCK IMPLEMENTATION` | 🔴 Critical | 🚨 YES | Unpaid candidates access services | Financial fraud | `PortalManager.jsx` | Integrate Stripe Checkout & webhook signature verification | **L** |
| **GAP-06** | Architecture | Lack of URL router | `STATIC UI` | 🟡 High | 🚨 YES | Users cannot bookmark or navigate directly | Bad UX | `App.jsx` | Implement React Router or Next.js routing engine | **M** |
| **GAP-07** | QA / Testing | Zero automated test coverage | `MISSING` | 🟡 High | 🚨 YES | Regressions during code updates | System instability | `package.json` | Add Vitest unit tests & Playwright E2E test suites | **L** |
| **GAP-08** | UX / Mobile | Table overflow & modal cutoff on mobile | `NEEDS MOBILE FIXES` | 🔵 Medium | ❌ No | Mobile candidate drop-off | Minor | `CompliancePartnerReview.jsx`, `EmployerJobCreateModal.jsx` | Add responsive card transformations & modal auto-scroll | **S** |
| **GAP-09** | DevOps | Missing CI/CD build pipeline | `MISSING` | 🔵 Medium | ❌ No | Untested deployments pushed to production | Deployment failures | `.github/workflows/` | Set up GitHub Actions CI workflow | **M** |
