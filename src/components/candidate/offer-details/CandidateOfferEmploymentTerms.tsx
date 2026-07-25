import React from 'react';
import { FileText, Shield, Clock, CalendarDays } from 'lucide-react';

interface Props {
  contractType?: string;
  probationPeriod?: string;
  workingHours?: string;
  overtimeTerms?: string;
}

export const CandidateOfferEmploymentTerms: React.FC<Props> = ({
  contractType = 'Full-time Unlimited Contract',
  probationPeriod = '6 Months',
  workingHours = '40 Hours / Week',
  overtimeTerms = 'As per UAE Labour Law',
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 text-left">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
          <FileText className="w-4 h-4" />
        </div>
        <h3 className="text-base font-extrabold text-[#00122B]">Contractual & Employment Terms</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <p className="text-[10px] text-slate-500 font-bold uppercase">Contract Type</p>
          <p className="font-bold text-slate-900 mt-0.5">{contractType}</p>
        </div>

        <div>
          <p className="text-[10px] text-slate-500 font-bold uppercase">Probation Period</p>
          <p className="font-bold text-slate-900 mt-0.5">{probationPeriod}</p>
        </div>

        <div>
          <p className="text-[10px] text-slate-500 font-bold uppercase">Working Hours</p>
          <p className="font-bold text-slate-900 mt-0.5">{workingHours}</p>
        </div>

        <div>
          <p className="text-[10px] text-slate-500 font-bold uppercase">Overtime Terms</p>
          <p className="font-bold text-slate-900 mt-0.5">{overtimeTerms}</p>
        </div>
      </div>
    </div>
  );
};
