# Release Checklist (`staging` -> `main`) - YAKA Project Memory

Mandatory verification checklist before approving any Pull Request from `staging` to `main`.

---

## 1. Code Quality & Build Verification
- [ ] `npm run check` (TypeScript compilation & linting passes without errors)
- [ ] `npm run build` (Vite production bundle builds cleanly without errors or broken imports)

## 2. Environment & Infrastructure
- [ ] Vercel staging deployed cleanly without build cache
- [ ] Vercel environment variables confirmed and synced (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, etc.)
- [ ] Supabase database migrations confirmed and applied in target environment

## 3. Security & Access Control
- [ ] Login uses direct Supabase URL (`VITE_SUPABASE_URL`)
- [ ] Zero `/api/supabase-proxy` Auth requests active in browser console or network trace
- [ ] `/api/superadmin/dashboard` returns HTTP 401 JSON response when requested without a valid token
- [ ] `condo_admin` role verified unable to access Super Admin routes/endpoints
- [ ] `morador` role verified unable to access Super Admin routes/endpoints
- [ ] `portaria` role verified unable to access Super Admin routes/endpoints
- [ ] **Strict Security Check:** Service role key (`SUPABASE_SERVICE_ROLE_KEY`) is NOT present anywhere inside `src/` or exposed to client bundle

## 4. Module & Data Integration
- [ ] Super Admin dashboard loads with real data
- [ ] Morador module `mockData` status reviewed & confirmed fully replaced by live endpoints/Supabase queries

## 5. Documentation & Audit Operations
- [ ] Audit registry (`AUDIT_REGISTRY.md`) updated with latest test run results
- [ ] Prompt registry (`PROMPT_REGISTRY.md`) updated with all implemented prompt IDs
- [ ] Branch registry (`BRANCH_REGISTRY.md`) updated with current release tags
