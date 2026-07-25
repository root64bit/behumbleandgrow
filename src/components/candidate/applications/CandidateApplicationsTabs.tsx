import React from 'react';

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'action_required', label: 'Action Required' },
  { id: 'interviews', label: 'Interviews' },
  { id: 'offers', label: 'Offers' },
  { id: 'closed', label: 'Closed' },
];

export const CandidateApplicationsTabs: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 text-left">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 flex-shrink-0 ${
              isActive
                ? 'bg-[#00122B] text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
