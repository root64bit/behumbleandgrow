import React from 'react';
import { HelpCircle } from 'lucide-react';

interface Props {
  screeningAnswers: Record<string, any>;
}

export const CandidateApplicationScreeningSummary: React.FC<Props> = ({ screeningAnswers }) => {
  const entries = Object.entries(screeningAnswers || {});

  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3 text-left">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
        <HelpCircle className="w-4 h-4 text-[#006D44]" />
        <h3 className="text-xs font-extrabold text-[#00122B] uppercase tracking-wider">
          Submitted Screening Answers (Snapshot)
        </h3>
      </div>

      {entries.length === 0 ? (
        <p className="text-xs text-slate-500 italic">No specific screening answers recorded for this vacancy submission.</p>
      ) : (
        <div className="space-y-2.5">
          {entries.map(([key, val]) => (
            <div key={key} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1 text-xs">
              <span className="text-[11px] font-bold text-slate-500 capitalize">
                {key.replace(/_/g, ' ')}
              </span>
              <p className="font-semibold text-slate-800">{String(val)}</p>
            </div>
          ))}
        </div>
      )}

      <p className="text-[11px] text-slate-400 pt-1">
        Submitted screening answers are read-only and preserved for compliance.
      </p>
    </div>
  );
};
