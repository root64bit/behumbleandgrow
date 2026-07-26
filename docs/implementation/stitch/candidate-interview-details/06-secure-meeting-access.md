# Secure Meeting Access Architecture (Level 3 Enforced)

## Security Enforcement Level: Level 3
- **Initial Query Protection**: Initial detail query excludes raw `meeting_url` (`meetingLinkAvailable` boolean projected only).
- **Server Verification Flow**:
  1. Candidate clicks *Join Video Interview Room*.
  2. Frontend invokes `requestMySecureMeetingAccess(userId, interviewId)`.
  3. Server verifies session identity, candidate ownership (`candidate_id = auth.uid()`), interview status, candidate confirmation (`status === 'confirmed'`), and server time access window.
  4. Upon verification, returns short-lived redirect URL.
- **Storage Protection**: Meeting URLs are NEVER saved in `localStorage`, `sessionStorage`, analytics, or URL parameters.
