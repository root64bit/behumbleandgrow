import React from 'react';
import { EmployerActivityRecord } from '../../types/superadmin';
import { Briefcase, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmployerActivityTableProps {
  employers: EmployerActivityRecord[];
}

export default function EmployerActivityTable({ employers }: EmployerActivityTableProps) {
  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending_verification':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'action_needed':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">UAE Employer Demand & Activity</h2>
          <p className="text-xs text-slate-500">Verified UAE companies publishing job vacancies and reviewing candidate submissions.</p>
        </div>
        <Link 
          to="/superadmin/organisations"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Manage Employers</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {employers.map((emp) => (
          <div key={emp.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{emp.companyName}</span>
                </h3>
                <p className="text-[11px] text-slate-500">{emp.industry} • {emp.emirate}, UAE</p>
              </div>

              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${getVerificationBadge(emp.verificationStatus)}`}>
                {emp.verificationStatus.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-slate-200/60 text-slate-600">
              <div>
                <span className="text-[10px] text-slate-400 block">Open Vacancies</span>
                <span className="font-bold text-slate-900">{emp.activeVacancies}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Submissions</span>
                <span className="font-bold text-slate-900">{emp.candidateSubmissions}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Avg Response</span>
                <span className="font-bold text-slate-900">{emp.averageResponseTimeDays} days</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
