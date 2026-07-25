import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ChevronRight, Clock } from 'lucide-react';
import type { CandidateApplication } from '../../types/candidate';

interface CandidateApplicationsSummaryProps {
  applications: CandidateApplication[];
}

export default function CandidateApplicationsSummary({ applications }: CandidateApplicationsSummaryProps) {
  if (applications.length === 0) {
    return (
      <section className="bg-white dark:bg-slate-900 border border-[#C4C6CF]/60 dark:border-slate-800 rounded-xl p-5 shadow-[0px_4px_12px_rgba(15,39,71,0.05)] text-left">
        <h2 className="text-base font-bold font-headline-md text-[#00122B] dark:text-white flex items-center gap-2 mb-3">
          <Briefcase className="w-5 h-5 text-[#006D44]" />
          <span>Active Applications</span>
        </h2>
        <p className="text-xs text-[#44474E] dark:text-slate-400">
          You have no active job applications. Explore recommended UAE opportunities to start your journey.
        </p>
        <Link
          to="/candidate/jobs"
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-bold rounded-xl transition-colors active:scale-95 shadow-xs"
        >
          <span>Explore Vacancies</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-slate-900 border border-[#C4C6CF]/60 dark:border-slate-800 rounded-xl p-5 shadow-[0px_4px_12px_rgba(15,39,71,0.05)] text-left space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold font-headline-md text-[#00122B] dark:text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#006D44]" />
          <span>Active Applications</span>
        </h2>
        <Link to="/candidate/applications" className="text-xs font-bold text-[#006D44] hover:underline">
          View All ({applications.length})
        </Link>
      </div>

      <div className="space-y-3">
        {applications.map((app) => (
          <Link
            key={app.id}
            to={`/candidate/applications/${app.id}`}
            className="block p-3.5 bg-[#FAF9FC] dark:bg-slate-800/80 border border-[#C4C6CF]/40 dark:border-slate-700 rounded-xl hover:border-[#006D44] transition-all group"
          >
            <div className="flex justify-between items-start gap-2">
              <div>
                <span className="text-[10px] font-mono text-[#74777F] dark:text-slate-400 font-semibold">
                  {app.reference}
                </span>
                <h3 className="text-sm font-bold text-[#00122B] dark:text-slate-100 group-hover:text-[#006D44] transition-colors">
                  {app.jobTitle}
                </h3>
                <p className="text-xs text-[#44474E] dark:text-slate-400">
                  {app.employerName} • {app.emirate}
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#EAF7F1] text-[#006D44] dark:bg-emerald-950 dark:text-emerald-300 shrink-0">
                {app.currentStage}
              </span>
            </div>

            <div className="mt-3 flex justify-between items-center text-xs pt-2 border-t border-[#C4C6CF]/30 dark:border-slate-700">
              <span className="flex items-center gap-1 text-[11px] text-[#74777F] dark:text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Submitted {app.submittedAt}</span>
              </span>
              <span className="font-bold text-[#006D44] flex items-center text-xs">
                View Details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
