import React from 'react';
import { MapPin, Tag, Briefcase } from 'lucide-react';
import type { Application } from '../../../lib/supabase/types';
import { CandidateApplicationEmployerDisplay } from './CandidateApplicationEmployerDisplay';

interface Props {
  application: Application;
}

export const CandidateApplicationJobSummary: React.FC<Props> = ({ application }) => {
  const jobTitle = (application as any).jobs?.title || 'Customer Service Representative';
  const location = (application as any).jobs?.location || 'Dubai, UAE';
  const refCode = `REF: ${application.id.slice(0, 8).toUpperCase()}`;

  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3 text-left">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-lg font-extrabold text-[#00122B] leading-tight">{jobTitle}</h2>
          <CandidateApplicationEmployerDisplay application={application} />
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#00122B] flex-shrink-0">
          <Briefcase className="w-5 h-5" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono">{refCode}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-full">
          Full-time
        </span>
        <span className="px-2.5 py-0.5 bg-emerald-50 text-[#006D44] border border-emerald-200 text-[11px] font-bold rounded-full">
          Entry Level
        </span>
        <span className="px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold rounded-full">
          Visa Sponsored
        </span>
      </div>
    </div>
  );
};
