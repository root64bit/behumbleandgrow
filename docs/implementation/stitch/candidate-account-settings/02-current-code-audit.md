# 02 — Current Code Audit: Candidate Account Settings & Preferences

## 1. Pre-Phase Codebase State
Prior to Phase A13, `src/pages/candidate/CandidateSettingsPage.tsx` contained a basic placeholder page with password update form controls and two mock toggles (WhatsApp & Email alerts).

## 2. Identified Gaps & Technical Remediation
1. **Schema & Database Persistence**:
   - No database table existed for storing Candidate language, time zone, quiet hours, or notification category delivery preferences.
   - Remediation: Created migration `20260726000003_candidate_account_settings.sql` defining `candidate_preferences` and `candidate_notification_preferences`.
2. **Security & Ownership Scoping**:
   - Public service methods must not accept client-provided candidate IDs.
   - Remediation: All mutations resolve ownership via `auth.uid() -> candidates.id` inside hardened `SECURITY DEFINER` RPCs.
3. **Mandatory Policy Controls**:
   - Candidates must not be permitted to turn off mandatory account security, system legal, or active recruitment process notifications.
   - Remediation: Created `src/lib/candidate/notificationPreferencePolicy.ts` locking mandatory in-app & email delivery.
