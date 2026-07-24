import React from 'react';
import { EmployerSubmissionRecord } from '../../types/recruiter';
import { Send, Clock, Briefcase, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmployerSubmissionsWidgetProps {
  submissions: EmployerSubmissionRecord[];
}

export default function EmployerSubmissionsWidget({ submissions }: EmployerSubmissionsWidgetProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'interview_requested':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'under_review':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Employer Submissions</h2>
          <p className="text-xs text-slate-500">Candidates formally submitted to UAE employers currently under evaluation.</p>
        </div>
        <Link to="/recruiter/submissions" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
          <span>All Submissions</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-2">
        {submissions.map((sub) => (
          <div key={sub.id} className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between gap-3 hover:bg-slate-100/50 transition-colors">
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 truncate">{sub.candidateName}</span>
                <span className="text-[10px] font-mono text-slate-400">({sub.submissionRef})</span>
              </div>
              <p className="text-xs text-slate-600 truncate">{sub.jobTitle} • <span className="font-semibold text-slate-800">{sub.employerName}</span></p>
            </div>

            <div className="flex items-center gap-3 shrink-0 text-right">
              <div>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${getStatusBadge(sub.status)}`}>
                  {sub.status.replace('_', ' ')}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{sub.daysWaiting}d waiting</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
