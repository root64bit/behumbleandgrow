import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, ChevronRight, ShieldCheck } from 'lucide-react';
import type { CandidatePlacementProgress } from '../../types/candidate';

interface CandidatePlacementSummaryProps {
  placement: CandidatePlacementProgress | null;
}

export default function CandidatePlacementSummary({ placement }: CandidatePlacementSummaryProps) {
  if (!placement) return null;

  return (
    <section className="bg-white dark:bg-slate-900 border border-[#C4C6CF]/60 dark:border-slate-800 rounded-xl p-5 shadow-[0px_4px_12px_rgba(15,39,71,0.05)] text-left space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-100 text-[#0F2747] dark:bg-blue-950 dark:text-blue-300">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F2747] dark:text-blue-400">
              UAE Placement & Relocation
            </span>
            <h2 className="text-base font-bold font-headline-md text-[#00122B] dark:text-white">
              {placement.employerName}
            </h2>
          </div>
        </div>

        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
          {placement.currentStage}
        </span>
      </div>

      <div className="bg-[#FAF9FC] dark:bg-slate-800 p-3.5 rounded-xl space-y-2 text-xs border border-[#C4C6CF]/30 dark:border-slate-700">
        <div className="flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#006D44] shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-[#00122B] dark:text-slate-100">Work Permit Status</div>
            <p className="text-[#44474E] dark:text-slate-400 text-[11px]">{placement.workPermitStatus}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 pt-2 border-t border-[#C4C6CF]/20">
          <Plane className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-[#00122B] dark:text-slate-100">Target Arrival Date</div>
            <p className="text-[#44474E] dark:text-slate-400 text-[11px]">{placement.expectedArrival}</p>
          </div>
        </div>
      </div>

      <div>
        <Link
          to="/candidate/placement"
          className="w-full py-2.5 px-4 bg-[#0F2747] hover:bg-[#00122B] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-xs"
        >
          <span>Track Relocation Tracker</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
