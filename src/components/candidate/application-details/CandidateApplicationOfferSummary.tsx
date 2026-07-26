import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  offer: any | null;
}

export const CandidateApplicationOfferSummary: React.FC<Props> = ({ offer }) => {
  if (!offer) return null;

  const targetRoute = `/candidate/offers/${offer.id || ''}`;

  return (
    <div className="p-5 bg-white border border-emerald-200 rounded-2xl shadow-sm space-y-3 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gift className="w-4 h-4 text-[#006D44]" />
          <h3 className="text-xs font-extrabold text-[#00122B] uppercase tracking-wider">
            Conditional Offer
          </h3>
        </div>
        <span className="px-2.5 py-0.5 bg-emerald-50 text-[#006D44] border border-emerald-200 text-[11px] font-bold rounded-full">
          {offer.status || 'Issued'}
        </span>
      </div>

      <div className="text-xs space-y-1">
        {offer.salary_offered && (
          <p className="font-bold text-slate-900">
            Offered Salary: {offer.salary_offered} {offer.currency || 'AED'} / month
          </p>
        )}
        <p className="text-slate-500">
          Conditional offers remain subject to employer confirmation, required documentation, work-permit approval and visa approval.
        </p>
      </div>

      <div className="pt-2 border-t border-emerald-100 flex justify-end">
        <Link
          to={targetRoute}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-bold rounded-xl shadow-xs"
        >
          <span>Respond to Offer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
