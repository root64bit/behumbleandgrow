# 05. Row-Level Security (RLS) Isolation Test Evidence

## Vitest Isolation Suite (`src/test/isolation.test.ts`)
- Candidate A vs Candidate B Isolation: **PASS** (Candidate A cannot read or mutate Candidate B data).
- Internal Reviewer Notes Isolation: **PASS** (Internal notes excluded from candidate queries).
- Document Review Status Mutation: **PASS** (Candidates blocked from changing verification status).
- Partner Tenant Isolation: **PASS** (Partner A cannot query Partner B lead pools).
- Employer Tenant Isolation: **PASS** (Employer A cannot access Employer B rosters).
- Suspended & Anonymous Denial: **PASS** (Mutation attempts rejected).
- **Pass Rate**: 8 / 8 tests passed.
