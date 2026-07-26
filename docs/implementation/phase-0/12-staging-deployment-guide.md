# 12. Staging Deployment & Environment Guide

## Staging Setup Requirements

1. **Dedicated Staging Supabase Instance**:
   - Create a staging project in Supabase dashboard.
   - Apply migrations sequentially:
     ```bash
     supabase db push --stg
     ```
   - Verify tables, triggers, and RLS policies using Supabase CLI.

2. **Environment Variables**:
   - Set `VITE_SUPABASE_URL` to staging Supabase API URL.
   - Set `VITE_SUPABASE_ANON_KEY` to staging anonymous key.
   - Enforce `VITE_APPLICATION_FEE_ENABLED=false`.

3. **CI/CD Staging Pipeline**:
   - GitHub Actions workflow (`.github/workflows/ci.yml`) executes lint, type check, unit tests, and production build on `main` and `phase-0-secure-foundation` branches.
   - Auto-deploy to Vercel Staging environment upon successful CI run.
