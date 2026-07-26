import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function StagingBanner() {
  const isDevOrStaging = import.meta.env.DEV || import.meta.env.VITE_APP_ENV !== 'production';

  if (!isDevOrStaging) return null;

  return (
    <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold flex flex-wrap items-center justify-between border-b border-amber-600 shadow-sm z-50">
      <div className="flex items-center space-x-2">
        <span className="px-2 py-0.5 bg-slate-950 text-amber-400 uppercase tracking-wider rounded text-[10px] font-black">
          STAGING ENVIRONMENT
        </span>
        <span className="flex items-center space-x-1 text-slate-900">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Controlled Technical Candidate Pilot — Synthetic Test Data Only</span>
        </span>
      </div>
      <div className="flex items-center space-x-2 text-[11px] text-slate-900 mt-1 sm:mt-0 font-semibold">
        <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
        <span>Application fee disabled during the closed technical pilot.</span>
      </div>
    </div>
  );
}
