# 08 — Candidate-Safe Field Projection Audit

| Service / View | Explicit Fields Projected | Sensitive Exclusions Enforced | Network Safe | Audit Result |
|---|---|---|---:|---|
| Candidate Profile Service | `id, full_name, email, country_code, phone, bio` | Excludes internal admin notes, risk scores, fraud flags | Yes | PASS |
| Document Vault Service | `id, document_type, file_name, file_size, uploaded_at` | Excludes storage bucket keys, service role keys | Yes | PASS |
| Applications Service | `id, job_title, status, applied_at, employer_name` | Excludes internal recruiter notes, candidate rating scores | Yes | PASS |
| Interviews Service | `id, scheduled_at, duration_minutes, status, format` | Excludes raw host meeting URLs, organizer tokens | Yes | PASS |
| Offers Service | `id, position_title, salary, currency, status, expires_at` | Excludes internal employer budget notes, commission rates | Yes | PASS |
| Placement Service | `id, stage, status, estimated_arrival, milestone_progress` | Excludes internal relocation cost breakdowns | Yes | PASS |
| Notifications Service | `id, title, message, category, is_read, created_at` | Excludes internal notification dispatch metadata | Yes | PASS |
| Support Service | `id, ticket_reference, subject, category, status, created_at` | Excludes internal staff assignment notes, internal triage tags | Yes | PASS |
