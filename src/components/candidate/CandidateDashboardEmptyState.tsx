import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

export default function CandidateDashboardEmptyState() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-[#C4C6CF]/60 dark:border-slate-800 rounded-2xl p-8 text-center space-y-6 max-w-2xl mx-auto shadow-md">
      <div className="w-16 h-16 bg-[#EAF7F1] text-[#006D44] dark:bg-emerald-950 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto">
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold font-headline-md text-[#00122B] dark:text-white">
          Welcome to Your Candidate Workspace
        </h2>
        <p className="text-xs sm:text-sm text-[#44474E] dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
          Your profile has been created! To get matched with premier UAE employers and start your application journey, please complete your profile details and upload required verification documents.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
        <Link
          to="/candidate/profile"
          className="p-4 bg-[#FAF9FC] dark:bg-slate-800 border border-[#C4C6CF]/40 dark:border-slate-700 rounded-xl hover:border-[#006D44] transition-all group"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#006D44] shrink-0" />
            <div>
              <div className="text-xs font-bold text-[#00122B] dark:text-white group-hover:text-[#006D44]">1. Complete Profile</div>
              <div className="text-[11px] text-[#74777F] dark:text-slate-400">Add work experience & skills</div>
            </div>
          </div>
        </Link>

        <Link
          to="/candidate/documents"
          className="p-4 bg-[#FAF9FC] dark:bg-slate-800 border border-[#C4C6CF]/40 dark:border-slate-700 rounded-xl hover:border-[#006D44] transition-all group"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#006D44] shrink-0" />
            <div>
              <div className="text-xs font-bold text-[#00122B] dark:text-white group-hover:text-[#006D44]">2. Upload Documents</div>
              <div className="text-[11px] text-[#74777F] dark:text-slate-400">Passport scan & certificates</div>
            </div>
          </div>
        </Link>
      </div>

      <div className="pt-4 border-t border-[#C4C6CF]/30">
        <Link
          to="/candidate/profile"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-bold rounded-xl transition-colors active:scale-95 shadow-md"
        >
          <span>Start Candidate Setup</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
