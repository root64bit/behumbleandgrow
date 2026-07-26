import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  onReload: () => void;
}

export const CandidateSettingsConflictState: React.FC<Props> = ({ onReload }) => {
  return (
    <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-4 text-amber-900">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
        <div>
          <h4 className="text-xs font-bold">Stale Version Conflict</h4>
          <p className="text-[11px] text-amber-800">
            Your settings were modified in another session. Please reload to review updated settings before saving.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onReload}
        className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center space-x-1 flex-shrink-0"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Reload Settings</span>
      </button>
    </div>
  );
};
