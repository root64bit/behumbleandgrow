# Interview Detail Status Model — Phase A7

## Status Display & Action Mappings

| Interview Lifecycle Status | Candidate Attendance Status | Meeting Access State | UI Actions |
|---|---|---|---|
| `awaiting_candidate_confirmation` | Action Required | Not Active (Requires Confirmation) | Confirm Attendance, Request Reschedule |
| `confirmed` | Confirmed | Level 3 Server-Verified Window | Join Video Room (in window), Request Reschedule |
| `reschedule_requested` | Pending Reschedule | Locked | View Status |
| `rescheduled` | Rescheduled | Available upon Confirmation | Confirm Attendance, Request Reschedule |
| `completed` | Completed | Closed | View Preparation History |
| `cancelled` | Cancelled | Closed | Contact Support |
