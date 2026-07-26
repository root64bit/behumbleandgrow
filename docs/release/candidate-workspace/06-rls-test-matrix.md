# 06 — PostgreSQL Row Level Security (RLS) Test Matrix

| Resource / Action | Candidate A (Owner) | Candidate B (Unowned) | Wrong Role (Employer/Recruiter) | Anonymous | Verification Mode | Result |
|---|---:|---:|---:|---:|---|---|
| Read Profile | Allowed | Denied | Denied | Denied | Mocked & SQL Schema | PASS |
| Read Applications | Allowed | Denied | Role Scoped | Denied | Mocked & SQL Schema | PASS |
| Read Interviews | Allowed | Denied | Role Scoped | Denied | Mocked & SQL Schema | PASS |
| Read Offers | Allowed | Denied | Role Scoped | Denied | Mocked & SQL Schema | PASS |
| Read Placement | Allowed | Denied | Role Scoped | Denied | Mocked & SQL Schema | PASS |
| Read Notifications | Allowed | Denied | Denied | Denied | Mocked & SQL Schema | PASS |
| Read Support Tickets | Allowed | Denied | Denied | Denied | Mocked & SQL Schema | PASS |
| Direct Table INSERT/UPDATE | Denied (Revoked) | Denied | Denied | Denied | SQL Grants | PASS |
| RPC Mutations | Allowed (Owned) | Denied | Denied | Denied | RPC Guard | PASS |

*Verification Disclaimer*: Frontend tests use mocked Supabase responses. Database RLS rules, foreign keys, and SQL policies are defined in `supabase/migrations/` and require live Supabase deployment for production execution proof.
