import React from 'react';
import { Save, RotateCcw, Loader2 } from 'lucide-react';
import { MutationStatus } from '../../../hooks/candidate/useCandidateAccountSettings';

interface Props {
  hasUnsavedChanges: boolean;
  mutationStatus: MutationStatus;
  mutationMessage: string;
  onSave: () => void;
  onReset: () => void;
}

export const CandidateSettingsSaveBar: React.FC<Props> = ({
  hasUnsavedChanges,
  mutationStatus,
  mutationMessage,
  onSave,
  onReset,
}) => {
  if (!hasUnsavedChanges && mutationStatus === 'idle') return null;

  const isSaving = mutationStatus === 'saving';

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 animate-slideUp">
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center justify-between gap-4">
        <div className="text-xs font-semibold">
          {isSaving ? (
            <span className="flex items-center text-slate-300">
              <Loader2 className="w-4 h-4 mr-2 animate-spin text-emerald-400" />
              Saving preferences...
            </span>
          ) : mutationStatus === 'saved' ? (
            <span className="text-emerald-400 font-bold">{mutationMessage}</span>
          ) : mutationStatus === 'error' ? (
            <span className="text-red-400 font-bold">{mutationMessage}</span>
          ) : (
            <span className="text-slate-200">You have unsaved changes</span>
          )}
        </div>

        {hasUnsavedChanges && (
          <div className="flex items-center space-x-2">
            <button
              type="button"
              disabled={isSaving}
              onClick={onReset}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Discard</span>
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={onSave}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm transition-colors disabled:opacity-50 flex items-center space-x-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
