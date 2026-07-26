# 02. Environment Variable Audit & Security Verification

## Vercel Staging Environment Variables

| Variable Name | Exposure | Environment | Verified Status |
| :--- | :--- | :--- | :--- |
| `VITE_APP_NAME` | Public Browser | Staging | `Be Humble & Grow` |
| `VITE_APP_ENV` | Public Browser | Staging | `staging` |
| `VITE_APP_URL` | Public Browser | Staging | `https://behumbleandgrow-staging.vercel.app` |
| `VITE_APPLICATION_FEE_ENABLED` | Public Browser | Staging | `false` |
| `VITE_FIREBASE_MESSAGING_ENABLED` | Public Browser | Staging | `true` |
| `VITE_SUPABASE_URL` | Public Browser | Staging | `https://acfjjrupcigwjbqcbonw.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public Browser | Staging | `sb_publishable_mowxTxhcUduTcIiNs0DyNw_e4Z3-QqI` |
| `VITE_FIREBASE_PROJECT_ID` | Public Browser | Staging | `behumbleandgrow` |

## Secret Isolation Audit
- Confirmed zero exposure of `SUPABASE_SERVICE_ROLE_KEY`, DB passwords, Firebase Admin credentials, or payment secret keys in browser bundles.
