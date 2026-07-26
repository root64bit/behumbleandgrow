import React from 'react';
import { CheckCircle2, ArrowRight, Briefcase, FileCheck, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  action: 'accepted' | 'declined';
}

export const CandidateOfferDecisionSuccess: React.FC<Props> = ({ action }) => {
  const isAccepted = action === 'accepted';

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm max-w-lg mx-auto text-center space-y-5 text-left my-8">
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto ${
          isAccepted ? 'bg-emerald-50 text-[#006D44] border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
        }`}
      >
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-1 text-center">
        <h3 className="text-xl font-extrabold text-[#00122B]">
          {isAccepted ? 'Conditional Offer Accepted' : 'Offer Decline Submitted'}
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
          {isAccepted
            ? 'Your decision has been recorded. Our Operations team will guide you through document verification and visa clearance.'
            : 'Your decision has been submitted. Thank you for notifying us.'}
        </p>
      </div>

      <div className="pt-3 flex flex-wrap justify-center gap-2">
        {isAccepted ? (
          <>
            <Link
              to="/candidate/placement"
              className="px-4 py-2.5 bg-[#006D44] hover:bg-[#005232] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
            >
              <ArrowRight className="w-4 h-4" />
              <span>View Placement Steps</span>
            </Link>
            <Link
              to="/candidate/documents"
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <FileCheck className="w-4 h-4" />
              <span>Review Documents</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/candidate/offers"
              className="px-4 py-2.5 bg-[#006D44] hover:bg-[#005232] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Briefcase className="w-4 h-4" />
              <span>Return to Offers</span>
            </Link>
            <Link
              to="/candidate/support"
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <LifeBuoy className="w-4 h-4" />
              <span>Contact Support</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
