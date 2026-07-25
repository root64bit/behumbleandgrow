import React from 'react';
import { Check, Hourglass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CandidateJourneyStep } from '../../types/candidate';

interface CandidateJourneyTimelineProps {
  steps: CandidateJourneyStep[];
}

export default function CandidateJourneyTimeline({ steps }: CandidateJourneyTimelineProps) {
  return (
    <section className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-headline-md text-[#00122B] dark:text-white">
          Application Journey
        </h2>
        <span className="text-xs font-semibold text-[#006D44] dark:text-emerald-400">
          10 UAE Stages
        </span>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-[#C4C6CF]/60 dark:border-slate-800 rounded-xl p-5 shadow-[0px_4px_12px_rgba(15,39,71,0.05)]">
        <div className="space-y-6 relative">
          {/* Vertical Connector Line */}
          <div 
            className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-[#C4C6CF]/50 dark:bg-slate-800" 
            aria-hidden="true" 
          />

          {steps.map((step) => {
            const isCompleted = step.isCompleted;
            const isCurrent = step.isCurrent;

            return (
              <div 
                key={step.stageNumber} 
                className="relative flex items-start gap-4"
                aria-current={isCurrent ? 'step' : undefined}
              >
                {/* Node Indicator */}
                <div className="z-10 shrink-0">
                  {isCompleted ? (
                    <div className="w-7 h-7 rounded-full bg-[#006D44] flex items-center justify-center shadow-xs">
                      <Check className="w-4 h-4 text-white stroke-[3]" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-7 h-7 rounded-full bg-[#7DF7B6] border-2 border-[#006D44] flex items-center justify-center shadow-xs">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#006D44] animate-pulse" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#E3E2E5] dark:bg-slate-800 border border-[#C4C6CF] dark:border-slate-700 flex items-center justify-center">
                      <Hourglass className="w-3.5 h-3.5 text-[#74777F] dark:text-slate-500" />
                    </div>
                  )}
                </div>

                {/* Stage Info */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h3 className={`text-sm font-label-md ${
                      isCurrent 
                        ? 'text-[#006D44] dark:text-emerald-400 font-bold' 
                        : isCompleted 
                          ? 'text-[#00122B] dark:text-slate-200 font-semibold' 
                          : 'text-[#74777F] dark:text-slate-500 font-medium'
                    }`}>
                      Stage {step.stageNumber}: {step.title}
                    </h3>

                    {step.timestamp && (
                      <span className="text-[11px] text-[#44474E] dark:text-slate-400">
                        {step.timestamp}
                      </span>
                    )}
                  </div>

                  {isCurrent && (
                    <div className="mt-2">
                      <p className="text-xs text-[#44474E] dark:text-slate-300">
                        Currently active stage. Please check requirements and respond promptly.
                      </p>
                      <Link
                        to="/candidate/applications"
                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00122B] hover:bg-[#0F2747] text-white text-xs font-semibold rounded-full transition-colors active:scale-95 shadow-xs"
                      >
                        <span>View Active Application</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-[#C4C6CF]/40 dark:border-slate-800 text-[11px] text-[#74777F] dark:text-slate-500 leading-relaxed">
          * Conditional offers & placements remain subject to employer confirmation, required documentation, work-permit approval and UAE visa approval.
        </div>
      </div>
    </section>
  );
}
