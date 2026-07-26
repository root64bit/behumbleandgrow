# Master Status - YAKA Gestão de Condomínios

**Last Updated:** 2026-07-24  
**Project:** YAKA Gestão de Condomínios  
**Stack:** Vite + React + TypeScript + Vercel API routes + Supabase  
**Source of Truth:** GitHub `staging` branch  

---

## 1. Branch Strategy & Rules
- **`main`**: Production branch only. No direct pushes or untested commits.
- **`staging`**: Integration and testing branch. Primary source of truth for current development.
- **Rule**: Do not merge `staging` to `main` until staging login and Morador real-data status are fully validated.

---

## 2. Architecture & Environment Directives

### Authentication Setup
- **Login Issue Resolution:** Solved by removing the Supabase Auth proxy (`/api/supabase-proxy`).
- **Direct Auth Connection:** Supabase Auth connects directly to Supabase via `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- **Internal APIs:** Internal backend services continue to use `/api/*` routes.
- **Strict Prohibition:** Do NOT reintroduce `/api/supabase-proxy` for authentication.

### Framework & Tech Stack
- **Framework Directive:** Do NOT migrate to Next.js yet. Maintain the current Vite + React + TypeScript setup.

---

## 3. Module Integration Status Overview

| Module | Status | Integration Level | Key Notes |
| :--- | :--- | :--- | :--- |
| **Auth / Login** | Stable | Direct Supabase Auth | Direct authentication operational; proxy removed. |
| **Super Admin** | Mostly Integrated | Backend contracts + UI | Core dashboard and administrative functions active. |
| **Condo Admin** | Mostly Integrated | API + Database | Operational with real endpoints. |
| **Portaria** | Mostly Integrated | API-driven | Mostly driven by backend APIs. |
| **Morador** | Pending Real Data | Mock Runtime | Still uses `mockData`. High priority blocker for `main` release. |

---

## 4. Current Blockers & Next Actions
1. **Morador Real-Data Integration (`codex/morador-real-data-integration`):** Migrate Morador views from mock data to Supabase/API endpoints.
2. **Staging Validation:** Execute full release checklist verification on `staging` environment before promoting to `main`.
