import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { CandidateOfferDetails } from '../../../services/candidate-offer-details.service';
import { CandidateOfferStatusBadge } from '../offers/CandidateOfferStatusBadge';
import { CandidateOfferDecisionBadge } from '../offers/CandidateOfferDecisionBadge';
import { CandidateOfferEmployerDisplay } from '../offers/CandidateOfferEmployerDisplay';
import { calculateOfferExpiry } from '../../../lib/candidate/offerExpiry';

interface Props {
  offer: CandidateOfferDetails;
}

export const CandidateOfferOverview: React.FC<Props> = ({ offer }) => {
  const expiry = calculateOfferExpiry(offer.expires_at);

  return (
    <div className="bg-[#00122B] text-white rounded-3xl p-6 shadow-md space-y-6 text-left relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 backdrop-blur-md rounded-full text-xs font-bold text-emerald-300">
          <span>Conditional Employment Offer</span>
        </div>

        <div className="flex items-center gap-2">
          <CandidateOfferStatusBadge status={offer.status} />
          {offer.candidate_decision !== 'pending' && (
            <CandidateOfferDecisionBadge decision={offer.candidate_decision} />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
          {offer.job_title}
        </h2>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <CandidateOfferEmployerDisplay
            displayName={offer.employer_display_name}
            authorised={offer.employer_disclosure_authorised}
          />
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{offer.job_location}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Offer Reference</p>
          <p className="font-mono font-bold text-white mt-0.5">{offer.reference}</p>
        </div>

        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Response Deadline</p>
          <div className="flex items-center gap-1 mt-0.5 font-bold text-amber-300">
            <Clock className="w-3.5 h-3.5" />
            <span>{expiry.formattedDate}</span>
          </div>
        </div>

        {offer.proposed_start_date && (
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Proposed Start Date</p>
            <div className="flex items-center gap-1 mt-0.5 font-bold text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>{new Date(offer.proposed_start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
