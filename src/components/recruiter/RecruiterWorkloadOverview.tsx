import React from 'react';
import { RecruiterWorkloadRecord } from '../../types/recruiter';
import { Users, Mail, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecruiterWorkloadOverviewProps {
  recruiters: RecruiterWorkloadRecord[];
}

export default function RecruiterWorkloadOverview({ recruiters }: RecruiterWorkloadOverviewProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'balanced':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'near_capacity':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'over_capacity':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Agency Recruiter Team Workload</h2>
          <p className="text-xs text-slate-500">Internal recruiter lead allocations, active submissions, and current capacity load.</p>
        </div>
        <Link 
          to="/recruiter/team"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Manage Team</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {recruiters.map((rec) => (
          <div key={rec.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">{rec.recruiterName}</h3>
                <p className="text-[11px] text-slate-500">{rec.email}</p>
              </div>

              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${getStatusBadge(rec.status)}`}>
                {rec.status.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>Workload Capacity</span>
                <span className="font-bold text-slate-900">{rec.capacityPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    rec.capacityPercentage > 90 ? 'bg-amber-500' : 'bg-emerald-600'
                  }`}
                  style={{ width: `${rec.capacityPercentage}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-slate-200/60 text-slate-600">
              <div>
                <span className="text-[10px] text-slate-400 block">Active Leads</span>
                <span className="font-bold text-slate-900">{rec.activeLeads}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Submissions</span>
                <span className="font-bold text-slate-900">{rec.submissionsCount}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Placements</span>
                <span className="font-bold text-emerald-700">{rec.placementsCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
