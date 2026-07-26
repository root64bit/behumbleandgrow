# 30 — Authoritative Technical Pilot Rollback Plan

## Emergency Rollback Procedures (No `supabase db reset` on Shared DB)

> [!CAUTION]
> **Shared Environment Safety**: `supabase db reset` must **NEVER** be used on a shared staging or production database. Shared environment rollbacks use versioned frontend deployments, feature flags, and targeted migration rollbacks.

### 1. Frontend Web App Instant Rollback
- **Trigger**: Any P0 cross-candidate data exposure, authorization failure, or fatal client crash.
- **Rollback Target**: Vercel / Netlify deployment rollback targeting git release baseline commit `daeab6e` on branch `stitch-candidate-account-settings`.
- **Execution Time Target**: `< 5 minutes`.

### 2. Feature & RPC Revocation
- **RPC Lockdown**: Execute `REVOKE EXECUTE ON FUNCTION <function_name> FROM authenticated;` for any compromised service.
- **Feature Flag Shutdown**: Set `VITE_DEMO_DATA_ENABLED=false` and disable affected candidate feature components.

### 3. Database Migration Remediation
- **Procedure**: Apply targeted down-migration SQL script (`20260726000004_remediate_<feature>.sql`).
- **Session Revocation**: Execute `supabase.auth.admin.signOut(user_id)` for impacted pilot accounts.

### 4. Storage Lockdown
- **Procedure**: Set `public.storage.policies` read access to false for impacted buckets (`candidate-cv`, `candidate-identity`, etc.).
