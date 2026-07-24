import React from 'react';
import { PlacementProgressRecord } from '../../types/recruiter';
import { PlaneTakeoff, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlacementTrackerWidgetProps {
  placements: PlacementProgressRecord[];
}

export default function PlacementTrackerWidget({ placements }: PlacementTrackerWidgetProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <PlaneTakeoff className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Placement Mobility Progress</h2>
            <p className="text-xs text-slate-500">Placed candidates undergoing UAE work permit, visa approval, and travel prep.</p>
          </div>
        </div>
        <Link to="/recruiter/placements" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
          <span>All Placements</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {placements.map((plc) => (
          <div key={plc.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">{plc.candidateName}</h3>
                <p className="text-[11px] text-slate-500">Employer: <span className="font-semibold text-slate-800">{plc.employerName}</span></p>
              </div>

              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {plc.currentStage}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{plc.daysInStage} days in stage</span>
              </span>

              <span className="font-bold text-slate-900">Est. Arrival: {plc.expectedArrival}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
