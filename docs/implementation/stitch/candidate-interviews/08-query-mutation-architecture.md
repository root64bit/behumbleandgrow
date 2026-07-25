# Query & Mutation Architecture

## Candidate-Safe Queries
- `loadMyInterviews` selects candidate-owned interviews via `applications.candidate_id = auth.uid()`.
- Cursor pagination ordered by `scheduled_at ASC, id ASC`.

## Controlled Mutations
- **Attendance Confirmation**:
  - `confirmMyAttendanceConcurrencySafe(userId, interviewId, expectedUpdatedAt)`
  - Verifies ownership and updates `status = 'confirmed'`.
- **Reschedule Request**:
  - `requestMyInterviewRescheduleConcurrencySafe(userId, interviewId, reason, candidateNote, expectedUpdatedAt)`
  - Verifies ownership and updates `status = 'reschedule_requested'` without directly mutating `scheduled_at`.
