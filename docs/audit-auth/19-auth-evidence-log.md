# 19. Authentication Evidence Log
**Platform**: Be Humble & Grow  
**Audit Date**: July 25, 2026  

---

## 1. Key Codebase Inspection Evidence

- **Client Initialisation**: [src/lib/supabase/client.ts](file:///c:/Users/IBZ/Downloads/behumbleandgrow/src/lib/supabase/client.ts) (Lines 7-18: PKCE flow enabled, storageKey `'bhg_auth_token'`).
- **Auth Provider Context**: [src/lib/auth/AuthContext.tsx](file:///c:/Users/IBZ/Downloads/behumbleandgrow/src/lib/auth/AuthContext.tsx) (Lines 72-101: `getSession` and `onAuthStateChange` listeners).
- **Route Protection**: [src/lib/auth/RouteGuards.tsx](file:///c:/Users/IBZ/Downloads/behumbleandgrow/src/lib/auth/RouteGuards.tsx) (Lines 31-33: DEV bypass flaw identified).
- **Candidate Registration**: [src/pages/auth/RegisterPage.tsx](file:///c:/Users/IBZ/Downloads/behumbleandgrow/src/pages/auth/RegisterPage.tsx) (Lines 61-73: `supabase.auth.signUp` call with explicit `emailRedirectTo`).
- **Email Verification**: [src/pages/auth/VerifyEmailPage.tsx](file:///c:/Users/IBZ/Downloads/behumbleandgrow/src/pages/auth/VerifyEmailPage.tsx) (Lines 35-43: `supabase.auth.resend` trigger).
- **Database Trigger**: [supabase/migrations/20260725000001_auto_create_profile_trigger.sql](file:///c:/Users/IBZ/Downloads/behumbleandgrow/supabase/migrations/20260725000001_auto_create_profile_trigger.sql) (`handle_new_user()` trigger).
