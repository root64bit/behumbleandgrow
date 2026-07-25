import React from 'react';
import { User, ShieldCheck } from 'lucide-react';
import type { CandidateSummary } from '../../types/candidate';

interface CandidateWelcomeCardProps {
  summary: CandidateSummary;
}

export default function CandidateWelcomeCard({ summary }: CandidateWelcomeCardProps) {
  const firstName = summary.candidateName.split(' ')[0] || summary.candidateName;

  return (
    <section className="space-y-4 animate-fade-in text-left">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF7F1] text-[#006D44] dark:bg-emerald-950/60 dark:text-emerald-300 uppercase tracking-wider border border-[#7DF7B6]/40 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#006D44]" />
              <span>Candidate Workspace</span>
            </span>
            <span className="text-[11px] font-mono font-semibold text-slate-500">
              {summary.candidateId}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-headline-lg text-[#00122B] dark:text-white tracking-tight">
            Welcome, {firstName}
          </h1>
          <p className="text-sm text-[#44474E] dark:text-slate-400 mt-0.5">
            Your career journey is {summary.profileCompletionPercent}% complete. You're almost there!
          </p>
        </div>

        {/* Candidate Avatar */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#0F2747] dark:border-emerald-500 overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-xs">
          <User className="w-7 h-7 text-[#0F2747] dark:text-emerald-400" />
        </div>
      </div>

      {/* Profile Progress Card */}
      <div className="bg-white dark:bg-slate-900 border border-[#C4C6CF]/60 dark:border-slate-800 rounded-xl p-4 shadow-[0px_4px_12px_rgba(15,39,71,0.05)]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-[#00122B] dark:text-slate-200">
            Profile Completeness
          </span>
          <span className="text-sm font-bold text-[#006D44] dark:text-emerald-400">
            {summary.profileCompletionPercent}%
          </span>
        </div>
        <div className="w-full bg-[#E3E2E5] dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-[#006D44] dark:bg-emerald-500 h-2.5 rounded-full transition-all duration-1000" 
            style={{ width: `${Math.min(100, Math.max(0, summary.profileCompletionPercent))}%` }}
          />
        </div>
      </div>
    </section>
  );
}
