# Vercel Deploy Log - YAKA Project Memory

Log of Vercel deployments, build validations, and environment verifications.

| Date | Branch | Commit | Environment | Build Status | Env Vars Checked | Manual Tests | Result | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **2026-07-21** | `codex/fix-supabase-proxy-catchall` | `q4r5s6t` | Preview | Success | Yes | Auth Login | Failed | `/api/supabase-proxy` returned 404 HTML |
| **2026-07-22** | `codex/remove-supabase-auth-proxy` | `u7v8w9x` | Preview | Success | Yes | Auth Login | Passed | Direct Supabase Auth restored login functionality |
| **2026-07-23** | `staging` | `y0z1a2b` | Staging | Success | Yes | Multi-role Auth, Admin APIs | Passed | Staging verified working with direct Auth |
