import React from 'react';
import { CandidateConditionalOffer } from '../../types/candidate';
import { Award, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ConditionalOfferCardProps {
  offer: CandidateConditionalOffer;
}

export default function ConditionalOfferCard({ offer }: ConditionalOfferCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Conditional Job Offer</h2>
            <p className="text-xs text-slate-500">Formal conditional offer issued by verified UAE employer.</p>
          </div>
        </div>

        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
          Ready for Review
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">{offer.position}</h3>
            <p className="text-xs text-slate-700 font-semibold">{offer.employerName}</p>
          </div>
          <span className="text-xs font-black text-emerald-900">{offer.salaryText}</span>
        </div>

        <p className="text-xs text-slate-600">{offer.benefitsText}</p>

        <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-slate-500">
          <span>Ref: <span className="font-mono font-bold text-slate-800">{offer.reference}</span></span>
          <span className="font-bold text-rose-700">Expires: {offer.expiryDate}</span>
        </div>
      </div>

      <div className="pt-1 flex items-center justify-between">
        <p className="text-[10px] text-slate-400 max-w-md">
          Employment remains conditional upon document verification, employer confirmation, and UAE work permit approval.
        </p>
        <Link to="/candidate/offers" className="btn btn-primary text-xs py-2 px-4 font-bold shadow-xs shrink-0">
          <span>Review Offer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
