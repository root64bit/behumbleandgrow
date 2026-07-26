import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  message?: string;
  onRetry: () => void;
}

export const CandidateSettingsErrorState: React.FC<Props> = ({ message, onRetry }) => {
  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white border border-red-200 rounded-2xl shadow-sm text-center space-y-4">
      <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
      <div>
        <h3 className="text-base font-bold text-slate-900">Unable to Load Account Settings</h3>
        <p className="text-xs text-slate-600 mt-1">{message || 'An unexpected error occurred while retrieving your preferences.'}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm inline-flex items-center space-x-1.5 transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Try Again</span>
      </button>
    </div>
  );
};
