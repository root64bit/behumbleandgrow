import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Tag, AlertTriangle, ArrowRight, Building } from 'lucide-react';
import type { Application } from '../../../lib/supabase/types';
import { resolveCandidateEmployerDisplay } from '../../../lib/candidate/applicationStatus';
import { resolveCandidateNextAction } from '../../../lib/candidate/applicationNextAction';
import { CandidateApplicationStageProgress } from './CandidateApplicationStageProgress';
import { CandidateApplicationStatusBadge } from './CandidateApplicationStatusBadge';

interface Props {
  application: Application;
  onWithdrawClick?: (app: Application) => void;
}

export const CandidateApplicationCard: React.FC<Props> = ({ application, onWithdrawClick }) => {
  const jobTitle = (application as any).jobs?.title || 'UAE Vacancy';
  const location = (application as any).jobs?.location || 'Dubai, UAE';
  const refCode = `REF: ${application.id.slice(0, 8).toUpperCase()}`;
  const employerDisplay = resolveCandidateEmployerDisplay(application);
  const nextAction = resolveCandidateNextAction(application as any);

  const isUrgent = nextAction.priority === 'urgent';

  return (
    <div
      className={`bg-white border rounded-2xl shadow-sm overflow-hidden text-left transition-all hover:shadow-md ${
        isUrgent ? 'border-amber-300 ring-1 ring-amber-300' : 'border-slate-200'
      }`}
    >
      {/* Action Banner for Urgent Action Required */}
      {isUrgent && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between gap-2 text-xs text-amber-900 font-semibold">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{nextAction.description}</span>
          </div>
          <Link
            to={nextAction.route}
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] flex-shrink-0"
          >
            {nextAction.buttonText}
          </Link>
        </div>
      )}

      <div className="p-5 space-y-4">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-[#00122B] leading-snug">{jobTitle}</h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>{employerDisplay}</span>
            </div>
          </div>
          <CandidateApplicationStatusBadge status={application.status} />
        </div>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono">{refCode}</span>
          </div>
        </div>

        {/* Stage Progress Track */}
        <CandidateApplicationStageProgress stage={application.stage} />

        {/* Pilot Fee Notice */}
        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[11px] text-slate-500 flex items-center justify-between">
          <span>Application fee disabled during closed technical pilot.</span>
          <span className="font-bold text-[#006D44]">Fee Waived</span>
        </div>

        {/* Actions Footer */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100 gap-2">
          <div className="text-[11px] text-slate-400">
            Applied: {new Date(application.submitted_at).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2">
            {!['placed', 'withdrawn', 'rejected'].includes(application.status) && onWithdrawClick && (
              <button
                onClick={() => onWithdrawClick(application)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-red-700 font-semibold transition-colors"
              >
                Withdraw
              </button>
            )}

            <Link
              to={nextAction.route}
              className="inline-flex items-center gap-1 px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-bold rounded-xl shadow-xs transition-all"
            >
              <span>{nextAction.buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
