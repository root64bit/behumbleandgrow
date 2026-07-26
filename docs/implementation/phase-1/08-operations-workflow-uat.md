# 08. Operations Review Workflow UAT Report

## Reviewer Actions Tested
- Application Ingestion: View incoming submissions at `/operations/applications`.
- Confidential Dossier Inspection: Generate 30-minute signed URLs to inspect candidate identity and diploma certificates.
- Decisioning: Document approval, rejection, or replacement requests.
- Audit Logging: Status transitions logged to append-only `public.status_history` table capturing actor ID, timestamp, and optional internal notes.
