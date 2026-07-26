# Phase A12 — Current Code Audit: Candidate Support Centre

## Pre-Implementation Inspection
Prior to Phase A12 implementation:
1. `src/pages/candidate/CandidateSupportPage.tsx`:
   - Contained a static mock form with hardcoded FAQ items and no database queries, RLS policies, cursor pagination, or real ticket state management.
2. `supabase/migrations/`:
   - No dedicated support tables (`candidate_support_tickets`, `candidate_support_messages`, `candidate_support_attachments`) or support RPCs existed in previous migrations.

## Replaced Code & Upgrades
- Rebuilt `src/pages/candidate/CandidateSupportPage.tsx` using modular architecture:
  - Custom hook: `useCandidateSupport`
  - Service layer: `CandidateSupportService` (`candidate-support.service.ts`)
  - Helper libraries: `supportCategory.ts`, `supportStatus.ts`, `supportValidation.ts`
  - 21 focused UI components under `src/components/candidate/support/`
  - 5 Vitest unit test suites in `src/test/`
  - Playwright E2E suite in `tests/candidate-support.e2e.ts`
