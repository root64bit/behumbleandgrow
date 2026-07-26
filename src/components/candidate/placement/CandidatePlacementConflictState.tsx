import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  onReload: () => void;
}

export const CandidatePlacementConflictState: React.FC<Props> = ({ onReload }) => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left space-y-3 text-amber-950 text-xs shadow-sm">
      <div className="flex items-center space-x-2.5">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
        <h4 className="font-bold text-sm text-slate-900">This placement information changed while you were reviewing it.</h4>
      </div>
      <p className="text-slate-700 leading-relaxed">
        Another update was made to your placement file. Please reload the page to get the latest status before completing your action.
      </p>
      <button
        onClick={onReload}
        className="inline-flex items-center space-x-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-sm transition-all"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Reload Placement</span>
      </button>
    </div>
  );
};
