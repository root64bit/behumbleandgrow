# 03. Provider & Environment Configuration Audit
**Platform**: Be Humble & Grow  
**Audit Date**: July 25, 2026  

---

## 1. Authentication Provider Inventory & Validation

A complete audit was performed across all imported SDKs and configuration files to identify active authentication providers.

| Provider / SDK | Imported Files | Active Usage | Production Risk | Audit Finding |
| :--- | :--- | :--- | :--- | :--- |
| **Supabase Auth** (`@supabase/supabase-js`) | `src/lib/supabase/client.ts`, `src/lib/auth/AuthContext.tsx`, all `src/pages/auth/*` | **SOLE AUTHORITATIVE IDENTITY PROVIDER** | None (Primary Engine) | Handles user sign-up, sign-in, password reset, session persistence, and PKCE token refresh. |
| **Firebase Auth** | `src/lib/firebaseAuth.js`, `src/lib/firebaseClient.js` | **INACTIVE FOR AUTHENTICATION** | Low | Firebase SDK is configured **exclusively** for Firebase Cloud Messaging (FCM) push notifications (`VITE_FIREBASE_MESSAGING_ENABLED=true`). `firebaseAuth.js` contains legacy claims formatting helpers that are not invoked by active route guards. |
| **Custom Local Auth / Mock** | `src/pages/auth/OperationsLoginPage.tsx`, `PartnerLoginPage.tsx`, `EmployerLoginPage.tsx` | **ACTIVE ON SECONDARY PORTALS** | 🔴 **CRITICAL** | Secondary portal logins execute `setTimeout()` simulated navigation rather than authenticating against Supabase Auth. |

---

## 2. Environment Variables Matrix

| Variable Name | Required | Type / Scope | Exposed to Client Bundle? | Purpose | Safety Status | Audit Evidence | Action Required |
| :--- | :---: | :---: | :---: | :--- | :---: | :--- | :--- |
| `VITE_APP_NAME` | Yes | Public | Yes | Application Title | ✅ Safe | Non-sensitive string | None |
| `VITE_APP_ENV` | Yes | Public | Yes | Environment mode (`development`, `staging`, `production`) | ✅ Safe | Validated by Zod in `src/lib/config/env.ts` | None |
| `VITE_APP_URL` | Yes | Public | Yes | Base web application URL | ✅ Safe | Validated by Zod URL schema | None |
| `VITE_SUPABASE_URL` | **Yes** | **Public** | **Yes** | Supabase Project URL (`https://acfjjrupcigwjbqcbonw.supabase.co`) | ✅ Safe | Standard client endpoint | None |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | **Yes** | **Public** | **Yes** | Supabase Anon / Publishable Key | ✅ Safe | Public RLS client key (`sb_publishable_...`) | None |
| `VITE_SUPABASE_ANON_KEY` | Optional | Public | Yes | Fallback Supabase key | ✅ Safe | Alias for publishable key | None |
| `VITE_SQUARE_APP_ID` | Optional | Public | Yes | Square Web Payments App ID | ✅ Safe | Client SDK public App ID | None |
| `VITE_SQUARE_LOCATION_ID` | Optional | Public | Yes | Square Location ID | ✅ Safe | Public location identifier | None |
| `VITE_SQUARE_ENVIRONMENT` | Optional | Public | Yes | Square environment (`sandbox` or `production`) | ✅ Safe | Enum validated | None |
| `VITE_FIREBASE_API_KEY` | Optional | Public | Yes | Firebase Messaging API Key | ✅ Safe | Public web key for FCM | None |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Optional | Public | Yes | FCM Sender ID | ✅ Safe | Public FCM sender ID | None |
| `SQUARE_ACCESS_TOKEN` | Secret | **Secret** | **NO** | Server-side Square payment charge execution | ✅ Safe | Configured exclusively in Supabase Edge Secrets | Never place in `.env` |
| `SQUARE_WEBHOOK_SIGNATURE_KEY` | Secret | **Secret** | **NO** | Square Webhook HMAC verification | ✅ Safe | Configured exclusively in Supabase Edge Secrets | Never place in `.env` |

---

## 3. Secret Inspection Results

- **Service Role Key Verification**: Searched all source code in `src/` for Supabase service role keys (`service_role` or `sbp_`). **ZERO instances found**.
- **JWT Secret Verification**: **ZERO JWT secret keys exposed** in frontend bundle or client repositories.
- **Compiled JavaScript Inspection**: Inspected `dist/` production build output using `npm run build`. Verified that no secret database connection strings or secret API tokens are bundled into client assets.
