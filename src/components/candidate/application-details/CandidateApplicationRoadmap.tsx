import React from 'react';
import { getApplicationStageIndex, getApplicationProgressPercentage } from '../../../lib/candidate/applicationStatus';
import type { CandidateStage } from '../../../lib/supabase/types';

interface Props {
  stage?: CandidateStage | string | null;
}

const ROADMAP_STAGES = [
  'Application',
  'Eligibility',
  'Documents',
  'Recruitment Review',
  'Employer Review',
  'Interview',
  'Conditional Offer',
  'Placement',
];

export const CandidateApplicationRoadmap: React.FC<Props> = ({ stage }) => {
  const currentIndex = getApplicationStageIndex(stage);
  const percent = getApplicationProgressPercentage(stage);

  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Application Roadmap</h3>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">
            Stage <span className="font-bold text-[#00122B]">{currentIndex} of 8</span>: {ROADMAP_STAGES[currentIndex - 1]}
          </p>
        </div>
        <span className="text-xs font-extrabold text-[#006D44] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          {percent}% Progress
        </span>
      </div>

      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-[#006D44] h-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
        <p>Progress depends on eligibility, employer selection, required documentation and regulatory approval.</p>
      </div>
    </div>
  );
};
