import React from 'react';
import { RecruiterService } from '../../services/recruiter.service';
import { Users, Mail, UserPlus, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function RecruiterTeamPage() {
  const recruiters = RecruiterService.getRecruiterWorkload();

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">Agency Recruiter Team Management</h1>
          <p className="text-xs text-slate-500">Manage internal recruiters, monitor workload distribution, and reassign candidate leads.</p>
        </div>
        <button 
          onClick={() => alert("Invite Agency Recruiter modal...")}
          className="btn btn-primary py-2 px-4 text-xs font-bold self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Recruiter</span>
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recruiters.map((rec) => (
          <div key={rec.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white font-black flex items-center justify-center text-sm shadow-xs">
                {rec.recruiterName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{rec.recruiterName}</h3>
                <p className="text-xs text-slate-500">{rec.email}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>Allocated Capacity</span>
                <span className="font-bold text-slate-900">{rec.capacityPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${rec.capacityPercentage}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 text-slate-700">
              <div>
                <span className="text-[10px] text-slate-400 block">Active Leads</span>
                <span className="font-extrabold text-slate-900">{rec.activeLeads}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Placements</span>
                <span className="font-extrabold text-emerald-700">{rec.placementsCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
