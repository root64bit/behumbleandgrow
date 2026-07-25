import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  message?: string;
  onRetry?: () => void;
}

export const CandidateProfileErrorState: React.FC<Props> = ({ message, onRetry }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-lg mx-auto text-center shadow-sm my-8 space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h1 className="text-lg font-bold text-slate-900">We Could Not Load Your Profile</h1>
      <p className="text-xs text-slate-600 leading-relaxed">
        {message || 'An unexpected authentication or server error occurred while retrieving candidate profile details.'}
      </p>
      <div className="flex justify-center gap-3 pt-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        )}
        <Link
          to="/candidate/dashboard"
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1.5"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};
