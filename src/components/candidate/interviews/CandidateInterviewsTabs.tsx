import React from 'react';

interface Props {
  activeTab: 'upcoming' | 'action_required' | 'completed' | 'rescheduled' | 'all';
  onTabChange: (tab: 'upcoming' | 'action_required' | 'completed' | 'rescheduled' | 'all') => void;
  actionRequiredCount: number;
}

export const CandidateInterviewsTabs: React.FC<Props> = ({ activeTab, onTabChange, actionRequiredCount }) => {
  const tabs = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'action_required', label: 'Action Required', badge: actionRequiredCount },
    { id: 'completed', label: 'Completed' },
    { id: 'rescheduled', label: 'Rescheduled' },
    { id: 'all', label: 'All' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1 border-b border-slate-200 sticky top-16 bg-[#FAF9FC] z-30">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as any)}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === tab.id
              ? 'bg-[#00122B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <span>{tab.label}</span>
          {Boolean(tab.badge && tab.badge > 0) && (
            <span className="px-1.5 py-0.5 bg-amber-500 text-white rounded-full text-[10px] font-black">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
