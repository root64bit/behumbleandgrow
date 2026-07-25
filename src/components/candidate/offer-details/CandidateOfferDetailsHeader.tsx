import React from 'react';
import { ArrowLeft, Award, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  reference?: string;
}

export const CandidateOfferDetailsHeader: React.FC<Props> = ({ reference }) => {
  return (
    <div className="space-y-3 text-left">
      <Link
        to="/candidate/offers"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#006D44] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Conditional Offers</span>
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Candidate Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00122B] tracking-tight">
            Conditional Offer Details
          </h1>
          {reference && (
            <p className="text-xs text-slate-500 font-mono font-bold">
              Ref: {reference}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/candidate/applications"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Briefcase className="w-4 h-4 text-slate-500" />
            <span>Applications</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
