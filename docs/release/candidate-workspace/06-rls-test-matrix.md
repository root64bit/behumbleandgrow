# 06 — PostgreSQL Row Level Security (RLS) Test Matrix

| Resource / Action | Mocked Frontend Test | SQL Policy Review | Local Supabase DB | Hosted Staging DB | Final Matrix Result |
|---|---:|---:|---:|---:|---|
| Candidate Profile Read (`auth.uid() = profiles.id`) | PASS | PASS | NOT RUN | NOT RUN | PASS (Frontend) / REQUIRES LIVE PROOF |
| Candidate Documents Read (`candidate_id = own`) | PASS | PASS | NOT RUN | NOT RUN | PASS (Frontend) / REQUIRES LIVE PROOF |
| Applications Read (`candidate_id = own`) | PASS | PASS | NOT RUN | NOT RUN | PASS (Frontend) / REQUIRES LIVE PROOF |
| Interviews Read (`application_id -> own`) | PASS | PASS | NOT RUN | NOT RUN | PASS (Frontend) / REQUIRES LIVE PROOF |
| Conditional Offers Read (`application_id -> own`) | PASS | PASS | NOT RUN | NOT RUN | PASS (Frontend) / REQUIRES LIVE PROOF |
| Candidate Placement Read (`candidate_id = own`) | PASS | PASS | NOT RUN | NOT RUN | PASS (Frontend) / REQUIRES LIVE PROOF |
| Notifications Read (`candidate_id = own`) | PASS | PASS | NOT RUN | NOT RUN | PASS (Frontend) / REQUIRES LIVE PROOF |
| Support Tickets Read (`candidate_id = own`) | PASS | PASS | NOT RUN | NOT RUN | PASS (Frontend) / REQUIRES LIVE PROOF |
| Preferences Read (`candidate_id = own`) | PASS | PASS | NOT RUN | NOT RUN | PASS (Frontend) / REQUIRES LIVE PROOF |
| Unowned Candidate B Resource Denial | PASS | PASS | NOT RUN | NOT RUN | PASS (Frontend) / REQUIRES LIVE PROOF |
| Direct Table INSERT/UPDATE (authenticated role) | Denied (Client) | Denied (Revoked) | NOT RUN | NOT RUN | PASS (Frontend) / REQUIRES LIVE PROOF |
| Anonymous User Resource Denial | PASS | PASS | NOT RUN | NOT RUN | PASS (Frontend) / REQUIRES LIVE PROOF |

*Audit Clarification*: Frontend E2E test suites mock network responses using Playwright `page.route()`. SQL Row Level Security policies, table grants, and SECURITY DEFINER execution restrictions are defined in `supabase/migrations/` and require live Supabase deployment testing before public production launch.
