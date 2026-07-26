# 30 — Technical Pilot Rollback Plan

- **Frontend Rollback Trigger**: Any P0 data leak, cross-candidate authorization failure, or fatal script error.
- **Frontend Baseline Target**: Git release commit `daeab6e` on branch `stitch-candidate-account-settings`.
- **Frontend Rollback Execution**:
  1. Trigger Vercel / Netlify instant deployment rollback to commit `daeab6e`.
  2. Clear CDN cache for `/candidate/*` static assets.
- **Database Rollback Execution**:
  1. Revert failed migration via `npx supabase db reset` or executing inverse SQL migration script.
  2. Revoke active session tokens for affected pilot users via Supabase Auth admin API.
- **Communication Protocol**: Issue immediate notification to pilot candidates explaining maintenance window.
