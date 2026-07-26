import React, { useState } from 'react';
import { useCandidateAccountSettings } from '../../hooks/candidate/useCandidateAccountSettings';
import { CandidateAccountHeader } from '../../components/candidate/account-settings/CandidateAccountHeader';
import { CandidateAccountIdentityCard } from '../../components/candidate/account-settings/CandidateAccountIdentityCard';
import { CandidateLanguagePreference } from '../../components/candidate/account-settings/CandidateLanguagePreference';
import { CandidateTimeZonePreference } from '../../components/candidate/account-settings/CandidateTimeZonePreference';
import { CandidateQuietHoursSettings } from '../../components/candidate/account-settings/CandidateQuietHoursSettings';
import { CandidateMarketingConsent } from '../../components/candidate/account-settings/CandidateMarketingConsent';
import { CandidateNotificationPreferences } from '../../components/candidate/account-settings/CandidateNotificationPreferences';
import { CandidatePasswordChangeDialog } from '../../components/candidate/account-settings/CandidatePasswordChangeDialog';
import { CandidateSettingsSaveBar } from '../../components/candidate/account-settings/CandidateSettingsSaveBar';
import { CandidateSettingsSkeleton } from '../../components/candidate/account-settings/CandidateSettingsSkeleton';
import { CandidateSettingsConflictState } from '../../components/candidate/account-settings/CandidateSettingsConflictState';
import { CandidateSettingsErrorState } from '../../components/candidate/account-settings/CandidateSettingsErrorState';

export default function CandidateSettingsPage() {
  const {
    data,
    status,
    errorMessage,
    draftLang,
    setDraftLang,
    draftTimeZone,
    setDraftTimeZone,
    draftQuietHours,
    setDraftQuietHours,
    draftQuietStart,
    setDraftQuietStart,
    draftQuietEnd,
    setDraftQuietEnd,
    draftMarketingConsent,
    setDraftMarketingConsent,
    draftNotifPrefs,
    toggleCategoryChannel,
    hasUnsavedChanges,
    mutationStatus,
    mutationMessage,
    saveGeneralPreferences,
    resetDrafts,
    refetch,
  } = useCandidateAccountSettings();

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  if (status === 'loading') {
    return <CandidateSettingsSkeleton />;
  }

  if (status === 'error' || !data) {
    return <CandidateSettingsErrorState message={errorMessage} onRetry={refetch} />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-left pb-24">
      <CandidateAccountHeader referenceId={data.identity.candidateReference} />

      {mutationStatus === 'conflict' && <CandidateSettingsConflictState onReload={refetch} />}

      <CandidateAccountIdentityCard
        identity={data.identity}
        onOpenPasswordModal={() => setIsPasswordModalOpen(true)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CandidateLanguagePreference value={draftLang} onChange={setDraftLang} />
        <CandidateTimeZonePreference value={draftTimeZone} onChange={setDraftTimeZone} />
      </div>

      <CandidateQuietHoursSettings
        enabled={draftQuietHours}
        onToggleEnabled={setDraftQuietHours}
        startTime={draftQuietStart}
        onStartTimeChange={setDraftQuietStart}
        endTime={draftQuietEnd}
        onEndTimeChange={setDraftQuietEnd}
      />

      <CandidateMarketingConsent granted={draftMarketingConsent} onToggle={setDraftMarketingConsent} />

      <CandidateNotificationPreferences
        preferences={data.notificationPreferences}
        draftNotifPrefs={draftNotifPrefs}
        onToggleChannel={toggleCategoryChannel}
      />

      <CandidateSettingsSaveBar
        hasUnsavedChanges={hasUnsavedChanges}
        mutationStatus={mutationStatus}
        mutationMessage={mutationMessage}
        onSave={saveGeneralPreferences}
        onReset={resetDrafts}
      />

      <CandidatePasswordChangeDialog
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
}
