import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  message?: string;
  onRetry?: () => void;
}

export const CandidateDocumentErrorState: React.FC<Props> = ({
  message = 'We could not load your verification document vault.',
  onRetry,
}) => {
  return (
    <div className="p-8 bg-white border border-red-200 rounded-2xl shadow-sm text-center space-y-4 max-w-md mx-auto my-8">
      <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-600">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <div>
        <h3 className="text-base font-extrabold text-slate-900">Document Vault Error</h3>
        <p className="text-xs text-slate-500 mt-1">{message}</p>
      </div>
      <div className="flex items-center justify-center gap-3 pt-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white font-bold text-xs rounded-xl shadow-sm inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        )}
        <Link
          to="/candidate/dashboard"
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl inline-flex items-center gap-1.5"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
      </div>
    </div>
  );
};
