# 01. Authentication & Authorisation Executive Summary
**Platform**: Be Humble & Grow (Recruitment & Relocation Platform)  
**Audit Date**: July 25, 2026  
**Auditor Role**: Principal Identity Architect, Security Engineer & QA Lead  
**Scope**: Complete Authentication Logic Audit (`src/`, `supabase/`, configuration, routing, storage, RBAC, RLS, and test suite)

---

## 1. Executive Summary & Overview

A comprehensive identity and security audit was conducted on the **Be Humble & Grow** codebase. The audit traced the full authentication lifecycle from client initialization, PKCE flow configuration, registration, email verification, session restoration, role-based access control (RBAC), multi-tenant isolation, invitation acceptance, and storage authorization to unit test validity.

While significant production foundation work has been established—including a single authoritative identity provider (**Supabase Auth with PKCE**), server-side automatic user provisioning triggers, non-enumerating recovery flows, and active Supabase database tables—**critical security blockers currently prohibit immediate public production launch**. 

Most notably, **development preview bypasses** in frontend route guards allow unauthenticated users to access protected portals when running in local development mode, secondary portals (`/operations`, `/partner`, `/employer`) use mock UI login handlers rather than Supabase authentication, and unit tests rely on mock objects rather than real PostgreSQL RLS query assertions.

---

## 2. Authentication Readiness Scorecard

$$ \text{Authentication Readiness Score} = \mathbf{58.5 / 100} $$

| Audit Domain | Weight | Score (/100) | Weighted Score | Status | Key Finding |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **Provider Configuration** | 8% | 90 | 7.20 | ✅ IMPLEMENTED | Single Supabase Auth provider using PKCE & anon key. |
| **Registration** | 8% | 85 | 6.80 | ✅ IMPLEMENTED | Real `supabase.auth.signUp()`. Prevents self-assigned privileged roles. |
| **Email Verification** | 6% | 75 | 4.50 | 🟡 PARTIAL | Real `resend` integration; verification required for candidate actions. |
| **Login & Logout** | 8% | 60 | 4.80 | 🔴 BROKEN | Candidate login works; Operations, Partner & Employer logins use mock timeouts. |
| **Password Recovery** | 6% | 85 | 5.10 | ✅ IMPLEMENTED | Non-enumerating reset flow using Supabase `resetPasswordForEmail()`. |
| **Session Security** | 10% | 70 | 7.00 | 🟡 PARTIAL | `persistSession` & `autoRefreshToken` active; tokens stored in `localStorage`. |
| **Route Protection** | 8% | 40 | 3.20 | 🔴 CRITICAL | `import.meta.env.DEV` bypass in `RouteGuards.tsx` allows unauthenticated access. |
| **Role Provisioning** | 10% | 80 | 8.00 | ✅ IMPLEMENTED | Database trigger `handle_new_user()` provisions candidate roles automatically. |
| **Organisation Membership** | 8% | 30 | 2.40 | 🔴 BROKEN | No explicit backend check enforcing active user organisation membership on login. |
| **Invitation Security** | 6% | 20 | 1.20 | 🔴 BROKEN | `InviteAcceptancePage.tsx` uses hardcoded mock JSON and simulated timeouts. |
| **RLS Integration** | 10% | 50 | 5.00 | 🟡 PARTIAL | SQL RLS policies exist in migrations; tests check JS helpers instead of DB. |
| **Storage Authentication** | 4% | 75 | 3.00 | ✅ IMPLEMENTED | Private buckets (`candidate-cv`), 30-min signed URLs generated server-side. |
| **Security Logging** | 3% | 0 | 0.00 | 🔴 MISSING | Security event logging table unpopulated for auth failures or role changes. |
| **Automated Testing** | 3% | 10 | 0.30 | 🔴 BROKEN | 59 Vitest unit tests pass, but test JS logic rather than live Supabase/RLS. |
| **Hosted Verification** | 2% | 0 | 0.00 | 🔴 MISSING | Playwright end-to-end browser auth tests not yet configured or executed. |
| **TOTAL SCORE** | **100%** | — | **58.5 / 100** | 🔴 **NOT PRODUCTION SAFE** | **Requires Critical Remediation** |

---

## 3. Launch Readiness Matrix by Environment

| Launch Target Level | Readiness Score | Launch Decision | Primary Blocker / Prerequisite |
| :--- | :---: | :---: | :--- |
| **Internal Technical Testing** | **85 / 100** | 🟢 **APPROVED** | Safe for technical development & database migration validation. |
| **Closed Candidate Pilot** | **68 / 100** | 🟡 **CONDITIONAL** | Must disable `DEV` route guard bypass & mandate email verification. |
| **Recruitment-Partner Pilot** | **35 / 100** | 🔴 **BLOCKED** | Partner login is mocked; invitation acceptance flow is fake. |
| **Employer Pilot** | **30 / 100** | 🔴 **BLOCKED** | Employer login is mocked; multi-tenant RLS isolation unverified in UI. |
| **Operations Use** | **25 / 100** | 🔴 **BLOCKED** | Operations login is mocked; no MFA for privileged internal staff. |
| **Super Admin Access** | **20 / 100** | 🔴 **BLOCKED** | No MFA enforced; role check relies on client-side context lookup. |
| **Public Production Launch** | **15 / 100** | 🔴 **BLOCKED** | Blocked by 5 Critical & 6 High security blockers. |

---

## 4. Top Critical Security Blockers

1. **`DEV` Route Guard Security Bypass (`RouteGuards.tsx`)**:
   - Lines 31-33 & 74-76 in `RouteGuards.tsx` explicitly bypass authentication and role checks whenever `import.meta.env.DEV` evaluates to true.
2. **Mock Login Handlers for Operations, Partner & Employer Portals**:
   - `OperationsLoginPage.tsx`, `PartnerLoginPage.tsx`, and `EmployerLoginPage.tsx` execute `setTimeout()` redirects without invoking `supabase.auth.signInWithPassword()`.
3. **Mock Invitation Acceptance (`InviteAcceptancePage.tsx`)**:
   - Accepting an invitation token relies on hardcoded JSON metadata and does not validate single-use high-entropy tokens against `public.invitations`.
4. **Mock Unit Test Assertions (`isolation.test.ts` & `rls.test.ts`)**:
   - Automated tests pass by testing boolean equality (`candidateA.id === candidateB.id`) rather than querying PostgreSQL via Supabase Auth client sessions.
5. **Lack of Multi-Factor Authentication (MFA) for Privileged Roles**:
   - `super_admin`, `operations_admin`, and `finance_reviewer` roles do not require TOTP / MFA enrolment before accessing sensitive controls.

---

## 5. Primary Findings & Verification Summary

- **Primary Identity Provider**: **Supabase Auth** (`https://acfjjrupcigwjbqcbonw.supabase.co`).
- **Firebase Auth Status**: **INACTIVE FOR AUTHENTICATION**. Firebase is strictly imported and configured for **Firebase Cloud Messaging (FCM)** push notifications.
- **PKCE Implementation**: **VERIFIED ACTIVE** (`flowType: 'pkce'`, `storageKey: 'bhg_auth_token'`).
- **PostgreSQL Trigger Provisioning**: **VERIFIED ACTIVE** (`handle_new_user()` on `AFTER INSERT ON auth.users`).
