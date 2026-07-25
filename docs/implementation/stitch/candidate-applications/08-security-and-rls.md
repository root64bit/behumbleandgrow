# Security & RLS Policy Mapping

## RLS Enforcement
- Candidate applications are protected by `applications_policy` (`candidate_id = auth.uid()`).
- Unauthenticated queries or candidate impersonation via client parameters are rejected by Supabase RLS policies.
- Internal reviewer notes, recruiter scores, and employer private feedback are excluded from API queries.
