import React from 'react';
import { Bell, Lock, Smartphone, Mail } from 'lucide-react';
import { CandidateNotificationCategory, CANONICAL_NOTIFICATION_CATEGORIES } from '../../../lib/candidate/notificationCategory';
import { CATEGORY_NOTIFICATION_POLICIES, isChannelToggleable } from '../../../lib/candidate/notificationPreferencePolicy';
import { CandidateNotificationCategoryPreference } from '../../../services/candidate-account-settings.service';

interface Props {
  preferences: CandidateNotificationCategoryPreference[];
  draftNotifPrefs: Record<string, { push: boolean; email: boolean }>;
  onToggleChannel: (category: CandidateNotificationCategory, channel: 'push' | 'email', enabled: boolean) => void;
}

export const CandidateNotificationPreferences: React.FC<Props> = ({
  preferences,
  draftNotifPrefs,
  onToggleChannel,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
          <Bell className="w-4 h-4 text-emerald-600" />
          <span>Category Delivery Channels</span>
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Configure delivery channels for each notification category. In-app notifications remain mandatory for active recruitment events.
        </p>
      </div>

      <div className="space-y-3">
        {Object.values(CANONICAL_NOTIFICATION_CATEGORIES).map((catMeta) => {
          const cat = catMeta.key;
          const policy = CATEGORY_NOTIFICATION_POLICIES[cat];
          const draft = draftNotifPrefs[cat] || { push: true, email: true };

          const canPush = isChannelToggleable(cat, 'push');
          const canEmail = isChannelToggleable(cat, 'email');

          return (
            <div
              key={cat}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="space-y-0.5 max-w-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900">{catMeta.label}</span>
                    {!canPush && !canEmail && (
                      <span className="inline-flex items-center text-[10px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-full">
                        <Lock className="w-2.5 h-2.5 mr-1 text-slate-600" /> Mandatory Policy
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">{policy?.description || catMeta.description}</p>
                </div>

                <div className="flex items-center space-x-4 self-center">
                  {/* In-App Channel (Always Mandatory) */}
                  <div className="flex items-center space-x-1.5 opacity-60 cursor-not-allowed" title="In-app notifications are mandatory">
                    <span className="text-[11px] font-bold text-slate-700">In-App</span>
                    <input type="checkbox" checked disabled className="w-3.5 h-3.5 text-emerald-600 rounded" />
                  </div>

                  {/* Push Channel */}
                  <label className={`flex items-center space-x-1.5 ${canPush ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}>
                    <Smartphone className="w-3 h-3 text-slate-400" />
                    <span className="text-[11px] font-bold text-slate-700">Push</span>
                    <input
                      type="checkbox"
                      checked={draft.push}
                      disabled={!canPush}
                      onChange={(e) => canPush && onToggleChannel(cat, 'push', e.target.checked)}
                      className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                  </label>

                  {/* Email Channel */}
                  <label className={`flex items-center space-x-1.5 ${canEmail ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}>
                    <Mail className="w-3 h-3 text-slate-400" />
                    <span className="text-[11px] font-bold text-slate-700">Email</span>
                    <input
                      type="checkbox"
                      checked={draft.email}
                      disabled={!canEmail}
                      onChange={(e) => canEmail && onToggleChannel(cat, 'email', e.target.checked)}
                      className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
