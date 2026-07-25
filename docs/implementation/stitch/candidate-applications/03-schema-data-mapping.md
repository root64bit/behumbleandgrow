# Schema & Data Mapping — Candidate Applications List

## Database Tables & Relational Mapping

| Concern | Actual Table / View | Key | Ownership Relationship | Candidate-Visible Fields | RLS / Access Rule |
|---|---|---|---|---|---|
| User Identity | `profiles` | `id` | `id = auth.uid()` | `full_name`, `email` | `profiles_select_policy` |
| Candidate Record | `candidates` | `id` | `id = profiles.id` | `headline`, `stage`, `verification_status` | `candidates_select_policy` |
| Application Record | `applications` | `id` | `candidate_id = candidates.id` | `id`, `job_id`, `stage`, `status`, `submitted_at`, `updated_at` | `applications_policy` (Candidate selects own) |
| Job Record | `jobs` | `id` | `job_id = jobs.id` | `id`, `title`, `location`, `salary_range`, `employer_id` | `jobs_select_policy` |
| Employer Organisation | `organisations` | `id` | `organisations.id = jobs.employer_id` | `name` (Controlled by disclosure rule) | Candidate-safe projection |

## Canonical Status Mapping
- `draft` → `"Draft"`
- `submitted` → `"Submitted"`
- `under_review` → `"Under Review"`
- `qualified` / `eligibility_passed` → `"Eligibility Passed"`
- `partner_assigned` / `partner_interview` → `"Partner Review"`
- `employer_submitted` → `"Submitted to Employer"`
- `employer_review` → `"Employer Review"`
- `interview_scheduled` / `employer_interview` → `"Interview Scheduled"`
- `offer_issued` → `"Conditional Offer"`
- `offer_accepted` → `"Offer Accepted"`
- `visa_processing` / `placed` → `"Placement in Progress"`
- `rejected` → `"Not Selected"`
- `withdrawn` → `"Withdrawn"`
- `closed` → `"Closed"`
