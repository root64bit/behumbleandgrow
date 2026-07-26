import React from 'react';
import { FileQuestion, ArrowLeft, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CandidateInterviewDetailsNotFound: React.FC = () => {
  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white border border-slate-200 rounded-2xl shadow-xs text-center space-y-4 text-left">
      <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-500">
        <FileQuestion className="w-6 h-6 text-slate-400" />
      </div>

      <div className="space-y-1 text-center">
        <h3 className="text-base font-extrabold text-[#00122B]">Interview Not Available</h3>
        <p className="text-xs text-slate-500">
          This interview could not be found or is not available for your account.
        </p>
      </div>

      <div className="pt-2 flex justify-center gap-2">
        <Link
          to="/candidate/interviews"
          className="px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to My Interviews</span>
        </Link>
        <Link
          to="/candidate/support"
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
        >
          <LifeBuoy className="w-3.5 h-3.5" />
          <span>Contact Support</span>
        </Link>
      </div>
    </div>
  );
};
