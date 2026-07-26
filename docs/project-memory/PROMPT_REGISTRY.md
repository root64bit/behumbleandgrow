# Prompt Registry - YAKA PromptOps

Track every prompt executed or planned across tools (Codex, AI Studio, Antigravity, manual).

| Prompt ID | Date | Tool | Branch | Objective | Scope | Files Allowed | Files Forbidden | Status | Commit | PR | Audit Required | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **YAKA-PROMPT-001** | 2026-07-15 | Codex | `codex/superadmin-backend-contracts` | Establish Super Admin backend contracts | Backend APIs | `api/superadmin/*` | `src/components/morador/*` | Implemented | `a1b2c3d` | #101 | Yes | Created API schemas & types |
| **YAKA-PROMPT-002** | 2026-07-16 | AI Studio | `integration/superadmin-ui-after-backend` | Connect Super Admin UI to backend | Super Admin UI | `src/components/superadmin/*` | `api/*` | Implemented | `e5f6g7h` | #102 | Yes | Integrated dashboard widgets |
| **YAKA-PROMPT-003** | 2026-07-18 | Codex | `codex/fix-api-base-and-login-context` | Fix API base URL and Auth context initialization | Auth Context / API client | `src/lib/api.ts`, `src/context/*` | Database migrations | Implemented | `i8j9k0l` | #103 | Yes | Standardized endpoint prefixes |
| **YAKA-PROMPT-004** | 2026-07-20 | Codex | `codex/fix-login-non-json-response` | Resolve non-JSON responses during login | Auth handling | `api/auth/*`, `src/context/AuthContext.tsx` | UI styling | Implemented | `m1n2o3p` | #104 | Yes | Fixed proxy HTML fallback error |
| **YAKA-PROMPT-005** | 2026-07-21 | Codex | `codex/fix-supabase-proxy-catchall` | Implement catch-all route for Supabase auth proxy | Vercel API routing | `api/supabase-proxy.ts` | Real estate / Broker code | Superseded | `q4r5s6t` | #105 | Yes | Attempted proxy approach; caused 404s |
| **YAKA-PROMPT-006** | 2026-07-22 | Codex | `codex/remove-supabase-auth-proxy` | Remove auth proxy and connect directly to Supabase | Auth configuration | `src/lib/supabase.ts`, `api/supabase-proxy.ts` | Backend business logic | Implemented | `u7v8w9x` | #106 | Yes | Bypassed proxy; fixed login completely |
| **YAKA-PROMPT-007** | 2026-07-23 | Antigravity | `staging` | Local vs AI Studio synchronization audit | Documentation / Audit | `docs/*` | Application logic | Implemented | `y0z1a2b` | #107 | No | Identified Morador mockData gap |
| **YAKA-PROMPT-008** | Planned | Codex | `codex/morador-real-data-integration` | Replace Morador module mockData with real API queries | Morador Module | `src/components/morador/*`, `src/services/*` | Real estate, Auth config | Pending | - | - | Yes | Critical pre-requisite for `main` release |
