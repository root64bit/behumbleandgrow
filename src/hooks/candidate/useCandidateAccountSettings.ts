import { useState, useEffect, useCallback } from 'react';
import {
  CandidateAccountSettingsService,
  CandidateAccountSettingsData,
  CandidateNotificationCategoryPreference,
} from '../../services/candidate-account-settings.service';
import { SupportedLanguageCode } from '../../lib/candidate/languagePreference';
import { CandidateNotificationCategory } from '../../lib/candidate/notificationCategory';

export type AccountSettingsStatus = 'loading' | 'success' | 'conflict' | 'error';
export type MutationStatus = 'idle' | 'saving' | 'saved' | 'conflict' | 'error';

export function useCandidateAccountSettings() {
  const [data, setData] = useState<CandidateAccountSettingsData | null>(null);
  const [status, setStatus] = useState<AccountSettingsStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Draft form state for general preferences
  const [draftLang, setDraftLang] = useState<SupportedLanguageCode>('en');
  const [draftTimeZone, setDraftTimeZone] = useState<string>('Asia/Dubai');
  const [draftQuietHours, setDraftQuietHours] = useState<boolean>(false);
  const [draftQuietStart, setDraftQuietStart] = useState<string>('22:00');
  const [draftQuietEnd, setDraftQuietEnd] = useState<string>('07:00');
  const [draftMarketingConsent, setDraftMarketingConsent] = useState<boolean>(false);

  // Draft notification preferences map (category -> preference)
  const [draftNotifPrefs, setDraftNotifPrefs] = useState<Record<string, { push: boolean; email: boolean }>>({});

  const [mutationStatus, setMutationStatus] = useState<MutationStatus>('idle');
  const [mutationMessage, setMutationMessage] = useState<string>('');

  const loadSettings = useCallback(async () => {
    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await CandidateAccountSettingsService.loadMyAccountSettings();
      if (!res) {
        setStatus('error');
        setErrorMessage('Unable to load candidate account settings.');
        return;
      }
      setData(res);
      setDraftLang(res.preferences.languageCode);
      setDraftTimeZone(res.preferences.timeZone);
      setDraftQuietHours(res.preferences.quietHoursEnabled);
      setDraftQuietStart(res.preferences.quietHoursStart.slice(0, 5));
      setDraftQuietEnd(res.preferences.quietHoursEnd.slice(0, 5));
      setDraftMarketingConsent(res.preferences.marketingConsentGranted);

      const notifMap: Record<string, { push: boolean; email: boolean }> = {};
      res.notificationPreferences.forEach((np) => {
        notifMap[np.category] = { push: np.pushEnabled, email: np.emailEnabled };
      });
      setDraftNotifPrefs(notifMap);

      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Error loading account settings.');
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const hasUnsavedChanges = Boolean(
    data &&
      (draftLang !== data.preferences.languageCode ||
        draftTimeZone !== data.preferences.timeZone ||
        draftQuietHours !== data.preferences.quietHoursEnabled ||
        draftQuietStart !== data.preferences.quietHoursStart.slice(0, 5) ||
        draftQuietEnd !== data.preferences.quietHoursEnd.slice(0, 5) ||
        draftMarketingConsent !== data.preferences.marketingConsentGranted ||
        data.notificationPreferences.some(
          (np) =>
            draftNotifPrefs[np.category]?.push !== np.pushEnabled ||
            draftNotifPrefs[np.category]?.email !== np.emailEnabled
        ))
  );

  const saveGeneralPreferences = async () => {
    if (!data) return;
    setMutationStatus('saving');
    setMutationMessage('');

    try {
      // 1. Update General Preferences
      const updatedPrefs = await CandidateAccountSettingsService.updateMyAccountPreferences({
        languageCode: draftLang,
        timeZone: draftTimeZone,
        quietHoursEnabled: draftQuietHours,
        quietHoursStart: `${draftQuietStart}:00`,
        quietHoursEnd: `${draftQuietEnd}:00`,
        marketingConsentGranted: draftMarketingConsent,
        expectedVersion: data.preferences.version,
      });

      // 2. Update changed notification category preferences
      const updatedNotifList: CandidateNotificationCategoryPreference[] = [];
      for (const np of data.notificationPreferences) {
        const draft = draftNotifPrefs[np.category];
        if (draft && (draft.push !== np.pushEnabled || draft.email !== np.emailEnabled)) {
          const updatedNP = await CandidateAccountSettingsService.updateMyCandidateNotificationPreference(
            np.category,
            draft.push,
            draft.email,
            np.version
          );
          updatedNotifList.push(updatedNP);
        } else {
          updatedNotifList.push(np);
        }
      }

      setData({
        ...data,
        preferences: updatedPrefs,
        notificationPreferences: updatedNotifList,
      });

      setMutationStatus('saved');
      setMutationMessage('Your account preferences have been saved successfully.');
    } catch (err: any) {
      if (err.message?.includes('Conflict')) {
        setMutationStatus('conflict');
        setMutationMessage('Your settings changed in another session. Please reload.');
      } else {
        setMutationStatus('error');
        setMutationMessage(err.message || 'Failed to save account settings.');
      }
    }
  };

  const toggleCategoryChannel = (category: CandidateNotificationCategory, channel: 'push' | 'email', enabled: boolean) => {
    setDraftNotifPrefs((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [channel]: enabled,
      },
    }));
  };

  const resetDrafts = () => {
    if (!data) return;
    setDraftLang(data.preferences.languageCode);
    setDraftTimeZone(data.preferences.timeZone);
    setDraftQuietHours(data.preferences.quietHoursEnabled);
    setDraftQuietStart(data.preferences.quietHoursStart.slice(0, 5));
    setDraftQuietEnd(data.preferences.quietHoursEnd.slice(0, 5));
    setDraftMarketingConsent(data.preferences.marketingConsentGranted);

    const notifMap: Record<string, { push: boolean; email: boolean }> = {};
    data.notificationPreferences.forEach((np) => {
      notifMap[np.category] = { push: np.pushEnabled, email: np.emailEnabled };
    });
    setDraftNotifPrefs(notifMap);
    setMutationStatus('idle');
    setMutationMessage('');
  };

  return {
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
    refetch: loadSettings,
  };
}
