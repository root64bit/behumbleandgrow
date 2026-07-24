# Project Memory & PromptOps System - YAKA Gestão de Condomínios

Welcome to the PromptOps and Project Memory governance framework for YAKA Gestão de Condomínios. This system ensures complete auditability, branch safety, and architectural discipline across all developer environments and AI assistants (Codex, AI Studio, Antigravity).

---

## 1. How to Use the System

The project memory consists of structured markdown documents in `docs/project-memory/`, alongside `prompts/` and `audits/` directories:

- **`docs/project-memory/MASTER_STATUS.md`**: Overall platform state and stack configuration.
- **`docs/project-memory/PROMPT_REGISTRY.md`**: Central table of all executed and planned prompts.
- **`docs/project-memory/AUDIT_REGISTRY.md`**: Audit history, completion percentages, and findings.
- **`docs/project-memory/BRANCH_REGISTRY.md`**: Tracking active, merged, and planned git branches.
- **`docs/project-memory/DECISION_LOG.md`**: Architectural Decision Records (ADRs).
- **`docs/project-memory/RELEASE_CHECKLIST.md`**: Strict verification gate before `staging` -> `main`.
- **`docs/project-memory/VERCEL_DEPLOY_LOG.md`**: Track deployment results on Vercel.
- **`docs/project-memory/SUPABASE_CHANGE_LOG.md`**: Track schema, migration, and RLS policy updates.
- **`docs/project-memory/MODULE_STATUS.md`**: State matrix of each module (Mock vs. API data sources).

---

## 2. How to Create a New Prompt ID

1. **Pick the Next ID:** Check `docs/project-memory/PROMPT_REGISTRY.md` for the highest existing ID (e.g., `YAKA-PROMPT-008` -> Next is `YAKA-PROMPT-009`).
2. **Create Pending Prompt File:** Copy `prompts/pending/TEMPLATE_PROMPT.md` to `prompts/pending/YAKA-PROMPT-009-feature-name.md`.
3. **Fill in Details:** Define Objective, Scope, Do Not Touch, Files Allowed, Files Forbidden, and Validation Commands.
4. **Update Registry:** Add an entry for `YAKA-PROMPT-009` in `PROMPT_REGISTRY.md` with status `Pending`.
5. **After Execution:** Move the completed file from `prompts/pending/` to `prompts/implemented/` (using `TEMPLATE_IMPLEMENTED_PROMPT.md` format) and mark status `Implemented` in `PROMPT_REGISTRY.md`.

---

## 3. How to Record an Audit

1. **Conduct Audit:** Run required verification commands (`npm run check`, `npm run build`, `git status`) or visual checks.
2. **Assign Audit ID:** Format as `AUDIT-00X` (e.g., `AUDIT-005`).
3. **Create Audit File:** Use `audits/local/TEMPLATE_LOCAL_AUDIT.md` (or AI Studio, Vercel, Supabase templates) and save to the corresponding directory (e.g., `audits/local/2026-07-25-morador-integration-audit.md`).
4. **Register Audit:** Log the audit in `docs/project-memory/AUDIT_REGISTRY.md` with completion %, critical findings, recommendation, and linked prompt ID.

---

## 4. How to Record an Architectural Decision (ADR)

1. Open `docs/project-memory/DECISION_LOG.md`.
2. Add a new section `ADR-00X: Title`.
3. Fill out the mandatory fields:
   - **Context:** Why is this decision needed?
   - **Decision:** What is the exact policy or choice?
   - **Reason:** Why was this option chosen over alternatives?
   - **Impact:** What changes as a result?
   - **Status:** Accepted / Proposed / Deprecated.

---

## 5. How to Decide Whether Code Can Ship (`staging` -> `main`)

Code CANNOT ship to `main` unless **all** criteria in `docs/project-memory/RELEASE_CHECKLIST.md` pass:
1. `npm run check` and `npm run build` pass clean.
2. Direct Supabase Auth is verified with zero proxy requests.
3. `/api/superadmin/dashboard` returns 401 without token.
4. RBAC is verified (non-admins blocked from Super Admin).
5. No `mockData` in release target modules (e.g., Morador module must be fully integrated with real endpoints).
6. Service role keys are NOT present in client code.
7. Registries (`AUDIT_REGISTRY.md`, `PROMPT_REGISTRY.md`, `BRANCH_REGISTRY.md`) are updated.

---

## 6. How AI Studio and Codex Should Coordinate

To prevent conflict and regressions between backend logic and UI presentation:

- **Codex (Backend & Contracts First):**
  - Works on `codex/*` branches.
  - Allowed files: `api/*`, `src/services/*`, `src/context/*`, `src/lib/*`.
  - Defines data interfaces, hooks, backend API contracts, and Supabase integration.
  - Merges to `staging` once validated.

- **AI Studio (UI Polish Second):**
  - Works on `ai/*` or `integration/*` branches **after** Codex contracts are merged.
  - Allowed files: `src/components/*`, CSS/styles.
  - Forbidden from modifying `api/*`, auth configs, or core state hooks.
  - Focuses on design fidelity, layout, component aesthetics, and micro-animations.

- **Antigravity / Local Agent (Governance & Verification):**
  - Audits both branches, verifies types/builds, and updates project memory.
