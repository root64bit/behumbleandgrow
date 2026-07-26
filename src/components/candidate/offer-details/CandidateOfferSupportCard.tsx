import React from 'react';
import { LifeBuoy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  offerReference?: string;
}

export const CandidateOfferSupportCard: React.FC<Props> = ({ offerReference }) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
          <LifeBuoy className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-extrabold text-[#00122B]">Need Clarification on Terms?</h4>
          <p className="text-xs text-slate-500">
            Submit a question regarding salary, housing, working hours, or visa requirements.
          </p>
        </div>
      </div>

      <Link
        to={`/candidate/support?ref=${encodeURIComponent(offerReference || '')}`}
        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shrink-0"
      >
        <span>Request Clarification</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};
