import React from 'react';
import { RecruitmentPipelineStage } from '../../types/superadmin';
import { Layers, Clock, AlertTriangle } from 'lucide-react';

interface RecruitmentPipelineOverviewProps {
  stages: RecruitmentPipelineStage[];
}

export default function RecruitmentPipelineOverview({ stages }: RecruitmentPipelineOverviewProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Platform Recruitment Pipeline</h2>
          <p className="text-xs text-slate-500">Live active cases across all 10 international placement stages.</p>
        </div>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          10 Active Stages
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {stages.map((stage, idx) => (
          <div 
            key={stage.id}
            className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-2 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Stage {idx + 1}
              </span>
              <h3 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2 mt-0.5">
                {stage.stageName}
              </h3>
            </div>

            <div>
              <p className="text-lg font-black text-slate-900">{stage.count}</p>
              
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/60 mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{stage.averageTimeInStage}</span>
                </span>

                {stage.delayedCount > 0 && (
                  <span className="text-amber-700 font-bold flex items-center gap-0.5">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{stage.delayedCount}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
