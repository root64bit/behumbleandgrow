import React from 'react';
import { SearchX } from 'lucide-react';

interface Props {
  onClearFilters: () => void;
}

export const CandidateApplicationsNoResults: React.FC<Props> = ({ onClearFilters }) => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3 shadow-sm">
      <SearchX className="w-8 h-8 text-slate-400 mx-auto" />
      <h3 className="text-sm font-extrabold text-[#00122B]">No Matching Applications Found</h3>
      <p className="text-xs text-slate-500 max-w-sm mx-auto">
        No applications match your active search terms or status tab filter.
      </p>
      <div className="pt-1">
        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};
