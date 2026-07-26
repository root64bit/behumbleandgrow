import React from 'react';
import { PartnerPerformanceMetric } from '../../types/recruiter';
import { ShieldCheck, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

interface PartnerPerformanceSlaProps {
  performance: PartnerPerformanceMetric;
}

export default function PartnerPerformanceSla({ performance }: PartnerPerformanceSlaProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Agency SLA & Quality Metrics</h2>
            <p className="text-xs text-slate-500">Authorized performance metrics measured against operations SLA standards.</p>
          </div>
        </div>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 uppercase">
          {performance.slaStatus.replace('_', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
          <span className="text-slate-500 font-semibold block">Lead Acceptance Rate</span>
          <p className="text-xl font-black text-slate-900">{performance.acceptanceRate}%</p>
          <span className="text-[10px] text-emerald-700 font-bold">Target: &gt;90%</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
          <span className="text-slate-500 font-semibold block">Avg Response Time</span>
          <p className="text-xl font-black text-slate-900">{performance.avgResponseTimeHours} hrs</p>
          <span className="text-[10px] text-emerald-700 font-bold">Target: &lt;12 hrs</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
          <span className="text-slate-500 font-semibold block">Submission Rate</span>
          <p className="text-xl font-black text-slate-900">{performance.submissionRate}%</p>
          <span className="text-[10px] text-emerald-700 font-bold">Target: &gt;80%</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-1">
          <span className="text-emerald-800 font-semibold block">Placement Conversion</span>
          <p className="text-xl font-black text-emerald-950">{performance.placementConversion}%</p>
          <span className="text-[10px] text-emerald-700 font-bold">High Performing</span>
        </div>
      </div>
    </div>
  );
}
