import React from 'react';
import { Check, Clock, Calendar } from 'lucide-react';
import { PlacementTimelineEvent } from '../../../lib/candidate/placementTimeline';

interface Props {
  timeline: PlacementTimelineEvent[];
  currentStage: number;
}

export const CandidatePlacementTimeline: React.FC<Props> = ({ timeline, currentStage }) => {
  return (
    <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-left space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Placement Timeline & Milestones</h3>
          <p className="text-xs text-slate-500 mt-0.5">Sequential relocation milestone log</p>
        </div>
        <Calendar className="w-5 h-5 text-slate-400" />
      </div>

      <div className="relative space-y-6 before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {timeline.map((event) => {
          const isCompleted = event.status === 'completed' || event.stepNumber < currentStage;
          const isCurrent = event.status === 'in_progress' || event.stepNumber === currentStage;

          return (
            <div key={event.id || event.stepNumber} className="relative flex items-start space-x-4 pl-0">
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                    : isCurrent
                    ? 'bg-purple-600 text-white ring-4 ring-purple-100 animate-pulse'
                    : 'bg-slate-100 border border-slate-300 text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : event.stepNumber}
              </div>

              <div className="flex-1 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4
                    className={`text-sm font-bold ${
                      isCompleted ? 'text-emerald-950' : isCurrent ? 'text-purple-900' : 'text-slate-500'
                    }`}
                  >
                    {event.title}
                  </h4>

                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold uppercase w-fit ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : isCurrent
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Upcoming'}
                  </span>
                </div>

                {event.dateDisplay && (
                  <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{event.dateDisplay}</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
