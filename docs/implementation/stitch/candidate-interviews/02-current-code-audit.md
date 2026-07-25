# Current Code Audit — Candidate Interviews List

## File Inspection Results
- **Page Component**: `src/pages/candidate/CandidateInterviewsPage.tsx` (Legacy mock implementation using `CandidateService.getInterviews()` and hardcoded `meet.google.com` link)
- **Router Configuration**: Registered as child route `{ path: 'interviews', element: <Lazy component={CandidateInterviewsPage} /> }` in `src/routes/index.tsx`.
- **Layout Integration**: Mounts inside `CandidateLayout` router outlet.

## Implementation Gaps & Security Upgrades
1. **Mock Data Removal**: Replace legacy static methods in `CandidateService` with `candidate-interviews.service.ts` connecting to Supabase database.
2. **Meeting Link Security**: Raw meeting URLs must NOT be returned in list queries. Replace direct external links with boolean `meetingLinkAvailable` and server-checked access window gates.
3. **Canonical Status Model**: Implement `interviewStatus.ts` for unified lifecycle and confirmation statuses (`awaiting_candidate_confirmation`, `confirmed`, `reschedule_requested`, `completed`, `cancelled`).
4. **Time-Zone Handling**: Implement `interviewTime.ts` converting UTC timestamps into both candidate local IANA time zone and UAE `Asia/Dubai` time zone.
5. **Employer Disclosure Security**: Reuses `resolveCandidateEmployerDisplay(application)` to mask employer identity prior to disclosure authorization.
