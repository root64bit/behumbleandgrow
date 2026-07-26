# Canonical Interview Status Model

## Canonical Lifecycle & Confirmation Statuses

| Canonical Status | Badge Label | UI Category | Candidate Actions |
|---|---|---|---|
| `awaiting_candidate_confirmation` | Action Required: Confirm Attendance | `action_required` | Confirm Attendance, Request Reschedule |
| `awaiting_employer_confirmation` | Awaiting Employer Confirmation | `upcoming` | Request Reschedule |
| `confirmed` | Confirmed | `upcoming` | Request Reschedule, Join Room (in access window) |
| `reschedule_requested` | Reschedule Requested | `rescheduled` | View Details |
| `rescheduled` | Rescheduled | `rescheduled` | Confirm Attendance, Request Reschedule |
| `completed` | Completed | `completed` | View Details |
| `cancelled` | Cancelled | `cancelled` | View Details |
| `expired` | Expired | `completed` | View Details |
| `unknown` | Status Being Updated | `other` | View Details |

## Principles
- Status model decouples candidate attendance confirmation from backend schedule modifications.
- Confirmation updates `status = 'confirmed'` and inserts an audit trail event.
- Reschedule submission updates `status = 'reschedule_requested'` and pending request log without mutating `scheduled_at` directly.
