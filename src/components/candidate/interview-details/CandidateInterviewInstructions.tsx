import React from 'react';

interface Props {
  instructions: string[];
}

export const CandidateInterviewInstructions: React.FC<Props> = ({ instructions }) => {
  return (
    <div className="space-y-3 text-left">
      <h3 className="text-base font-extrabold text-[#00122B]">Instructions</h3>

      <div className="space-y-2.5 text-xs text-slate-700">
        {instructions.map((inst, index) => (
          <div key={index} className="flex gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
            <span className="font-black text-[#006D44]">0{index + 1}.</span>
            <p className="font-medium text-slate-800 leading-relaxed">{inst}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
