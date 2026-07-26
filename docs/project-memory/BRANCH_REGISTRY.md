# Branch Registry - YAKA Project Memory

Tracking branch lifecycle, state, merging status, and associated risks.

| Branch | Purpose | Owner | Status | Merged to Staging? | Merged to Main? | Risk | Next Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`main`** | Production release target | DevOps / Lead | Active | N/A | Current Base | High | Hold until Morador real-data integration & release checklist pass |
| **`staging`** | Integration & pre-production testing | Team | Active | Current Base | No | Medium | Source of truth for active integration testing |
| **`codex/superadmin-backend-contracts`** | Super Admin backend API contracts & types | Codex | Merged | Yes | No | Low | Archived after staging merge |
| **`integration/superadmin-ui-after-backend`** | Super Admin UI component integration | AI Studio | Merged | Yes | No | Low | Archived after staging merge |
| **`codex/fix-api-base-and-login-context`** | Fix API base URL & login context initialization | Codex | Merged | Yes | No | Low | Archived after staging merge |
| **`codex/fix-login-non-json-response`** | Fix 404 HTML response parsing during auth | Codex | Merged | Yes | No | Low | Replaced by direct auth branch |
| **`codex/fix-supabase-proxy-catchall`** | Attempt catch-all proxy route on Vercel | Codex | Abandoned | No | No | Medium | Superseded by proxy removal |
| **`codex/remove-supabase-auth-proxy`** | Remove Auth proxy and connect directly to Supabase | Codex | Merged | Yes | No | Low | Validated on staging |
| **`codex/morador-real-data-integration`** | Connect Morador module to real backend & Supabase data | Codex | Planned | No | No | Medium | Create branch from `staging` and start implementation |
| **`ai/morador-ui-polish-after-real-data`** | Polish Morador UI after real data contract integration | AI Studio | Planned | No | No | Low | Execute after `codex/morador-real-data-integration` is merged to `staging` |
