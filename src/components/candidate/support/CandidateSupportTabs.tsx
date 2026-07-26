import React from 'react';
import { SupportTabKey } from '../../../hooks/candidate/useCandidateSupport';

interface CandidateSupportTabsProps {
  activeTab: SupportTabKey;
  onSelectTab: (tab: SupportTabKey) => void;
  actionRequiredCount?: number;
  openCount?: number;
}

export function CandidateSupportTabs({
  activeTab,
  onSelectTab,
  actionRequiredCount = 0,
  openCount = 0,
}: CandidateSupportTabsProps) {
  const tabs: { key: SupportTabKey; label: string; badge?: number }[] = [
    { key: 'all', label: 'All Requests' },
    { key: 'open', label: 'Active', badge: openCount },
    { key: 'action_required', label: 'Response Required', badge: actionRequiredCount },
    { key: 'awaiting_support', label: 'Awaiting Support' },
    { key: 'resolved', label: 'Resolved' },
    { key: 'closed', label: 'Closed' },
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
