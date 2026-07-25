import React from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

interface Props {
  message: string;
  onReload: () => void;
}

export const CandidateProfileConflictState: React.FC<Props> = ({ message, onReload }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl border border-slate-200">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <AlertOctagon className="w-6 h-6" />
        </div>
        <h2 className="text-base font-bold text-slate-900">Profile Conflict Detected</h2>
        <p className="text-xs text-slate-600 leading-relaxed">{message}</p>
        <button
          onClick={onReload}
          className="w-full py-2.5 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reload Latest Profile State</span>
        </button>
      </div>
    </div>
  );
};
