# 25 — Release Findings & Conditions Register

| ID | Severity | Module | Finding | Evidence | Release Effect | Remediation / Condition | Status |
|---|---|---|---|---|---|---|---|
| COND-001 | P1 (Public) / Pilot Condition | Database Security | Live PostgreSQL RLS policies not executed on live Supabase instance | Mocked Playwright route tests | Mandatory before Public Production | Execute `npx supabase db push` on linked staging/prod instance | OPEN (Pilot Condition) |
| COND-002 | P1 (Public) / Pilot Condition | File Storage | Private Storage bucket object isolation not live-tested | Mocked signed URL tests | Mandatory before Public Production | Verify object policies on hosted Supabase storage | OPEN (Pilot Condition) |
| COND-003 | P1 (Public) / Pilot Condition | Database RPCs | SECURITY DEFINER RPCs not live-tested on hosted Postgres | Mocked RPC tests | Mandatory before Public Production | Execute live RPC integration test suite on staging DB | OPEN (Pilot Condition) |
| COND-004 | P2 (Public) / Pilot Condition | Push & Sockets | Realtime sockets & FCM push message delivery not live-tested | Preferences & mock payload verified | Push notifications disabled during pilot | Require live Firebase/FCM project setup before push release | OPEN (Pilot Condition) |
| FIND-001 | P2 | Account Settings | Password input `minLength={8}` blocked custom React error rendering | Form constraint interception | Resolved in commit `39d6c8f` | Removed native HTML `minLength` attribute | RESOLVED |
| FIND-002 | P2 | Account Settings | `sr-only` quiet hours switch click timeout in WebKit/Firefox | Hidden input click failure | Resolved in commit `39d6c8f` | Added `data-testid="quiet-hours-toggle-label"` to switch label | RESOLVED |
| FIND-003 | P2 | Account Settings | PostgREST `.maybeSingle()` mock route header parsing error | PGRST header parsing error | Resolved in commit `daeab6e` | Added case-insensitive `vnd.pgrst.object` header check | RESOLVED |
| FIND-004 | P2 | Workspace Integration | Cross-module integration test suite missing | No single multi-journey file | Resolved in commit `e27a175` | Created `tests/candidate-workspace-integration.e2e.ts` (9 journeys) | RESOLVED |

- **Open P0 Blockers**: 0
- **Open P1 Public Release Blockers**: 3 (All classified as mandatory Closed Technical Pilot Conditions)
- **Open P2 Pilot Conditions**: 1 (FCM / Realtime disabled during technical pilot)
- **Resolved Findings**: 4 (All verified via unit & Playwright E2E suites)
