import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, ChevronRight, AlertCircle } from 'lucide-react';
import type { CandidateNextStep } from '../../types/candidate';

interface CandidateNextActionCardProps {
  step: CandidateNextStep | null;
}

export default function CandidateNextActionCard({ step }: CandidateNextActionCardProps) {
  if (!step) return null;

  const isUrgent = step.priority === 'urgent';
  const bgClass = isUrgent
    ? 'bg-[#7DF7B6] dark:bg-emerald-950/80 text-[#002111] dark:text-emerald-100 border border-[#006D44]/30'
    : 'bg-[#FFDEA9] dark:bg-amber-950/80 text-[#271900] dark:text-amber-100 border border-[#BA8503]/30';

  const iconBg = isUrgent
    ? 'bg-[#006D44]/15 text-[#005232] dark:bg-emerald-500/20 dark:text-emerald-300'
    : 'bg-[#BA8503]/15 text-[#5F4100] dark:bg-amber-500/20 dark:text-amber-300';

  return (
    <section className="space-y-3 text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-headline-md text-[#00122B] dark:text-white flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-[#006D44]" />
          <span>Priority Required Action</span>
        </h2>
        {step.estimatedMinutes && (
          <span className="text-xs font-semibold text-[#44474E] dark:text-slate-400">
            ~{step.estimatedMinutes} mins
          </span>
        )}
      </div>

      <Link
        to={step.destinationRoute}
        className={`p-4 rounded-xl flex items-center justify-between gap-4 transition-all duration-200 hover:shadow-md active:scale-[0.99] group ${bgClass}`}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`p-2.5 rounded-lg shrink-0 ${iconBg}`}>
            <CheckSquare className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold truncate">
              {step.title}
            </h3>
            <p className="text-xs opacity-90 line-clamp-2 mt-0.5">
              {step.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold shrink-0">
          <span className="hidden sm:inline">{step.actionLabel}</span>
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </section>
  );
}
