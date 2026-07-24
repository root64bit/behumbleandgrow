# 09. Phase 0 Gap Register & Risk Log

| Gap ID | Identified Item | Current Status (Phase 0) | Risk Mitigation / Phase 1 Target |
| :--- | :--- | :--- | :--- |
| `GAP-P0-01` | Live Payments & Stripe Webhooks | Disabled (`VITE_APPLICATION_FEE_ENABLED=false`) | Phase 1: Edge function webhook signature verification & Stripe Connect integration |
| `GAP-P0-02` | Live Supabase Project Migration Deployment | SQL files updated & verified in local repository | Phase 1: Apply SQL migrations to live staging Supabase instance via Supabase CLI |
| `GAP-P0-03` | Automated E2E Playwright Suite | Unit & Integration Vitest suite complete | Phase 1: Expand Playwright E2E browser tests against staging backend |
| `GAP-P0-04` | MFA Enforcement for Financial Operations | DB functions check claims | Phase 1: Enable Supabase TOTP MFA enrollment on Operations/Finance accounts |
