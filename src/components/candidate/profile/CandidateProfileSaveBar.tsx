import React from 'react';
import { Save, Check, Clock } from 'lucide-react';

interface Props {
  hasUnsavedChanges: boolean;
  lastSavedAt: string | null;
  saving: boolean;
  onSaveAll?: () => void;
}

export const CandidateProfileSaveBar: React.FC<Props> = ({
  hasUnsavedChanges,
  lastSavedAt,
  saving,
  onSaveAll,
}) => {
  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          {hasUnsavedChanges ? (
            <span className="flex items-center gap-1.5 font-semibold text-amber-700">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Unsaved core changes
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-medium text-slate-500">
              <Check className="w-3.5 h-3.5 text-[#006D44]" />
              {lastSavedAt ? `Saved at ${new Date(lastSavedAt).toLocaleTimeString()}` : 'All changes saved'}
            </span>
          )}
        </div>

        {onSaveAll && (
          <button
            onClick={onSaveAll}
            disabled={!hasUnsavedChanges || saving}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
              hasUnsavedChanges
                ? 'bg-[#006D44] hover:bg-[#005232] text-white shadow-sm'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save Core Changes'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
