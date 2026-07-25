import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, CheckCircle2, Circle, ArrowUpRight } from 'lucide-react';
import type { ProfileCompletionSection } from '../../types/candidate';

interface CandidateProfileReadinessProps {
  sections: ProfileCompletionSection[];
  completionPercent: number;
}

export default function CandidateProfileReadiness({ sections, completionPercent }: CandidateProfileReadinessProps) {
  return (
    <section className="bg-white dark:bg-slate-900 border border-[#C4C6CF]/60 dark:border-slate-800 rounded-xl p-5 shadow-[0px_4px_12px_rgba(15,39,71,0.05)] text-left flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold font-headline-md text-[#00122B] dark:text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#006D44]" />
            <span>Profile Readiness</span>
          </h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#EAF7F1] text-[#006D44] dark:bg-emerald-950 dark:text-emerald-300">
            {completionPercent}% Complete
          </span>
        </div>

        <div className="space-y-2">
          {sections.map((sec) => (
            <div key={sec.id} className="flex items-center justify-between text-xs py-1 border-b border-[#C4C6CF]/20 dark:border-slate-800/80 last:border-0">
              <span className={`flex items-center gap-2 ${sec.isCompleted ? 'text-[#00122B] dark:text-slate-200 font-medium' : 'text-[#74777F] dark:text-slate-400'}`}>
                {sec.isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-[#006D44] shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-[#C4C6CF] shrink-0" />
                )}
                <span>{sec.name}</span>
              </span>
              {sec.isRequired && !sec.isCompleted && (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded uppercase">Required</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-[#C4C6CF]/30 dark:border-slate-800">
        <Link
          to="/candidate/profile"
          className="w-full py-2.5 px-4 bg-[#0F2747] hover:bg-[#00122B] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-xs"
        >
          <span>Complete Profile Details</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
