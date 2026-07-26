import React from 'react';
import { CandidateNextStep } from '../../types/candidate';
import { Clock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NextStepCardProps {
  step: CandidateNextStep;
}

export default function NextStepCard({ step }: NextStepCardProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white rounded-3xl p-5 sm:p-6 border border-emerald-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shadow-sm shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
              PRIORITY REQUIRED ACTION
            </span>
            <h2 className="text-base font-extrabold text-slate-900 mt-1">{step.title}</h2>
          </div>
        </div>

        <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0 bg-white px-3 py-1 rounded-full border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>~{step.estimatedMinutes} mins</span>
        </span>
      </div>

      <p className="text-xs text-slate-700 leading-relaxed">
        {step.description}
      </p>

      <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-semibold">Step 7 of 10 • Video Interview Phase</span>
        <Link
          to={step.destinationRoute}
          className="btn btn-primary text-xs px-5 py-2.5 font-bold shadow-md"
        >
          <span>{step.actionLabel}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
