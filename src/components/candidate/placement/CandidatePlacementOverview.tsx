import React from 'react';
import { CandidatePlacement } from '../../../services/candidate-placement.service';
import { PlacementRoadmapStage, calculateRoadmapProgress } from '../../../lib/candidate/placementRoadmap';

interface Props {
  placement: CandidatePlacement;
  roadmap: PlacementRoadmapStage[];
}

export const CandidatePlacementOverview: React.FC<Props> = ({ placement, roadmap }) => {
  const { percentage } = calculateRoadmapProgress(roadmap);

  return (
    <section className="relative rounded-2xl overflow-hidden bg-[#00122b] p-6 text-white shadow-xl text-left border border-slate-800">
      <div className="relative z-10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400">
              Placement Progress
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Your Global Mobility Journey is {percentage}% Complete
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              We are currently processing your relocation file for {placement.jobTitle} with {placement.employerDisplayName}.
            </p>
          </div>

          <div className="sm:text-right shrink-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Arrival</div>
            <div className="text-lg font-black text-emerald-400">
              {placement.targetArrivalDate || 'Schedule Pending'}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-300 font-bold">
            <span>Stage {placement.relocationStage} of 10</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
