# 13 — Files Changed: Candidate Account Settings & Preferences

## Summary of Changes

### Database Migrations
- `supabase/migrations/20260726000003_candidate_account_settings.sql`

### Helper Libraries & Policy
- `src/lib/candidate/languagePreference.ts`
- `src/lib/candidate/timeZonePreference.ts`
- `src/lib/candidate/notificationPreferencePolicy.ts`

### Service & Hook Architecture
- `src/services/candidate-account-settings.service.ts`
- `src/hooks/candidate/useCandidateAccountSettings.ts`

### Modular UI Components
- `src/components/candidate/account-settings/CandidateAccountHeader.tsx`
- `src/components/candidate/account-settings/CandidateAccountIdentityCard.tsx`
- `src/components/candidate/account-settings/CandidateLanguagePreference.tsx`
- `src/components/candidate/account-settings/CandidateTimeZonePreference.tsx`
- `src/components/candidate/account-settings/CandidateQuietHoursSettings.tsx`
- `src/components/candidate/account-settings/CandidateMarketingConsent.tsx`
- `src/components/candidate/account-settings/CandidateNotificationPreferences.tsx`
- `src/components/candidate/account-settings/CandidatePasswordChangeDialog.tsx`
- `src/components/candidate/account-settings/CandidateSettingsSaveBar.tsx`
- `src/components/candidate/account-settings/CandidateSettingsSkeleton.tsx`
- `src/components/candidate/account-settings/CandidateSettingsConflictState.tsx`
- `src/components/candidate/account-settings/CandidateSettingsErrorState.tsx`

### Page Integration
- `src/pages/candidate/CandidateSettingsPage.tsx`

### Automated Test Suites
- `src/test/languagePreference.test.ts`
- `src/test/timeZonePreference.test.ts`
- `src/test/notificationPreferencePolicy.test.ts`
- `src/test/candidateAccountSettings.test.ts`
- `tests/candidate-account-settings.e2e.ts`

### Implementation Documentation
- `docs/implementation/stitch/candidate-account-settings/*`
