import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight, FileText } from 'lucide-react';
import { CandidateOfferListItem } from '../../../services/candidate-offers.service';
import { CandidateOfferStatusBadge } from './CandidateOfferStatusBadge';
import { CandidateOfferDecisionBadge } from './CandidateOfferDecisionBadge';
import { CandidateOfferSalarySummary } from './CandidateOfferSalarySummary';
import { CandidateOfferBenefitsSummary } from './CandidateOfferBenefitsSummary';
import { CandidateOfferExpiryNotice } from './CandidateOfferExpiryNotice';
import { CandidateOfferEmployerDisplay } from './CandidateOfferEmployerDisplay';
import { CandidateOfferReplacementNotice } from './CandidateOfferReplacementNotice';

interface Props {
  offer: CandidateOfferListItem;
}

export const CandidateOfferCard: React.FC<Props> = ({ offer }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-[#006D44]/40 hover:shadow-md transition-all space-y-4 text-left">
      {/* Header Row: Ref & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
            {offer.reference}
          </span>
          {offer.application_reference && (
            <span className="text-[10px] text-slate-400">
              App: {offer.application_reference}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <CandidateOfferStatusBadge status={offer.status} />
          {offer.candidate_decision !== 'pending' && (
            <CandidateOfferDecisionBadge decision={offer.candidate_decision} />
          )}
        </div>
      </div>

      {/* Main Position & Employer Info */}
      <div className="space-y-1">
        <h3 className="text-base font-extrabold text-[#00122B] hover:text-[#006D44] transition-colors">
          {offer.job_title}
        </h3>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
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

      {/* Superseded Notice */}
      {offer.is_superseded && <CandidateOfferReplacementNotice />}

      {/* Salary & Benefits Grid */}
      <div className="pt-2 border-t border-slate-100 space-y-3">
        <CandidateOfferSalarySummary
          amount={offer.salary_amount}
          currency={offer.currency}
          frequency={offer.salary_frequency}
        />

        <CandidateOfferBenefitsSummary benefits={offer.benefits_summary} />
      </div>

      {/* Footer & CTA */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
        <CandidateOfferExpiryNotice expiresAt={offer.expires_at} />

        <Link
          to={`/candidate/offers/${offer.id}`}
          className="px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1 transition-all"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View Offer</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
