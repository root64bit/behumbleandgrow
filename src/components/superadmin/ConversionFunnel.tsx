import React from 'react';
import { ConversionFunnelStage } from '../../types/superadmin';
import { TrendingUp, Users, ArrowRight } from 'lucide-react';

interface ConversionFunnelProps {
  stages: ConversionFunnelStage[];
}

export default function ConversionFunnel({ stages }: ConversionFunnelProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Candidate Acquisition & Conversion Funnel</h2>
          <p className="text-xs text-slate-500">Tracking candidates from homepage landing to verified application submission.</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
          <TrendingUp className="w-4 h-4" />
          <span>8.4% Overall Conversion</span>
        </div>
      </div>

      <div className="space-y-3">
        {stages.map((stage, idx) => {
          // Progress bar percentage relative to first stage
          const maxCount = stages[0].totalCount;
          const barWidth = Math.max(12, Math.round((stage.totalCount / maxCount) * 100));

          return (
            <div key={stage.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[10px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span>{stage.stageName}</span>
                </span>
                
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-extrabold text-slate-900">{stage.totalCount.toLocaleString()}</span>
                  <span className="text-slate-400">({stage.conversionRate}% step conversion)</span>
                </div>
              </div>

              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
