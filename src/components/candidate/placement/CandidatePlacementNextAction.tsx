import React, { useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PlacementCandidateAction } from '../../../lib/candidate/placementNextAction';
import { resolveDeadlineDisplay } from '../../../lib/candidate/placementDeadline';
import { CandidatePlacementAcknowledgementDialog } from './CandidatePlacementAcknowledgementDialog';

interface Props {
  action: PlacementCandidateAction | null;
  onComplete: (actionId: string, expectedVersion: number) => Promise<void>;
}

export const CandidatePlacementNextAction: React.FC<Props> = ({ action, onComplete }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!action) {
    return (
      <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 text-left flex items-center space-x-3 text-emerald-900 text-xs">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        <div>
          <h4 className="font-bold text-slate-900 text-sm">No Action Required</h4>
          <p className="text-slate-600 mt-0.5">Your placement dossier is fully up to date. We will notify you when next steps require your action.</p>
        </div>
      </div>
    );
  }

  const deadlineInfo = resolveDeadlineDisplay(action.deadline);

  return (
    <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 text-left space-y-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800">Action Required</span>
            <h3 className="text-base font-bold text-slate-900">{action.title}</h3>
            <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">{action.description}</p>
          </div>
        </div>

        {action.deadline && (
          <span
            className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase shrink-0 ${
              deadlineInfo.isOverdue ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-900'
            }`}
          >
            {deadlineInfo.label}
          </span>
        )}
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={() => setDialogOpen(true)}
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95"
        >
          <span>Complete Action</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {dialogOpen && (
        <CandidatePlacementAcknowledgementDialog
          action={action}
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onConfirm={async () => {
            await onComplete(action.id, action.version);
            setDialogOpen(false);
          }}
        />
      )}
    </div>
  );
};
