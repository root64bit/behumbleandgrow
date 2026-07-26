import React from 'react';
import { Settings, ShieldCheck } from 'lucide-react';

interface Props {
  referenceId: string;
}

export const CandidateAccountHeader: React.FC<Props> = ({ referenceId }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded-full text-xs font-bold mb-2">
          <Settings className="w-3.5 h-3.5 text-slate-600" />
          <span>Candidate Workspace</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Account Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Manage your account identity, time zone, language, and notification delivery options.
        </p>
      </div>

      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-emerald-900 text-xs font-semibold self-start sm:self-auto">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>{referenceId}</span>
      </div>
    </div>
  );
};
