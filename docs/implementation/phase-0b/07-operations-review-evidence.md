# 07. Operations Review Workflow Evidence

## Queue & Dossier Review
1. Queue: `/operations/applications` lists incoming submissions.
2. Confidential Inspection: Privileged officers retrieve 30-minute signed URLs to review identity and qualification documents.
3. Decisioning: Status changes (`shortlisted`, `rejected`) write immutable entries to `public.status_history` capturing actor ID, timestamp, and optional internal notes.
4. Internal Note Isolation: Internal reviewer notes are strictly excluded from candidate API responses via RLS.
