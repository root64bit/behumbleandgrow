import React from 'react';
import { Gift, Heart, Calendar, Plane } from 'lucide-react';

interface Props {
  benefitsSummary: string[];
  medicalTerms?: string;
  annualLeave?: string;
  flightBenefit?: string;
}

export const CandidateOfferBenefitsCard: React.FC<Props> = ({
  benefitsSummary,
  medicalTerms,
  annualLeave,
  flightBenefit,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 text-left">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
          <Gift className="w-4 h-4" />
        </div>
        <h3 className="text-base font-extrabold text-[#00122B]">Benefits Package</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-rose-900">
            <Heart className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>Medical Insurance</span>
          </div>
          <p className="text-[11px] text-rose-800">
            {medicalTerms || 'Comprehensive UAE Medical Insurance Coverage'}
          </p>
        </div>

        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Annual Paid Leave</span>
          </div>
          <p className="text-[11px] text-emerald-800">
            {annualLeave || '30 Calendar Days Paid Leave per year'}
          </p>
        </div>

        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-blue-900">
            <Plane className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Annual Flight Ticket</span>
          </div>
          <p className="text-[11px] text-blue-800">
            {flightBenefit || 'Annual Flight Ticket Allowance to Home Country'}
          </p>
        </div>
      </div>
    </div>
  );
};
