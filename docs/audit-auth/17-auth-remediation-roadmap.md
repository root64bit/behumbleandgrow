# 17. Authentication Remediation Roadmap
**Platform**: Be Humble & Grow  
**Audit Date**: July 25, 2026  

---

## 1. Remediation Phases & Milestones

### Phase A — Critical Identity & Route Security (Immediate Target: Candidate Pilot)
1. **Remove DEV Route Guard Bypass**: Delete lines 31-33 and 74-76 in `src/lib/auth/RouteGuards.tsx`.
2. **Wire Secondary Login Forms**: Update `OperationsLoginPage.tsx`, `PartnerLoginPage.tsx`, and `EmployerLoginPage.tsx` to execute real `supabase.auth.signInWithPassword()` calls and validate required RBAC roles.
3. **Mandate Candidate Email Verification**: Ensure `requireEmailVerified: true` is enforced for candidate onboarding routes.

### Phase B — Session, Organisation & Invitation Security (Target: Partner & Employer Pilot)
1. **Database Invitation Engine**: Create `public.invitations` table and replace mock JSON in `InviteAcceptancePage.tsx` with server-validated single-use tokens.
2. **Organisation Membership Verification**: Enforce dynamic active organisation membership checks in `AuthContext.tsx` on login.

### Phase C — Privileged Account Hardening & Security Logging (Target: Public Production)
1. **Multi-Factor Authentication (MFA)**: Require TOTP enrolment for `super_admin` and `operations_admin` roles.
2. **Security Event Logging**: Implement `public.security_events` table and log authentication failures and role modifications.
3. **Playwright E2E Test Suite**: Implement automated Playwright browser tests covering sign-up, email verification, session restoration, and cross-tenant access denial.
