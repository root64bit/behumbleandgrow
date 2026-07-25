import React from 'react';
import { Link } from 'react-router-dom';
import { Award, AlertCircle, ChevronRight } from 'lucide-react';
import type { CandidateConditionalOffer } from '../../types/candidate';

interface CandidateOfferSummaryProps {
  offer: CandidateConditionalOffer | null;
}

export default function CandidateOfferSummary({ offer }: CandidateOfferSummaryProps) {
  if (!offer) return null;

  return (
    <section className="bg-white dark:bg-slate-900 border-2 border-emerald-600/40 rounded-xl p-5 shadow-[0px_4px_12px_rgba(15,39,71,0.05)] text-left space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-100 text-[#006D44] dark:bg-emerald-950 dark:text-emerald-300">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#006D44] dark:text-emerald-400">
              Conditional Job Offer Received
            </span>
            <h2 className="text-base font-bold font-headline-md text-[#00122B] dark:text-white">
              {offer.position}
            </h2>
          </div>
        </div>

        <span className="text-xs font-mono text-[#74777F] dark:text-slate-400 font-semibold">
          {offer.reference}
        </span>
      </div>

      <div className="bg-[#FAF9FC] dark:bg-slate-800 p-3.5 rounded-xl space-y-2 border border-[#C4C6CF]/30 dark:border-slate-700">
        <div className="flex justify-between items-center text-xs">
          <span className="text-[#44474E] dark:text-slate-400">Employer:</span>
          <span className="font-bold text-[#00122B] dark:text-slate-100">{offer.employerName}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-[#44474E] dark:text-slate-400">Monthly Compensation:</span>
          <span className="font-bold text-[#006D44] dark:text-emerald-400">{offer.salaryText}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-[#44474E] dark:text-slate-400">Offer Expiry:</span>
          <span className="font-bold text-amber-700 dark:text-amber-400">{offer.expiryDate}</span>
        </div>
        <p className="text-[11px] text-[#74777F] dark:text-slate-400 pt-1 border-t border-[#C4C6CF]/20">
          Benefits: {offer.benefitsText}
        </p>
      </div>

      {/* Mandatory Legal Warning Statement */}
      <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-lg text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-snug">
          Conditional offers remain subject to employer confirmation, required documentation, work-permit approval and visa approval.
        </p>
      </div>

      <div className="pt-1">
        <Link
          to={`/candidate/offers/${offer.id}`}
          className="w-full py-2.5 px-4 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-xs"
        >
          <span>Review & Respond to Offer</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
