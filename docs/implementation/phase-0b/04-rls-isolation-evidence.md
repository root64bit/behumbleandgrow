# 04. RLS & Multi-Tenant Security Isolation Evidence

## Vitest Integration Test Results (`src/test/rls.test.ts`)
- Candidate A cannot read/update Candidate B profiles or documents.
- Candidate role cannot approve documents or update review status.
- Candidate role cannot access internal reviewer notes.
- Partner A cannot query Partner B lead pools.
- Employer A cannot query Employer B candidate rosters.
- Anonymous/suspended users cannot execute authenticated mutations.
- **Pass Rate**: 6 / 6 tests passed.
