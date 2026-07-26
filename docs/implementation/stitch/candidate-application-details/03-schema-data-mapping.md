# Schema & Data Mapping — Candidate Application Details & Timeline

## Database Tables & Relational Mapping

| Detail Section | Actual Source Table / View | Ownership Relationship | Candidate-Visible Fields | RLS / Policy Rule |
|---|---|---|---|---|
| User Identity | `profiles` | `id = auth.uid()` | `full_name`, `email` | `profiles_select_policy` |
| Candidate Record | `candidates` | `id = profiles.id` | `headline`, `stage`, `verification_status` | `candidates_select_policy` |
| Application Details | `applications` | `candidate_id = candidates.id` | `id`, `job_id`, `stage`, `status`, `screening_answers`, `submitted_at`, `updated_at` | Candidate selects own application record |
| Status History Timeline | `status_history` | `entity_id = application.id` | `new_status`, `candidate_message`, `created_at` (Excludes `internal_note`) | Filtered by `user_role = 'candidate'` or candidate-visible entries |
| Job Summary | `jobs` | `id = application.job_id` | `title`, `location`, `salary_range`, `employer_id` | `jobs_select_policy` |
| Employer Disclosure | `organisations` | `id = jobs.employer_id` | `name` (Masked as `"Approved UAE Employer"` prior to stage 5) | Candidate-safe projection |
| Connected Requirements | `candidate_documents` | `candidate_id = candidates.id` | `document_type`, `file_name`, `verification_status`, `uploaded_at` | Candidate selects own documents |

## Timeline Event Mapping
- `submitted` → *"Application Submitted"* (Dossier created and received by operations)
- `onboarding` → *"Document Verification"* (Required credentials undergoing review)
- `partner_assigned` / `partner_interview` → *"Recruitment Review"* (Specialist candidate review)
- `employer_submitted` → *"Submitted to Employer"* (Dossier presented to UAE hiring team)
- `employer_interview` → *"Interview Scheduled"* (Video or panel interview arranged)
- `offer_issued` → *"Conditional Offer Issued"* (Official offer issued)
- `placed` → *"Placement in Progress"* (Relocation and onboarding underway)
- `withdrawn` → *"Application Withdrawn"* (Candidate withdrew candidacy)
