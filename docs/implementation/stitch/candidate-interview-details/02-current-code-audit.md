# Current Code Audit — Candidate Interview Details

## Inspection Findings
- **Page Component**: `src/pages/candidate/CandidateInterviewDetailsPage.tsx` does not exist yet. Needs to be created.
- **Route Registration**: Route `/candidate/interviews/:interviewId` must be registered in `src/routes/index.tsx` under candidate protected layout.
- **Layout Integration**: Renders inside `CandidateLayout` router outlet.

## Core Security & Privacy Safeguards
1. **Ownership Authorization**: Resolves via `auth.uid()` -> `profiles.id` -> `candidates.id` -> `applications.candidate_id` -> `interviews.application_id`.
2. **Field Exclusion at Network Layer**: Internal reviewer notes, recruiter scores, interviewer phone/email, private employer feedback, and raw meeting URL host tokens are excluded at the network layer.
3. **Meeting Link Security (Level 3 Enforced)**: Raw meeting URLs are NEVER returned in initial list or detail queries. The frontend requests temporary access via `requestMySecureMeetingAccess(interviewId)`, which verifies authenticated candidate identity, interview status, and server time access window before returning a short-lived URL or redirect.
4. **Time-Zone Handling**: Dual time display via `interviewTime.ts` (Candidate local IANA time zone vs UAE `Asia/Dubai` time zone).
5. **Controlled Mutations**: Attendance confirmation and reschedule requests verify candidate ownership and matching `updated_at` timestamps before executing updates.
