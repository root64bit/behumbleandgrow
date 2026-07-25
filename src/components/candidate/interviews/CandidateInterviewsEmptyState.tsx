import React from 'react';
import { Video, ArrowRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CandidateInterviewsEmptyState: React.FC = () => {
  return (
    <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-xs text-center space-y-4 text-left">
      <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-500">
        <Video className="w-6 h-6 text-slate-400" />
      </div>

      <div className="space-y-1 text-center">
        <h3 className="text-base font-extrabold text-[#00122B]">No Interviews Scheduled Yet</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Interview invitations will appear here when an authorized UAE employer or recruitment coordinator schedules one.
        </p>
      </div>

      <div className="pt-2 flex justify-center gap-2">
        <Link
          to="/candidate/applications"
          className="px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
        >
          <span>View Applications</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          to="/candidate/jobs"
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Explore Jobs</span>
        </Link>
      </div>
    </div>
  );
};
