import React from 'react';
import { PlaneTakeoff, ChevronRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CandidatePlacement } from '../../../services/candidate-placement.service';

interface Props {
  placement: CandidatePlacement;
}

export const CandidatePlacementHeader: React.FC<Props> = ({ placement }) => {
  return (
    <div className="space-y-3 text-left">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
        <Link to="/candidate/dashboard" className="hover:text-slate-900 transition-colors">
          Workspace
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold">Placement & Relocation</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-full text-xs font-bold mb-1.5">
            <PlaneTakeoff className="w-3.5 h-3.5 text-emerald-700" />
            <span>Ref: {placement.placementReference}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Placement & Relocation Status
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {placement.jobTitle} • <span className="font-bold text-slate-800">{placement.employerDisplayName}</span> ({placement.location})
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to={`/candidate/offers/${placement.offerId}`}
            className="inline-flex items-center space-x-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>View Offer</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
