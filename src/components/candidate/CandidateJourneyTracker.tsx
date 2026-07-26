import React from 'react';
import { CandidateJourneyStep } from '../../types/candidate';
import { CheckCircle2, Clock, AlertCircle, HelpCircle } from 'lucide-react';

interface CandidateJourneyTrackerProps {
  steps: CandidateJourneyStep[];
}

export default function CandidateJourneyTracker({ steps }: CandidateJourneyTrackerProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Your UAE Career Journey</h2>
          <p className="text-xs text-slate-500">Transparent 10-stage progress tracking from candidate registration to UAE placement.</p>
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
          Stage 7 of 10 Active
        </span>
      </div>

      {/* Desktop Horizontal / Mobile Vertical Timeline */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
        {steps.map((step) => {
          const isDone = step.isCompleted;
          const isCurr = step.isCurrent;

          return (
            <div 
              key={step.stageNumber}
              className={`p-3 rounded-2xl border transition-all text-left space-y-1.5 flex flex-col justify-between ${
                isCurr 
                  ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20 shadow-xs' 
                  : isDone 
                  ? 'bg-slate-50 border-slate-200' 
                  : 'bg-white border-slate-100 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                  isCurr ? 'bg-emerald-600 text-white' : isDone ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {step.stageNumber}
                </span>

                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {isCurr && <Clock className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />}
              </div>

              <h3 className={`text-[11px] font-bold leading-tight ${
                isCurr ? 'text-emerald-950 font-extrabold' : isDone ? 'text-slate-900' : 'text-slate-500'
              }`}>
                {step.title}
              </h3>

              {step.timestamp && (
                <span className="text-[9px] text-slate-400 block">{step.timestamp}</span>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-100">
        Note: Career progress depends on candidate qualifications, document verification, employer selection, and UAE government visa approvals.
      </p>
    </div>
  );
}
