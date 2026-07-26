import React from 'react';
import { UserPlus, AlertCircle, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

interface Props {
  reason: 'unprovisioned' | 'incomplete' | 'query_failure' | 'rls_denial' | 'demo_mode';
  onRetry?: () => void;
  onInitializeProfile?: () => void;
}

export const CandidateProfileSetupState: React.FC<Props> = ({ reason, onRetry, onInitializeProfile }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-lg mx-auto text-center shadow-sm my-8 space-y-4">
      {reason === 'unprovisioned' && (
        <>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#006D44] flex items-center justify-center mx-auto">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#00122B]">Complete Your Profile Setup</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your Candidate Workspace account has been created, but your candidate record has not been initialised yet. Click below to start building your professional profile.
          </p>
          <button
            onClick={onInitializeProfile}
            className="px-5 py-2.5 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-bold rounded-xl shadow-sm transition-transform active:scale-95"
          >
            Initialise Candidate Profile
          </button>
        </>
      )}

      {reason === 'rls_denial' && (
        <>
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Access Restricted</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            You do not have permission to access or view this candidate profile record under PostgreSQL Row Level Security policies.
          </p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 mx-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Authentication</span>
          </button>
        </>
      )}

      {reason === 'query_failure' && (
        <>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">We Couldn't Load Your Profile</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            A network or database connection failure occurred while fetching your records.
          </p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-[#006D44] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 mx-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </>
      )}

      {reason === 'demo_mode' && (
        <>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Development Demo Mode Active</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            `VITE_DEMO_DATA_ENABLED=true` is set in local development. Demo data has loaded for testing UI components.
          </p>
        </>
      )}
    </div>
  );
};
