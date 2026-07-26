# Security & RLS Policy Analysis — Candidate Placement

## PostgreSQL Row Level Security
- Migration `20260725000001_candidate_placement.sql` enables RLS on `placements`, `placement_milestones`, `placement_candidate_actions`, and `placement_acknowledgements`.
- `placements` policy restricts `SELECT` strictly to `candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid())`.
- Candidate insertion is restricted to `placement_acknowledgements`. Candidates CANNOT update official milestone statuses, work permit statuses, or visa approvals.

## Mandatory Limitations Disclaimer
- Mocked service tests prove frontend behavior under controlled service conditions. Verification of deployed PostgreSQL RLS, live Supabase RPC endpoints, and live signing bucket access requires live database deployment.
