import React from 'react';
import { Award, Briefcase, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CandidateOffersEmptyState: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 max-w-lg mx-auto my-8 text-left">
      <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-[#006D44]">
        <Award className="w-7 h-7" />
      </div>

      <div className="space-y-1 text-center">
        <h3 className="text-base font-extrabold text-[#00122B]">No Conditional Offers Yet</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
          Conditional offers will appear here after an authorised Employer completes the relevant recruitment stage and issues official terms.
        </p>
      </div>

      <div className="pt-2 flex justify-center gap-2">
        <Link
          to="/candidate/applications"
          className="px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>View Applications</span>
        </Link>
        <Link
          to="/candidate/interviews"
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
        >
          <Video className="w-3.5 h-3.5" />
          <span>View Interviews</span>
        </Link>
      </div>
    </div>
  );
};
