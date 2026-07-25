import React from 'react';
import { CheckCircle2, Clock, Info } from 'lucide-react';
import type { CandidateTimelineEvent } from '../../../lib/candidate/applicationTimeline';

interface Props {
  events: CandidateTimelineEvent[];
}

export const CandidateApplicationStageTimeline: React.FC<Props> = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className="p-5 bg-white border border-slate-200 rounded-2xl text-center text-xs text-slate-500">
        No timestamped events recorded yet.
      </div>
    );
  }

  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 text-left">
      <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Historical Activity Timeline</h3>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {events.map((evt, idx) => {
          const isLatest = idx === events.length - 1;

          return (
            <div key={evt.id} className="relative flex items-start gap-3">
              <div
                className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 bg-white ${
                  isLatest
                    ? 'border-[#006D44] text-[#006D44] ring-4 ring-emerald-50'
                    : 'border-slate-300 text-slate-400'
                }`}
              >
                {isLatest ? (
                  <Clock className="w-3 h-3 text-[#006D44] animate-pulse" />
                ) : (
                  <CheckCircle2 className="w-3 h-3 text-slate-400" />
                )}
              </div>

              <div className="space-y-0.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${isLatest ? 'text-[#006D44]' : 'text-[#00122B]'}`}>
                    {evt.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(evt.timestamp).toLocaleDateString()}{' '}
                    {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-600 font-medium">{evt.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
