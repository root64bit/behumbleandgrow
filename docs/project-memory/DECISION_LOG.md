# Architecture Decision Log (ADR) - YAKA Project Memory

Record of key architectural, infrastructure, and workflow decisions.

---

## ADR-001: GitHub `staging` Branch as Primary Source of Truth

- **Context:** Development occurs across multiple developer environments and AI assistants (Codex, AI Studio, Antigravity). A single authoritative branch is required for integration.
- **Decision:** Establish GitHub `staging` as the official source of truth. `main` is reserved strictly for production deployments.
- **Reason:** Prevents premature production breakage and guarantees all AI and developer contributions converge in a single, verifiable integration environment.
- **Impact:** All feature branches must branch off and merge back into `staging`. `main` is only updated via pull requests from `staging` after passing all release checks.
- **Status:** Accepted

---

## ADR-002: Retain Vite; Do Not Migrate to Next.js Yet

- **Context:** Discussions arose regarding migrating the platform frontend from Vite + React to Next.js for server-side rendering capability.
- **Decision:** Keep the Vite + React Single Page Application (SPA) architecture for the current phase. Do not initiate a Next.js migration.
- **Reason:** Current application requirements are well-served by Vite SPA combined with Vercel API Serverless functions (`/api/*`). Migrating to Next.js prematurely would introduce unnecessary complexity, rewrite churn, and delivery delays.
- **Impact:** Frontend build system remains Vite. Serverless endpoints remain under `/api`.
- **Status:** Accepted

---

## ADR-003: Remove Supabase Auth Proxy and Use Direct Supabase Auth

- **Context:** An intermediate proxy endpoint (`/api/supabase-proxy`) was introduced to route Supabase Auth requests through Vercel serverless functions. This proxy failed in edge cases, returning HTML 404 pages that crashed client JSON parsing.
- **Decision:** Completely remove `/api/supabase-proxy` for authentication. Connect client-side Supabase Auth directly to Supabase using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Internal custom APIs will continue to use `/api/*`.
- **Reason:** Supabase Auth JS SDK handles direct client-to-Supabase authentication securely, efficiently, and natively. Proxying Auth headers introduced brittle points of failure.
- **Impact:** Login stability restored. Forbidden from re-introducing Auth proxy routes. Internal non-auth endpoints retain `/api/*` architecture.
- **Status:** Accepted

---

## ADR-004: Separation of Concerns: Codex Logic vs. AI Studio UI Work

- **Context:** Mixing backend contract changes with UI/UX styling within the same AI prompt or agent context caused fragmented code changes and regressions.
- **Decision:** Enforce strict separation of responsibilities:
  - **Codex / Backend Agents:** Handle business logic, API contracts, data fetching services, and state hooks.
  - **AI Studio / UI Agents:** Handle visual styling, component layouts, design systems, and presentation polish.
- **Reason:** Clear boundary prevents UI agents from breaking data contracts and backend agents from degrading visual aesthetics.
- **Impact:** Prompts must explicitly declare `Files Allowed` and `Files Forbidden` adhering to this boundary.
- **Status:** Accepted

---

## ADR-005: Morador Real-Data Integration as Mandatory Blocker for `main`

- **Context:** While Super Admin, Condo Admin, and Portaria modules are largely integrated with live APIs/Supabase, the Morador module still relies on `mockData`.
- **Decision:** Declare the complete migration of the Morador module from `mockData` to live Supabase/API contracts as a hard blocker for merging `staging` to `main`.
- **Reason:** Releasing mock-driven interfaces to production will cause data inconsistency, end-user confusion, and security risks.
- **Impact:** Next priority task is `codex/morador-real-data-integration`. Production release is paused until complete.
- **Status:** Accepted
