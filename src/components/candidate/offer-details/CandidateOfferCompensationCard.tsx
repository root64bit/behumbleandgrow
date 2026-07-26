import React from 'react';
import { DollarSign, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  salaryAmount: number;
  currency: string;
  frequency?: string;
  accommodationTerms?: string;
  transportTerms?: string;
}

export const CandidateOfferCompensationCard: React.FC<Props> = ({
  salaryAmount,
  currency,
  frequency = 'month',
  accommodationTerms,
  transportTerms,
}) => {
  const formattedSalary = salaryAmount ? salaryAmount.toLocaleString('en-US') : '0';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 text-left">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#006D44]">
          <DollarSign className="w-4 h-4" />
        </div>
        <h3 className="text-base font-extrabold text-[#00122B]">Compensation Breakdown</h3>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-slate-500 font-bold uppercase">Base Monthly Salary</p>
        <p className="text-2xl sm:text-3xl font-black text-slate-900">
          {currency} {formattedSalary} <span className="text-xs font-semibold text-slate-500">/ {frequency}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Accommodation Allowance</span>
          </div>
          <p className="text-[11px] text-slate-600">
            {accommodationTerms || 'Included per employment agreement'}
          </p>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Transport Allowance</span>
          </div>
          <p className="text-[11px] text-slate-600">
            {transportTerms || 'Included per employment agreement'}
          </p>
        </div>
      </div>
    </div>
  );
};
