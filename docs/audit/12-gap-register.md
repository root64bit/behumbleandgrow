# 12. Gap Register

| ID | Area | Gap Description | Severity | User / Business Impact | Security Impact | Production Blocker | Affected Files | Recommended Fix | Effort |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **GAP-01** | Backend / API | Absence of API server / edge functions layer | 🔴 Critical | Total system unusable for real operations | Critical data bypass | 🚨 YES | Entire project | Implement Next.js App Router or Express/Supabase Edge Functions | **XL** |
| **GAP-02** | Auth / RBAC | Unauthenticated portal tab switcher | 🔴 Critical | Unauthorized access to all portal data | Total RBAC breakdown | 🚨 YES | `PortalNavigation.jsx`, `PortalManager.jsx` | Wire Firebase/Supabase Auth with claim verification middleware | **L** |
| **GAP-03** | Database | Unapplied SQL migrations | 🔴 Critical | Data changes lost on page refresh | Zero database security | 🚨 YES | `supabase/migrations/` | Deploy database schema to Supabase/PostgreSQL instance | **M** |
| **GAP-04** | Security | Committed Firebase API credentials | 🔴 Critical | Quota abuse / unauthorized access | Secret leak | 🚨 YES | `.env` | Revoke Firebase keys, move secrets to environment settings | **S** |
| **GAP-05** | Payments | Client-side visual payment status | 🔴 Critical | Unpaid candidates access services | Financial fraud | 🚨 YES | `PortalManager.jsx` | Integrate Stripe Checkout & webhook signature verification | **L** |
| **GAP-06** | Architecture | Lack of URL router | 🟡 High | Users cannot bookmark or navigate directly | Bad UX | 🚨 YES | `App.jsx` | Implement React Router or Next.js routing engine | **M** |
| **GAP-07** | QA / Testing | Zero automated test coverage | 🟡 High | Regressions during code updates | System instability | 🚨 YES | `package.json` | Add Vitest unit tests & Playwright E2E test suites | **L** |
| **GAP-08** | UX / Mobile | Table overflow & modal cutoff on mobile | 🔵 Medium | Mobile candidate drop-off | Minor | ❌ No | `CompliancePartnerReview.jsx`, `EmployerJobCreateModal.jsx` | Add responsive card transformations & modal auto-scroll | **S** |
| **GAP-09** | DevOps | Missing CI/CD build pipeline | 🔵 Medium | Untested deployments pushed to production | Deployment failures | ❌ No | `.github/workflows/` | Set up GitHub Actions CI workflow | **M** |
