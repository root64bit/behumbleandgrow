# Security & RLS Policy Mapping

## Ownership Resolution
- `interviews.application_id` -> `applications.candidate_id` = `auth.uid()`.
- Accessing unowned interview records or unauthenticated sessions returns zero rows or safe empty state.
- Candidate A cannot view or confirm Candidate B interviews.
- Internal reviewer notes and private feedback are excluded at the network layer.
