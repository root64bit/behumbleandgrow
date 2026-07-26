import React from 'react';
import { PlaneTakeoff, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CandidatePlacementEmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-sm">
      <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
        <PlaneTakeoff className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-extrabold text-slate-900">No placement process has started yet.</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          Placement and relocation progress will appear here after an eligible conditional offer has been accepted and an authorised placement case is created.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          to="/candidate/offers"
          className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-2"
        >
          <FileText className="w-4 h-4" />
          <span>View Conditional Offers</span>
        </Link>
        <Link
          to="/candidate/applications"
          className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2"
        >
          <span>View Applications</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>
      </div>
    </div>
  );
};
