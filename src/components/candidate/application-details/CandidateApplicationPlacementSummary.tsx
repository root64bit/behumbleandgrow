import React from 'react';
import { Plane, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  placement: any | null;
}

export const CandidateApplicationPlacementSummary: React.FC<Props> = ({ placement }) => {
  if (!placement) return null;

  return (
    <div className="p-5 bg-white border border-blue-200 rounded-2xl shadow-sm space-y-3 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-extrabold text-[#00122B] uppercase tracking-wider">
            Placement & Relocation
          </h3>
        </div>
        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold rounded-full">
          {placement.milestone || 'In Progress'}
        </span>
      </div>

      <p className="text-xs text-slate-600">
        Milestone: <span className="font-bold text-slate-900">{placement.milestone || 'Visa Processing'}</span>
      </p>

      <div className="pt-2 border-t border-blue-100 flex justify-end">
        <Link
          to="/candidate/placement"
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs"
        >
          <span>View Placement Milestones</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
