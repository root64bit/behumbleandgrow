import React from 'react';
import { Briefcase, Users, Plus } from 'lucide-react';

export default function EmployerDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
        <div>
          <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold uppercase">
            Jumeirah Luxury Hospitality Group
          </span>
          <h1 className="text-2xl font-bold text-white mt-2">Employer Portal Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">Manage published requisitions and review submitted candidates.</p>
        </div>
      </div>

      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Submitted Candidate Dossiers</h3>
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
          <div>
            <div className="font-bold text-white text-sm">Amina Mabote</div>
            <div className="text-slate-400">Applied for: Senior Hospitality Manager - Dubai | Match: 92%</div>
          </div>
          <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs">
            Review Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
