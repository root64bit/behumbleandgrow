# Offer Status & Decision Model — Phase A9

## Status Model Matrix

| Offer Lifecycle Status | Candidate Decision State | Display Category | Actionable Status |
|---|---|---|---|
| `sent_to_candidate` / `issued` | `pending` | Available for Review | Actionable |
| `awaiting_candidate_decision` | `pending` | Action Required | Actionable |
| `accepted` | `accepted` | Accepted | Decided |
| `declined` | `declined` | Declined | Decided |
| `expired` | `expired` | Expired | Terminal (Expired) |
| `withdrawn` | `revoked` | Withdrawn | Terminal (Withdrawn) |
| `superseded` | `viewed` / `pending` | Superseded | Non-actionable |
