import React from 'react';
import { DollarSign } from 'lucide-react';

interface Props {
  amount: number;
  currency: string;
  frequency?: string;
}

export const CandidateOfferSalarySummary: React.FC<Props> = ({ amount, currency, frequency = 'month' }) => {
  const formattedAmount = amount ? amount.toLocaleString('en-US') : '0';

  return (
    <div className="flex items-center gap-1.5 text-left">
      <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
        <DollarSign className="w-4 h-4" />
      </div>
      <div>
        <p className="text-[10px] text-slate-500 font-bold uppercase">Monthly Salary</p>
        <p className="text-sm font-extrabold text-slate-900">
          {currency} {formattedAmount} <span className="text-[11px] font-normal text-slate-500">/ {frequency}</span>
        </p>
      </div>
    </div>
  );
};
