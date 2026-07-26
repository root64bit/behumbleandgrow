# 08 — Candidate-Safe Field Projection & Network Audit

| Service / Domain | Explicit Database Fields Projected | Sensitive Exclusions Enforced | Network Safe | Audit Result |
|---|---|---|---:|---|
| Profiles Service (`public.profiles`) | `id, full_name, email, country_code, status, created_at` | Excludes internal admin notes, rating scores, risk/fraud flags | Yes | PASS |
| Candidate Record (`public.candidates`) | `id, user_id, phone, date_of_birth, nationality` | Excludes raw passport file paths, internal recruiter feedback | Yes | PASS |
| Documents Vault (`public.candidate_documents`) | `id, document_type, file_name, status, uploaded_at` | Excludes raw storage bucket keys, internal verification notes | Yes | PASS |
| Applications (`public.applications`) | `id, job_id, status, employer_disclosure_status, applied_at` | Excludes recruiter scorecards, employer candidate notes | Yes | PASS |
| Interviews (`public.interviews`) | `id, scheduled_at, duration_minutes, format, status` | Excludes raw host meeting URLs, organizer tokens | Yes | PASS |
| Offers (`public.offers`) | `id, position_title, salary, currency, status, expires_at` | Excludes internal employer budget margins, recruiter commission | Yes | PASS |
| Placement (`public.candidate_placements`) | `id, stage, status, milestone_progress, created_at` | Excludes internal relocation budget allocation | Yes | PASS |
| Notifications (`public.candidate_notifications`) | `id, category, title, summary, read_at, created_at` | Excludes internal notification dispatch metadata | Yes | PASS |
| Support Tickets (`public.candidate_support_tickets`) | `id, ticket_reference, category, subject, description, status, urgency, created_at` | Excludes staff assignment notes, internal triage tags | Yes | PASS |
| Support Messages (`public.candidate_support_messages`) | `id, ticket_id, author_role, message_text, created_at` | Excludes internal staff-only messages | Yes | PASS |
