import React from 'react';
import { AlertCircle, RefreshCw, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  message?: string;
  onRetry: () => void;
}

export const CandidatePlacementErrorState: React.FC<Props> = ({ message, onRetry }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-xl mx-auto space-y-5 shadow-sm">
      <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600">
        <AlertCircle className="w-7 h-7" />
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-extrabold text-slate-900">We could not load your placement and relocation status.</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          {message || 'An unexpected error occurred while communicating with the server. Please try again.'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onRetry}
          className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
        <Link
          to="/candidate/dashboard"
          className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2"
        >
          <LayoutDashboard className="w-4 h-4 text-slate-400" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};
