# 06. Candidate Workflow Persistence Evidence

## Data Flow Verification
1. Registration & Login: Session restored upon refresh.
2. Pre-Screening: Passed status updates `candidates` table stage.
3. Profile Details: Full personal info, work experiences, and education records saved to `profiles`, `candidates`, `work_experiences`, `educations`.
4. Job Application: Requisitions queried from `jobs` table (`status == 'published'`). Application recorded in `applications` with unique reference `APP-2026-XXXX`.
