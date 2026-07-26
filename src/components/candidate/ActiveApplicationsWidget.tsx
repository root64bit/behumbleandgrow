import React from 'react';
import { CandidateApplication } from '../../types/candidate';
import { Send, Clock, Briefcase, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActiveApplicationsWidgetProps {
  applications: CandidateApplication[];
}

export default function ActiveApplicationsWidget({ applications }: ActiveApplicationsWidgetProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Send className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Your Active Applications</h2>
            <p className="text-xs text-slate-500">Track application status across recruitment review and employer screening.</p>
          </div>
        </div>
        <Link to="/candidate/applications" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
          <span>All Applications</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {applications.map((app) => (
          <div key={app.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">{app.jobTitle}</h3>
                <p className="text-[11px] text-slate-600">{app.employerName} • {app.emirate}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Ref: {app.reference} • Submitted {app.submittedAt}</p>
              </div>

              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                {app.currentStage}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                <span>Application Progress</span>
                <span>{app.progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${app.progressPercent}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
