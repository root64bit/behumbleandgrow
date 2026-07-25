import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface Props {
  onClearFilters: () => void;
}

export const CandidateOffersNoResults: React.FC<Props> = ({ onClearFilters }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 max-w-lg mx-auto my-8 text-left">
      <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-500">
        <SearchX className="w-6 h-6" />
      </div>

      <div className="space-y-1 text-center">
        <h3 className="text-base font-extrabold text-[#00122B]">No Offers Match Your Search</h3>
        <p className="text-xs text-slate-500">
          No conditional offers match the active tab or filter criteria. Try adjusting your search query or clear all filters.
        </p>
      </div>

      <div className="pt-2 flex justify-center">
        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear All Filters</span>
        </button>
      </div>
    </div>
  );
};
