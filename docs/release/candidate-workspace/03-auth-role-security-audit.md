# 03 — Authentication & Role Security Audit

- **Auth Provider**: Supabase Auth (`@supabase/supabase-js`)
- **Role Enforcement Strategy**:
  - Browser local storage (`bhg_auth_token`, `sb-auth-token`, `sb-localhost-auth-token`) is treated solely as a transient session cache.
  - Role (`'candidate'`) is **NEVER** trusted from `localStorage`.
  - Roles are resolved directly from public table `user_roles` (`profile_id = auth.uid()`) inside `AuthContext.tsx`.
- **Role Guard**: `RoleGuard.tsx` wraps all candidate routes (`allowedRoles={['candidate']}`). Unauthenticated or non-candidate users are redirected cleanly to `/login` or `/access-denied`.
- **Session Expiration & Logout**:
  - Expired tokens fail PostgREST queries with 401 Unauthorized.
  - `signOut()` in `AuthContext` clears local React state, purges storage keys, and unsubscribes all active Realtime listeners.
- **Suspended Account Policy**:
  - Suspended profiles (`status = 'suspended'`) block workspace actions and display account suspension support contact guidance.
- **Sensitive Credentials Safety**:
  - Password and email updates use official Supabase Auth APIs (`supabase.auth.updateUser()`).
  - No access tokens, refresh tokens, or passwords are ever output to browser console logs or network analytics.
