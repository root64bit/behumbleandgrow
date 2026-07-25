import React from 'react';
import { Briefcase, ArrowUpRight, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  jobId: string;
  jobTitle: string;
  applicationId: string;
  employerDisplayName: string;
}

export const CandidateInterviewJobContext: React.FC<Props> = ({
  jobTitle,
  applicationId,
  employerDisplayName,
}) => {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3 text-left">
      <h4 className="text-xs font-extrabold text-[#00122B] uppercase tracking-wider">
        Application & Role Context
      </h4>

      <div className="flex items-center justify-between text-xs">
        <div>
          <p className="font-bold text-[#00122B]">{jobTitle}</p>
          <p className="text-slate-500 font-medium">{employerDisplayName}</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/candidate/applications/${applicationId}`}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg flex items-center gap-1 transition-all"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Application</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
