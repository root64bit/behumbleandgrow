# 15 — Time, Date & Time-Zone Handling Audit

- **Database Standard**: All database timestamps are stored in UTC as ISO 8601 absolute instants (`TIMESTAMPTZ`).
- **Candidate Display Time Zone**: Resolved from candidate preference (`time_zone` column in `candidate_preferences`, e.g. `Asia/Dubai`, `Africa/Maputo`, `Africa/Johannesburg`).
- **UAE Standard Time**: UAE recruitment schedules and offer deadlines enforce `Asia/Dubai` time zone display.
- **Server Authority**: Expiry logic, access window evaluation (Level 3 meeting access), and offer deadlines rely on server time, not local browser device time.
