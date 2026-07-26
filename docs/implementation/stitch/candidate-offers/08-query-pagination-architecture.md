# Query & Pagination Architecture — Phase A8

## Relational Query Structure
- Queries `offers` with inner join to `applications` scoped by `applications.candidate_id = auth.uid()`.
- Projects explicit safe fields only (`id`, `salary`, `currency`, `status`, `valid_until`, `created_at`).
- Excludes internal negotiation notes and partner commissions.
