import React from 'react';

export default function RecruiterPipelinePage() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
        <h1 className="text-2xl font-bold text-white">Agency Placement Pipeline</h1>
        <p className="text-xs text-slate-400 mt-1">Track interview schedules and commission payouts.</p>
      </div>

      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="text-3xl font-bold text-emerald-400">$48,500 AED</div>
        <p className="text-xs text-slate-400">Total processed agency placement commissions.</p>
      </div>
    </div>
  );
}
