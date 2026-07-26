# Security & RLS Policy Mapping

## RLS & Ownership Verification
- Application access requires `applications.candidate_id = auth.uid()`.
- Accessing unowned or invalid application IDs returns a safe 404 Not Found response (`CandidateApplicationDetailsNotFound.tsx`).
- Internal reviewer notes, recruiter scores, and employer private feedback are excluded at the network query layer.
