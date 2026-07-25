# Employer Disclosure & Meeting Security

## Employer Disclosure Security
- Reuses `resolveCandidateEmployerDisplay(application)`: checks trusted database state (`employer_disclosure_status`, `employer_disclosed_at`).
- Pre-disclosure: Displays `"Approved UAE Employer"`.
- Post-disclosure: Displays authorized company trading name.

## Meeting Link Security
- Raw meeting URLs (`meeting_url`) are excluded from bulk list queries.
- Query projects boolean `meetingLinkAvailable: true`.
- Meeting links are NEVER saved in `localStorage`, session logs, or URL parameters.
