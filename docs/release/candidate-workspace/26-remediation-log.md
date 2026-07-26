# 26 — Remediation Log

- **Remediation 1 (Commit `daeab6e`)**: Fixed PostgREST `.maybeSingle()` mock route headers in `tests/candidate-account-settings.e2e.ts`.
- **Remediation 2 (Commit `39d6c8f`)**: Removed HTML `minLength={8}` attribute in `CandidatePasswordChangeDialog.tsx` to enable custom React `onSubmit` validation error rendering; added `data-testid="quiet-hours-toggle-label"` in `CandidateQuietHoursSettings.tsx`.
- **Remediation 3 (Commit `7620c32`)**: Aligned `AuthContext` user roles and PostgREST endpoint mock routes with proven candidate support pattern.
- **Remediation 4 (Current Commit)**: Created cross-module integration test suite `tests/candidate-workspace-integration.e2e.ts` covering Journeys 1-9 across Chromium, Firefox, and WebKit.
