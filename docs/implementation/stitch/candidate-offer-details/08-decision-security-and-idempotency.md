# Decision Security & Idempotency Safeguards — Phase A9

## Concurrency Protection
- Submits `expectedUpdatedAt` / version token with decision payload.
- Returns `conflict: true` if offer updated_at changed since page load.

## Idempotency & Immutable Audit Trail
- Submits client idempotency key.
- Creates immutable audit record in `status_history`.
- Requires 3 explicit legal declaration checkboxes and typed signature (`"I ACCEPT"` / Candidate name).
