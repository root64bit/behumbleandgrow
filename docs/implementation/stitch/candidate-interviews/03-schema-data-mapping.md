# Schema & Data Mapping — Candidate Interviews List

## Database Tables & Relational Mapping

| Interview Concern | Actual Source Table | Ownership Relationship | Candidate-Visible Fields | RLS Policy Rule |
|---|---|---|---|---|
| Interview Record | `interviews` | `candidate_id = auth.uid()` via `applications.candidate_id` | `id`, `application_id`, `scheduled_at`, `duration_minutes`, `status`, `format` | Candidate selects own interviews |
| Application Relation | `applications` | `candidate_id = auth.uid()` | `id`, `job_id`, `stage`, `status`, `employer_disclosure_status` | Candidate selects own applications |
| Job Information | `jobs` | `id = application.job_id` | `title`, `location`, `salary_range`, `employer_id` | `jobs_select_policy` |
| Employer Disclosure | `organisations` | `id = jobs.employer_id` | `name` (Masked as `"Approved UAE Employer"` prior to disclosure authorization) | Candidate-safe projection |
| Attendance Confirmation | `interviews.status` / `candidate_confirmation` | Candidate-owned record update | `status = 'confirmed'`, `updated_at` | Candidate confirms own interview |
| Reschedule Request | `interviews.status` / `reschedule_requests` | Candidate-owned record insert/update | `status = 'reschedule_requested'`, `reason`, `requested_at` | Candidate submits reschedule request |

## Candidate Field Projection
- **Allowed**: `id`, `application_id`, `job_title`, `employer_display_name`, `scheduled_at`, `duration_minutes`, `status`, `format`, `meetingLinkAvailable`.
- **Excluded**: `internal_note`, `recruiter_score`, `interviewer_private_feedback`, `interviewer_phone`, `interviewer_email`, `raw_meeting_host_token`.
