# Time-Zone Handling & Access Window Architecture

## Time-Zone Conversion
- Absolute UTC timestamps stored in PostgreSQL database.
- Dual Time Display:
  - **Candidate Local Time**: Derived from profile IANA time zone (e.g. `Africa/Maputo`, `Africa/Nairobi`, `Africa/Johannesburg`, `Asia/Kolkata`) or browser fallback labeled *"Displayed using your device time zone"*.
  - **UAE Time**: Labeled explicitly as `"UAE time — Asia/Dubai"`.

## Meeting Access Window Rules
- Pre-interview window: opens 15 minutes before scheduled start time.
- Post-interview grace period: closes 30 minutes after scheduled end time.
- `CandidateInterviewJoinState.tsx` renders Join button states (`Available Soon`, `Join Video Room`, `Confirmation Required`, `Interview Access Closed`).
