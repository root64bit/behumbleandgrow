# 24 — Test Reliability & Execution Audit

- **Execution Distinction**:
  - **Vitest Unit Tests**: 212 distinct unit test cases across 54 test files (100% passing).
  - **Playwright Candidate Account Settings Suite**: 7 distinct functional test scenarios executed across 3 browsers (Chromium, Firefox, WebKit), producing 21 browser executions (100% passing).
  - **Playwright Candidate Integration Suite**: 9 distinct cross-module journeys executed across 3 browsers (Chromium, Firefox, WebKit), producing 27 browser executions (100% passing).
- **PostgREST Mock Reliability**: Mock routes evaluate `Accept` headers (`application/vnd.pgrst.object+json` vs `application/json`) to return exact object/array shapes required by Supabase JS `.single()` and `.maybeSingle()`.
- **Test Isolation**: Each test runs with a fresh clean page context and isolated mock auth session state.
