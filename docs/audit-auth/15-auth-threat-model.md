# 15. Authentication Threat Model & Attack Analysis
**Platform**: Be Humble & Grow  
**Audit Date**: July 25, 2026  

---

## 1. Threat Matrix & Vulnerability Analysis

| Threat Scenario | Attack Vector | Existing Control | Weakness / Gap | Severity | Remediation Required |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Development Guard Bypass** | Attacker accesses `/superadmin` or `/operations` in DEV mode | Route Guard checks session | `import.meta.env.DEV` bypass short-circuits check | 🔴 **CRITICAL** | Remove DEV bypass in `RouteGuards.tsx`. |
| **Secondary Portal Authentication Bypass** | Attacker navigates to `/operations` or `/partner` directly | Form submit uses `setTimeout()` | Form does not call Supabase Auth | 🔴 **CRITICAL** | Wire secondary forms to `signInWithPassword()`. |
| **Invitation Replay & Token Spoofing** | Attacker uses static invitation token | Hardcoded JSON metadata | Token is not validated against DB | 🔴 **CRITICAL** | Implement `public.invitations` DB verification. |
| **Account Takeover via Weak Reset** | Attacker manipulates reset link origin | `redirectTo` specified | None found (`redirectTo` matches origin) | ✅ **SAFE** | Enforce link origin whitelist in Supabase. |
| **User Enumeration** | Attacker probes `/forgot-password` | Non-enumerating message | Generic message displayed | ✅ **SAFE** | Maintain generic messaging. |
| **Privileged Session Hijacking** | Admin leaves session unattended | PKCE session in `localStorage` | No TOTP MFA enforced for admins | 🟡 **HIGH** | Enforce TOTP MFA for `super_admin`. |
