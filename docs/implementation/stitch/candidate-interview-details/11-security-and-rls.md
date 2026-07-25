# Security & RLS Policy Mapping — Candidate Interview Details

## Ownership & Access Control
- Queries enforce `candidate_id = auth.uid()` via relational filter `applications.candidate_id = auth.uid()`.
- Accessing unowned interview records or unauthenticated sessions returns safe generic *"Interview not available"* state without disclosing existence.
- Level 3 server-verified meeting access checks identity, interview status, confirmation state, and server time window.
- Internal reviewer notes, recruiter scores, interviewer contact details, and raw meeting URL host tokens are excluded at the network layer.
