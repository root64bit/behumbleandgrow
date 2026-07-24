import React from 'react';
import { Users, Briefcase } from 'lucide-react';

export default function RecruiterLeadsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
        <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full text-xs font-bold uppercase">
          Mozambique Talent Solutions
        </span>
        <h1 className="text-2xl font-bold text-white mt-2">Assigned Candidate Leads</h1>
        <p className="text-xs text-slate-400 mt-1">
          Agency lead pipeline for candidates assigned by platform operations.
        </p>
      </div>

      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Active Agency Leads</h3>
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
          <div>
            <div className="font-bold text-white text-sm">Amina Mabote</div>
            <div className="text-slate-400">Hospitality Manager Candidate | Mozambique</div>
          </div>
          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold">
            Assigned
          </span>
        </div>
      </div>
    </div>
  );
}
