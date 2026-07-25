import React, { useState } from 'react';
import { Award, CheckCircle2, FileText, Download, ShieldCheck, DollarSign, Building, Plane, Heart, AlertCircle } from 'lucide-react';
import { CandidateService } from '../../services/candidate.service';

export default function CandidateOffersPage() {
  const offer = CandidateService.getConditionalOffer();
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-left">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold mb-2">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span>Official Conditional Employment Offer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Conditional Job Offers
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Review formal employment terms, salary breakdowns, and benefits issued by UAE employers.
        </p>
      </div>

      {!offer ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
          <Award className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Pending Conditional Offers</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Once you successfully complete employer video interviews, formal conditional offers will be issued to your vault here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Ref: {offer.reference}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">{offer.position}</h2>
              <p className="text-xs font-semibold text-slate-600">{offer.employerName}</p>
            </div>

            <div className="sm:text-right">
              <span className={`px-3 py-1 rounded-lg text-xs font-extrabold uppercase ${
                accepted ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                declined ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {accepted ? 'Offer Accepted' : declined ? 'Offer Declined' : `Valid Until: ${offer.expiryDate}`}
              </span>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-700">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Base Salary</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900">{offer.salaryText}</div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-700">
                <Building className="w-4 h-4 text-blue-600" />
                <span>Housing</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900">Provided by Employer</div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-purple-700">
                <Plane className="w-4 h-4 text-purple-600" />
                <span>Flight Ticket</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900">Annual Return Ticket</div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-700">
                <Heart className="w-4 h-4 text-rose-600" />
                <span>Health Insurance</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900">UAE MOHRE Compliant</div>
            </div>
          </div>

          {/* Detailed Terms */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Employer Terms Summary</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {offer.benefitsText}. This offer is subject to successful UAE Ministry of Human Resources & Emiratisation (MOHRE) work permit clearance and pre-employment medical fitness checks.
            </p>
          </div>

          {/* Offer Acceptance Actions */}
          {!accepted && !declined ? (
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setAccepted(true)}
                className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Accept Conditional Employment Offer</span>
              </button>

              <button
                onClick={() => setDeclined(true)}
                className="py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Decline Offer
              </button>
            </div>
          ) : accepted ? (
            <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Congratulations! You have accepted the conditional offer. Your file is now proceeding to UAE MOHRE Work Permit processing.</span>
            </div>
          ) : (
            <div className="p-4 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-700 font-semibold">
              You have declined this offer. Your candidate profile remains active for other recommended opportunities.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
