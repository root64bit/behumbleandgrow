# 03. Authentication Lifecycle & Session Verification

## Features Implemented & Verified
- PKCE authentication flow via `src/lib/auth/AuthContext.tsx`.
- Registration, email verification notice (`/verify-email`), login, logout, password recovery (`/forgot-password`), and password reset (`/reset-password`).
- Session restoration from local storage key `bhg_auth_token`.
- Strict server-enforced route guards (`ProtectedRoute`, `RoleGuard`).
- Client portal switcher removed from public user interface.
