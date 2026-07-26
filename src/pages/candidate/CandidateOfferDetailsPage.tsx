import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, ShieldCheck, FileCheck } from 'lucide-react';
import { useCandidateOfferDetails } from '../../hooks/candidate/useCandidateOfferDetails';
import { CandidateOfferDetailsHeader } from '../../components/candidate/offer-details/CandidateOfferDetailsHeader';
import { CandidateOfferOverview } from '../../components/candidate/offer-details/CandidateOfferOverview';
import { CandidateOfferCompensationCard } from '../../components/candidate/offer-details/CandidateOfferCompensationCard';
import { CandidateOfferBenefitsCard } from '../../components/candidate/offer-details/CandidateOfferBenefitsCard';
import { CandidateOfferEmploymentTerms } from '../../components/candidate/offer-details/CandidateOfferEmploymentTerms';
import { CandidateOfferConditionsCard } from '../../components/candidate/offer-details/CandidateOfferConditionsCard';
import { CandidateOfferDocumentCard } from '../../components/candidate/offer-details/CandidateOfferDocumentCard';
import { CandidateOfferDocumentPreview } from '../../components/candidate/offer-details/CandidateOfferDocumentPreview';
import { CandidateOfferAcceptDialog } from '../../components/candidate/offer-details/CandidateOfferAcceptDialog';
import { CandidateOfferDeclineDialog } from '../../components/candidate/offer-details/CandidateOfferDeclineDialog';
import { CandidateOfferDecisionSuccess } from '../../components/candidate/offer-details/CandidateOfferDecisionSuccess';
import { CandidateOfferDecisionHistory } from '../../components/candidate/offer-details/CandidateOfferDecisionHistory';
import { CandidateOfferSupportCard } from '../../components/candidate/offer-details/CandidateOfferSupportCard';
import { CandidateOfferComplianceNotice } from '../../components/candidate/offers/CandidateOfferComplianceNotice';
import { CandidateOfferDetailsSkeleton } from '../../components/candidate/offer-details/CandidateOfferDetailsSkeleton';
import { CandidateOfferDetailsNotFound } from '../../components/candidate/offer-details/CandidateOfferDetailsNotFound';
import { CandidateOfferDetailsErrorState } from '../../components/candidate/offer-details/CandidateOfferDetailsErrorState';
import { calculateOfferExpiry } from '../../lib/candidate/offerExpiry';

export default function CandidateOfferDetailsPage() {
  const { offerId } = useParams<{ offerId: string }>();
  const {
    offerState,
    historyState,
    documentState,
    acceptanceState,
    declineState,
    requestDocument,
    clearDocumentPreview,
    submitAcceptance,
    submitDecline,
    refetch,
  } = useCandidateOfferDetails(offerId || '');

  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);

  if (offerState.status === 'loading') {
    return <CandidateOfferDetailsSkeleton />;
  }

  if (offerState.status === 'not_found') {
    return <CandidateOfferDetailsNotFound />;
  }

  if (offerState.status === 'error') {
    return <CandidateOfferDetailsErrorState message={offerState.message} onRetry={refetch} />;
  }

  const offer = offerState.data;
  const historyEvents = historyState.status === 'success' ? historyState.data : [];
  const expiry = calculateOfferExpiry(offer.expires_at);

  const isAlreadyDecided = offer.candidate_decision === 'accepted' || offer.candidate_decision === 'declined';
  const isActionable = !isAlreadyDecided && !expiry.isExpired && !offer.is_superseded && offer.status !== 'withdrawn';

  if (acceptanceState.status === 'success') {
    return <CandidateOfferDecisionSuccess action="accepted" />;
  }

  if (declineState.status === 'success') {
    return <CandidateOfferDecisionSuccess action="declined" />;
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-24 text-left">
      {/* Header */}
      <CandidateOfferDetailsHeader reference={offer.reference} />

      {/* Overview Hero */}
      <CandidateOfferOverview offer={offer} />

      {/* Compliance Disclaimer */}
      <CandidateOfferComplianceNotice />

      {/* Conditions Card */}
      <CandidateOfferConditionsCard />

      {/* Compensation Card */}
      <CandidateOfferCompensationCard
        salaryAmount={offer.salary_amount}
        currency={offer.currency}
        frequency={offer.salary_frequency}
        accommodationTerms={offer.accommodation_terms}
        transportTerms={offer.transport_terms}
      />

      {/* Benefits Card */}
      <CandidateOfferBenefitsCard
        benefitsSummary={offer.benefits_summary}
        medicalTerms={offer.medical_insurance_terms}
        annualLeave={offer.annual_leave}
        flightBenefit={offer.flight_benefit_terms}
      />

      {/* Employment Terms Card */}
      <CandidateOfferEmploymentTerms
        contractType={offer.contract_type}
        probationPeriod={offer.probation_period}
        workingHours={offer.working_hours}
        overtimeTerms={offer.overtime_terms}
      />

      {/* Document Access Card */}
      <CandidateOfferDocumentCard
        documentAvailable={offer.document_available}
        documentStatus={documentState.status}
        onRequestAccess={requestDocument}
      />

      {/* Activity History */}
      <CandidateOfferDecisionHistory events={historyEvents} />

      {/* Support Card */}
      <CandidateOfferSupportCard offerReference={offer.reference} />

      {/* Sticky Bottom Action Bar (if actionable) */}
      {isActionable && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-lg">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Decision Deadline</p>
              <p className="text-xs font-extrabold text-amber-800">{expiry.label}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDeclineDialog(true)}
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition-colors"
              >
                Decline Offer
              </button>
              <button
                onClick={() => setShowAcceptDialog(true)}
                className="px-5 py-2.5 bg-[#006D44] hover:bg-[#005232] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Accept Offer</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {documentState.status === 'available' && documentState.url && (
        <CandidateOfferDocumentPreview url={documentState.url} onClose={clearDocumentPreview} />
      )}

      {/* Accept Dialog */}
      {showAcceptDialog && (
        <CandidateOfferAcceptDialog
          offer={offer}
          submitting={acceptanceState.status === 'submitting'}
          onConfirm={(payload) => submitAcceptance(payload)}
          onClose={() => setShowAcceptDialog(false)}
        />
      )}

      {/* Decline Dialog */}
      {showDeclineDialog && (
        <CandidateOfferDeclineDialog
          offer={offer}
          submitting={declineState.status === 'submitting'}
          onConfirm={(payload) => submitDecline(payload)}
          onClose={() => setShowDeclineDialog(false)}
        />
      )}
    </div>
  );
}
