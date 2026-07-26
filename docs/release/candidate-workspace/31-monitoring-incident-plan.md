# 31 — Technical Pilot Monitoring & Incident Response Plan

- **Security & Authorization Telemetry**:
  - Monitor Supabase PostgREST 401 Unauthorized and 403 Forbidden HTTP status spikes.
  - Alert on failed `auth.uid()` checks in SECURITY DEFINER RPCs.
- **Client Error Observability**:
  - Monitor React Error Boundary catches and network API failure rates.
  - Track unhandled promise rejections on `/candidate/*` routes.
- **Incident Escalation Matrix**:
  - Level 1 (P2 - UI / Cosmetic): Logged in issue tracking; remediated in next pilot patch.
  - Level 2 (P1 - Non-blocking Functional): Operations triage; patch deployed within 24 hours.
  - Level 3 (P0 - Security / Data Access): Instant frontend rollback triggered; candidate session freeze initiated.
