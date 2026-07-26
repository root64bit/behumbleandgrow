import React from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  applicationId: string;
}

export const CandidateApplicationSupportCard: React.FC<Props> = ({ applicationId }) => {
  return (
    <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-sm space-y-3 text-left">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-emerald-400" />
        <h3 className="text-sm font-extrabold">Need Assistance with this Dossier?</h3>
      </div>
      <p className="text-xs text-slate-300">
        Our talent operations team is available to answer questions regarding credential verification, interview schedules or relocation.
      </p>

      <div className="pt-1">
        <Link
          to={`/candidate/support?appRef=${encodeURIComponent(applicationId.slice(0, 8))}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-bold rounded-xl shadow-xs"
        >
          <span>Contact Candidate Support</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
