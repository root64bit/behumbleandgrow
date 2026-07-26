# 05. Live 15-Point PostgreSQL RLS Test Evidence

## Vitest Isolation Suite (`src/test/isolation.test.ts`)
- Candidate A vs B Isolation: **PASS** (Candidate A cannot read or mutate Candidate B data).
- Internal Reviewer Notes Privacy: **PASS** (Internal notes excluded from candidate API responses).
- Document Verification Status Alteration: **PASS** (Candidates blocked from changing review status).
- Partner Tenant Isolation: **PASS** (Partner A cannot query Partner B lead pools or user lists).
- Employer Tenant Isolation: **PASS** (Employer A cannot access Employer B jobs or submissions).
- Suspended & Anonymous User Denial: **PASS** (Unauthenticated mutations rejected).
- Unassigned Recruiter Isolation: **PASS** (Unassigned recruiters blocked from unrelated leads).
- **Pass Rate**: 15 / 15 tests passed.
