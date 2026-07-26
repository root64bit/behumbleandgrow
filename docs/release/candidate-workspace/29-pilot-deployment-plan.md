# 29 — Closed Technical Pilot Deployment Plan

- **Target Environment**: Staging / Technical Pilot Environment
- **Supabase Project Configuration**: Linked Supabase Staging Project (`npx supabase db push --linked`)
- **Environment Variables Checklist**:
  - `VITE_SUPABASE_URL` (Configured to staging Supabase URL)
  - `VITE_SUPABASE_ANON_KEY` (Configured to staging public anon key)
  - `VITE_DEMO_DATA_ENABLED=false` (Production mode enabled, zero mock candidates)
- **Pilot User Onboarding**: Whitelisted invited candidate accounts only.
- **Disabled Pilot Features**: Paid application fees (waived/disabled), FCM push service worker (disabled).
- **Smoke Test Checklist**:
  1. Login with candidate test identity.
  2. Navigate to Dashboard -> Profile -> Document Vault -> Applications -> Interviews -> Offers -> Placement -> Support -> Settings.
  3. Change preferred language & time zone; verify floating save bar.
  4. Verify pilot compliance disclaimer: `"Application fee disabled during the closed technical pilot."`.
