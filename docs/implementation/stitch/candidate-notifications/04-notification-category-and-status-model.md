# 04 — Notification Category & Status Model

## Notification Categories
1. `application`: Applications update
2. `document`: Document Vault update
3. `interview`: Interview scheduling update
4. `offer`: Conditional Offer update
5. `placement`: Placement & Relocation update
6. `profile`: Candidate Profile update
7. `support`: Helpdesk / Officer message update
8. `account`: Security & Account update
9. `system`: System maintenance update
- Unknown category fallback: `"General update"`.

## Lifecycle Status Model
- `unread`: `read_at IS NULL`
- `read`: `read_at IS NOT NULL`
- `archived`: `archived_at IS NOT NULL`
- `expired`: `expires_at < NOW()`
- `retracted`: `is_retracted = true`
- `action_required`: `is_action_required = true AND read_at IS NULL`
