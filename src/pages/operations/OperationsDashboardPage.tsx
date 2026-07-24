import React from 'react';
import CandidateVerificationVault from '../../components/portals/CandidateVerificationVault';
import { Building2, Users, FileText } from 'lucide-react';

export default function OperationsDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-sm">
        <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
          Internal Ops Control Console
        </span>
        <h1 className="text-2xl font-bold text-white mt-2">Operations Review & Relocation Pipeline</h1>
        <p className="text-xs text-slate-400 mt-1">
          Global lead distribution, verification queue, and employer application review console.
        </p>
      </div>

      <CandidateVerificationVault />
    </div>
  );
}
