import React from 'react';

interface Props {
  activeTab: string;
  onTabChange: (tab: 'active' | 'action_required' | 'accepted' | 'expired' | 'declined' | 'all') => void;
}

const TABS: { id: 'active' | 'action_required' | 'accepted' | 'expired' | 'declined' | 'all'; label: string }[] = [
  { id: 'all', label: 'All Offers' },
  { id: 'action_required', label: 'Action Required' },
  { id: 'active', label: 'Active' },
  { id: 'accepted', label: 'Accepted' },
  { id: 'expired', label: 'Expired' },
  { id: 'declined', label: 'Declined' },
];

export const CandidateOffersTabs: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex overflow-x-auto gap-1.5 pb-1 no-scrollbar border-b border-slate-200 text-left">
      {TABS.map((t) => {
        const isActive = activeTab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`px-3.5 py-2 font-bold text-xs rounded-xl whitespace-nowrap transition-colors ${
              isActive
                ? 'bg-[#006D44] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
};
