# 02. Environment Security & Variable Classification

## Classification Matrix

| Environment Variable | Public / Secret | Classification | Purpose & Scope |
| :--- | :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Public Configuration | Production-Required | Public API endpoint for browser client |
| `VITE_SUPABASE_ANON_KEY` | Public Configuration | Production-Required | Anonymous client JWT key (RLS-restricted) |
| `VITE_APPLICATION_FEE_ENABLED` | Public Configuration | Development/Staging | Feature flag (Set to `false` in Phase 0) |
| `VITE_FIREBASE_API_KEY` | Public Configuration | Development-Only | Legacy Firebase web key |
| `VITE_FIREBASE_PROJECT_ID` | Public Configuration | Development-Only | Legacy Firebase project identifier |

## Security Controls Enforced
- `.env.example` committed with no real credentials.
- HTTP Security Headers added to `vercel.json` (`Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- Service-role keys, database passwords, and payment provider keys are prohibited from frontend code bundles.
