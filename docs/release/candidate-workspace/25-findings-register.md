# 25 — Release Findings Register

| ID | Severity | Module | Finding | Evidence | Remediation | Status |
|---|---|---|---|---|---|---|
| FIND-001 | P2 | Account Settings | Form submit `minLength={8}` blocked custom React error rendering | Browser constraint interception | Removed `minLength` attribute from password inputs | RESOLVED |
| FIND-002 | P2 | Account Settings | `sr-only` switch click timeout in WebKit/Firefox | Hidden input click failure | Added `data-testid="quiet-hours-toggle-label"` to switch label | RESOLVED |
| FIND-003 | P2 | Account Settings | PostgREST `.maybeSingle()` response shape mismatch in mock route | PostgREST header parsing error | Added case-insensitive `vnd.pgrst.object` header check | RESOLVED |
| FIND-004 | P2 | Workspace Integration | Cross-module integration test missing | No single multi-page journey suite | Created `tests/candidate-workspace-integration.e2e.ts` (9 journeys) | RESOLVED |

- **P0 Findings**: 0 (Zero release blockers)
- **P1 Findings**: 0 (Zero pilot blockers)
- **P2 Findings**: 4 (All resolved & verified)
- **P3 Findings**: 0 (Deferred enhancement items)
