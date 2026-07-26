# 14 — Controlled Candidate Mutation Security Matrix

| Mutation Action | Ownership Verification | Current State Check | Concurrency Token | Idempotency | Live Verification Status |
|---|---:|---:|---:|---:|---:|
| Update Profile | `auth.uid() = profiles.id` | Active Session | Optimistic Version | Yes | Mocked |
| Document Upload | `candidates.user_id = auth.uid()` | Document Vault Active | MIME & Size Check | Yes | Mocked |
| Withdraw Application | `candidates.user_id = auth.uid()` | Application Active | Optimistic Token | Yes | Mocked |
| Confirm Interview | `candidates.user_id = auth.uid()` | Interview Scheduled | Version Lock | Yes | Mocked |
| Request Reschedule | `candidates.user_id = auth.uid()` | Reschedule Window Open | Version Lock | Yes | Mocked |
| Accept Conditional Offer | `candidates.user_id = auth.uid()` | Offer Issued / Pending | State Token & Declarations | Yes | Mocked |
| Decline Conditional Offer | `candidates.user_id = auth.uid()` | Offer Issued / Pending | State Token & Reason | Yes | Mocked |
| Support Ticket Create | `candidates.user_id = auth.uid()` | Active Account | Rate Guard | Yes | Mocked |
| Preference Update | `candidates.user_id = auth.uid()` | Valid Policy Rules | Optimistic Version | Yes | Mocked |
