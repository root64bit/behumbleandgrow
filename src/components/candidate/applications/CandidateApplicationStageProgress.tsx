import React from 'react';
import {
  getApplicationStageIndex,
  getApplicationProgressPercentage,
} from '../../../lib/candidate/applicationStatus';
import type { CandidateStage } from '../../../lib/supabase/types';

interface Props {
  stage?: CandidateStage | string | null;
}

export const CandidateApplicationStageProgress: React.FC<Props> = ({ stage }) => {
  const stageIndex = getApplicationStageIndex(stage);
  const percent = getApplicationProgressPercentage(stage);

  return (
    <div className="space-y-1.5 text-left">
      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-500 font-medium">
          Stage <span className="font-bold text-[#00122B]">{stageIndex} of 8</span>
        </span>
        <span className="font-extrabold text-[#006D44] bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
          {percent}%
        </span>
      </div>

      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div
          className="bg-[#006D44] h-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
