import { supabase } from '../lib/supabase/client';
import { SupportedLanguageCode } from '../lib/candidate/languagePreference';
import { CandidateNotificationCategory } from '../lib/candidate/notificationCategory';

export interface CandidateAccountIdentitySummary {
  userId: string;
  candidateId: string;
  fullName: string;
  email: string;
  isEmailVerified: boolean;
  candidateReference: string;
  countryCode: string;
}

export interface CandidateGeneralPreferences {
  id: string;
  candidateId: string;
  languageCode: SupportedLanguageCode;
  timeZone: string;
  dateLocale: string;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  marketingConsentGranted: boolean;
  marketingConsentUpdatedAt?: string | null;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CandidateNotificationCategoryPreference {
  id: string;
  candidateId: string;
  category: CandidateNotificationCategory;
  inAppEnabled: boolean;
  pushEnabled: boolean;
  emailEnabled: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CandidateAccountSettingsData {
  identity: CandidateAccountIdentitySummary;
  preferences: CandidateGeneralPreferences;
  notificationPreferences: CandidateNotificationCategoryPreference[];
}

export interface UpdatePreferencesPayload {
  languageCode: SupportedLanguageCode;
  timeZone: string;
  quietHoursEnabled: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  marketingConsentGranted: boolean;
  expectedVersion?: number;
}

export class CandidateAccountSettingsService {
  /**
   * Load authenticated Candidate account identity summary and preference records
   */
  public static async loadMyAccountSettings(): Promise<CandidateAccountSettingsData | null> {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) return null;

    const userId = authData.user.id;

    // Fetch Candidate Profile & Candidate ID
    const [profileRes, candidateRes] = await Promise.all([
      supabase.from('profiles').select('id, full_name, email, country_code').eq('id', userId).maybeSingle(),
      supabase.from('candidates').select('id').eq('user_id', userId).maybeSingle(),
    ]);

    if (!profileRes.data || !candidateRes.data) return null;

    // Execute RPC load_my_candidate_account_settings
    const { data: settingsData, error: rpcError } = await supabase.rpc('load_my_candidate_account_settings');

    if (rpcError || !settingsData) {
      throw new Error(rpcError?.message || 'Failed to load candidate settings.');
    }

    const p = settingsData.preferences || {};
    const npList = settingsData.notificationPreferences || [];

    const identity: CandidateAccountIdentitySummary = {
      userId,
      candidateId: candidateRes.data.id,
      fullName: profileRes.data.full_name || 'Candidate',
      email: profileRes.data.email || authData.user.email || '',
      isEmailVerified: Boolean(authData.user.email_confirmed_at),
      candidateReference: `BHG-CAND-${candidateRes.data.id.slice(0, 6).toUpperCase()}`,
      countryCode: profileRes.data.country_code || 'AE',
    };

    const preferences: CandidateGeneralPreferences = {
      id: p.id || '',
      candidateId: candidateRes.data.id,
      languageCode: (p.language_code as SupportedLanguageCode) || 'en',
      timeZone: p.time_zone || 'Asia/Dubai',
      dateLocale: p.date_locale || 'en-AE',
      quietHoursEnabled: Boolean(p.quiet_hours_enabled),
      quietHoursStart: p.quiet_hours_start || '22:00:00',
      quietHoursEnd: p.quiet_hours_end || '07:00:00',
      marketingConsentGranted: Boolean(p.marketing_consent_granted),
      marketingConsentUpdatedAt: p.marketing_consent_updated_at,
      version: Number(p.version || 1),
      createdAt: p.created_at || new Date().toISOString(),
      updatedAt: p.updated_at || new Date().toISOString(),
    };

    const notificationPreferences: CandidateNotificationCategoryPreference[] = npList.map((row: any) => ({
      id: row.id,
      candidateId: row.candidate_id,
      category: row.category as CandidateNotificationCategory,
      inAppEnabled: true,
      pushEnabled: Boolean(row.push_enabled),
      emailEnabled: Boolean(row.email_enabled),
      version: Number(row.version || 1),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    return { identity, preferences, notificationPreferences };
  }

  /**
   * Update general preferences via RPC
   */
  public static async updateMyAccountPreferences(
    payload: UpdatePreferencesPayload
  ): Promise<CandidateGeneralPreferences> {
    const { data, error } = await supabase.rpc('update_my_candidate_preferences', {
      p_language_code: payload.languageCode,
      p_time_zone: payload.timeZone,
      p_quiet_hours_enabled: payload.quietHoursEnabled,
      p_quiet_hours_start: payload.quietHoursStart || '22:00:00',
      p_quiet_hours_end: payload.quietHoursEnd || '07:00:00',
      p_marketing_consent_granted: payload.marketingConsentGranted,
      p_expected_version: payload.expectedVersion || null,
    });

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update preferences.');
    }

    return {
      id: data.id,
      candidateId: data.candidate_id,
      languageCode: data.language_code as SupportedLanguageCode,
      timeZone: data.time_zone,
      dateLocale: data.date_locale || 'en-AE',
      quietHoursEnabled: Boolean(data.quiet_hours_enabled),
      quietHoursStart: data.quiet_hours_start || '22:00:00',
      quietHoursEnd: data.quiet_hours_end || '07:00:00',
      marketingConsentGranted: Boolean(data.marketing_consent_granted),
      marketingConsentUpdatedAt: data.marketing_consent_updated_at,
      version: Number(data.version || 1),
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  /**
   * Update notification channel preference for a category via RPC
   */
  public static async updateMyCandidateNotificationPreference(
    category: CandidateNotificationCategory,
    pushEnabled: boolean,
    emailEnabled: boolean,
    expectedVersion?: number
  ): Promise<CandidateNotificationCategoryPreference> {
    const { data, error } = await supabase.rpc('update_my_candidate_notification_preference', {
      p_category: category,
      p_push_enabled: pushEnabled,
      p_email_enabled: emailEnabled,
      p_expected_version: expectedVersion || null,
    });

    if (error || !data) {
      throw new Error(error?.message || `Failed to update notification preference for ${category}.`);
    }

    return {
      id: data.id,
      candidateId: data.candidate_id,
      category: data.category as CandidateNotificationCategory,
      inAppEnabled: true,
      pushEnabled: Boolean(data.push_enabled),
      emailEnabled: Boolean(data.email_enabled),
      version: Number(data.version || 1),
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  /**
   * Request password update via Supabase Auth
   */
  public static async requestMyPasswordChange(newPassword: string): Promise<void> {
    if (!newPassword || newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      throw new Error(error.message || 'Password update failed.');
    }
  }
}
