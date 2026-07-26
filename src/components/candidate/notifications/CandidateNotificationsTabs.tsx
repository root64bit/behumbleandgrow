import React from 'react';
import { CandidateNotificationCategory } from '../../../lib/candidate/notificationCategory';

export type NotificationTabKey = 'all' | 'unread' | 'action_required' | CandidateNotificationCategory;

interface CandidateNotificationsTabsProps {
  activeTab: NotificationTabKey;
  onSelectTab: (tab: NotificationTabKey) => void;
  unreadCount?: number;
  actionRequiredCount?: number;
}

export function CandidateNotificationsTabs({
  activeTab,
  onSelectTab,
  unreadCount = 0,
  actionRequiredCount = 0,
}: CandidateNotificationsTabsProps) {
  const tabs: { key: NotificationTabKey; label: string; badge?: number }[] = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: 'Unread', badge: unreadCount },
    { key: 'action_required', label: 'Action Required', badge: actionRequiredCount },
    { key: 'application', label: 'Applications' },
    { key: 'interview', label: 'Interviews' },
    { key: 'offer', label: 'Offers' },
    { key: 'placement', label: 'Placement' },
    { key: 'document', label: 'Documents' },
    { key: 'system', label: 'System' },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onSelectTab(tab.key)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              isActive
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {typeof tab.badge === 'number' && tab.badge > 0 && (
              <span
                className={`px-1.5 py-0.2 text-[10px] font-black rounded-full ${
                  isActive
                    ? 'bg-emerald-500 text-white dark:bg-emerald-600'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
