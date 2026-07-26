# 16. Authentication Blocker Register
**Platform**: Be Humble & Grow  
**Audit Date**: July 25, 2026  

---

## 1. Active Blocker Inventory

| ID | Severity | Category | Problem Summary | Exploit / Risk | Required Remediation | Target Milestone |
| :--- | :---: | :--- | :--- | :--- | :--- | :---: |
| **BLK-AUTH-01** | 🔴 **CRITICAL** | Route Guards | `import.meta.env.DEV` bypass in `RouteGuards.tsx` | Unauthenticated users can access admin routes in DEV builds | Remove DEV bypass lines in `RouteGuards.tsx` | Closed Candidate Pilot |
| **BLK-AUTH-02** | 🔴 **CRITICAL** | Login Pages | Secondary portal logins (`/operations`, `/partner`, `/employer`) use mock timeouts | Unauthenticated access to portal layouts | Connect all login pages to `supabase.auth.signInWithPassword()` | Partner & Employer Pilot |
| **BLK-AUTH-03** | 🔴 **CRITICAL** | Invitations | `InviteAcceptancePage.tsx` uses hardcoded mock JSON | Token replay and unauthorised team membership | Create `public.invitations` DB table & validate tokens | Partner & Employer Pilot |
| **BLK-AUTH-04** | 🔴 **CRITICAL** | Testing | Unit tests check JS objects instead of live RLS policies | False confidence in security policies | Implement Playwright E2E tests against Supabase RLS | Production Launch |
| **BLK-AUTH-05** | 🟡 **HIGH** | Privileged Access | Super Admin & Operations Admin lack TOTP MFA enforcement | Account takeover of platform admin credentials | Enforce Supabase Auth MFA / TOTP for privileged roles | Production Launch |
| **BLK-AUTH-06** | 🟡 **HIGH** | Logging | Security events (failed logins, role updates) are unlogged | Inability to audit security incidents | Create `public.security_events` table and log events | Production Launch |
