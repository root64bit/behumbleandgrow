# Dual Time-Zone & Access Window Architecture

## Time-Zone Format & Labeling
- Timestamps stored as absolute UTC ISO strings.
- **Candidate Local Time**: Derived from candidate IANA profile time zone (e.g. `Africa/Maputo`, `Africa/Nairobi`, `Asia/Kolkata`) or device fallback labeled *"Displayed using your device time zone"*.
- **UAE Time**: Labeled explicitly as `"UAE time — Asia/Dubai"` (GST UTC+4).

## Meeting Access Window Calculator
- Pre-interview window: opens 15 minutes before scheduled start time.
- Post-interview grace period: closes 30 minutes after scheduled end time.
- Checked using server time on `requestMySecureMeetingAccess`.
