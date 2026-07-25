# 05. Login & Session Management Audit
**Platform**: Be Humble & Grow  
**Audit Date**: July 25, 2026  

---

## 1. Login Matrix Across Portals

| Portal | Login Page Path | Backend Invocation | Auth Provider | Status | Remediation Required |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Candidate Portal** | [LoginPage.tsx](file:///c:/Users/IBZ/Downloads/behumbleandgrow/src/pages/auth/LoginPage.tsx) | `supabase.auth.signInWithPassword()` | Supabase Auth | ✅ `IMPLEMENTED AND VERIFIED` | Remove DEV fallback bypass. |
| **Operations Access** | [OperationsLoginPage.tsx](file:///c:/Users/IBZ/Downloads/behumbleandgrow/src/pages/auth/OperationsLoginPage.tsx) | `setTimeout()` timeout | None (Mock) | 🔴 `MOCK IMPLEMENTATION` | Wire to `supabase.auth.signInWithPassword()` & verify `OPERATIONS_ROLES`. |
| **Partner Portal** | [PartnerLoginPage.tsx](file:///c:/Users/IBZ/Downloads/behumbleandgrow/src/pages/auth/PartnerLoginPage.tsx) | `setTimeout()` timeout | None (Mock) | 🔴 `MOCK IMPLEMENTATION` | Wire to `supabase.auth.signInWithPassword()` & verify `RECRUITER_ROLES`. |
| **Employer Portal** | [EmployerLoginPage.tsx](file:///c:/Users/IBZ/Downloads/behumbleandgrow/src/pages/auth/EmployerLoginPage.tsx) | `setTimeout()` timeout | None (Mock) | 🔴 `MOCK IMPLEMENTATION` | Wire to `supabase.auth.signInWithPassword()` & verify `EMPLOYER_ROLES`. |

---

## 2. Session Lifecycle & Token Handling

- **PKCE Storage Key**: `bhg_auth_token` in browser `localStorage`.
- **Session Persistence**: `persistSession: true`, `autoRefreshToken: true`, `detectSessionInUrl: true`.
- **Token Restoration**: `AuthContext.tsx` invokes `supabase.auth.getSession()` on app load, followed by `onAuthStateChange` listener to ensure token refreshes automatically update React state.
- **Logout Execution**: `logout()` in `AuthContext.tsx` calls `supabase.auth.signOut()` and resets React states (`user`, `session`, `profile`, `candidate`, `userRoles`, `activeOrgId`) to `null`.
