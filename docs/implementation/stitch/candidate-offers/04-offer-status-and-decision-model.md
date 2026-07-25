# Offer Status & Decision Model — Phase A8

## Lifecycle Status vs Candidate Decision Separation

| Offer Status | Candidate Decision | Display Category | UI Action |
|---|---|---|---|
| `sent_to_candidate` / `issued` | `pending` | Active | Available for Review |
| `awaiting_candidate_decision` | `pending` | Action Required | Action Required |
| `accepted` | `accepted` | Accepted | Accepted |
| `declined` | `declined` | Historical | Declined |
| `expired` | `expired` | Historical | Expired |
| `withdrawn` | `revoked` | Historical | Withdrawn |
| `superseded` | `viewed` / `pending` | Historical | Superseded |
