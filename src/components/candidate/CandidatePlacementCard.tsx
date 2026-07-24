import React from 'react';
import { CandidatePlacementProgress } from '../../types/candidate';
import { PlaneTakeoff, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CandidatePlacementCardProps {
  placement: CandidatePlacementProgress;
}

export default function CandidatePlacementCard({ placement }: CandidatePlacementCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <PlaneTakeoff className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Work Permit & Visa Progress</h2>
            <p className="text-xs text-slate-500">Live mobility tracker for accepted job placement.</p>
          </div>
        </div>

        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
          {placement.currentStage}
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
        <p className="text-xs font-bold text-slate-900">Employer: {placement.employerName}</p>
        <p className="text-xs text-slate-600 font-medium">{placement.visaStatus}</p>
        
        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
          <span className="text-slate-500">Target UAE Arrival:</span>
          <span className="font-extrabold text-emerald-800">{placement.expectedArrival}</span>
        </div>
      </div>

      <p className="text-[10px] text-slate-400 italic">
        Work-permit and visa entry permit decisions are processed by the UAE Ministry of Human Resources & General Directorate of Residency and Foreigners Affairs.
      </p>
    </div>
  );
}
