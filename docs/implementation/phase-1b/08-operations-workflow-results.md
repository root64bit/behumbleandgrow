# 08. Operations Review Workflow Results

## Reviewer Actions
- Application Queue: `/operations/applications` displays incoming candidate submissions.
- Confidential Dossier Inspection: Privileged officers retrieve 30-minute signed URLs to inspect candidate identity and diploma certificates.
- Decisioning: Document approval, rejection, or replacement requests.
- Audit Logging: Status transitions logged to append-only `public.status_history` table capturing actor ID, timestamp, and optional internal notes.
- Note Privacy: Internal reviewer notes excluded from candidate API responses via RLS.
