import React from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CandidateApplicationsEmptyState: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm text-left">
      <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-[#006D44]">
        <Briefcase className="w-6 h-6" />
      </div>

      <div className="max-w-md mx-auto space-y-1 text-center">
        <h3 className="text-base font-extrabold text-[#00122B]">No Applications Submitted Yet</h3>
        <p className="text-xs text-slate-500">
          Browse vetted UAE opportunities across hospitality, logistics, customer service and tech to start your journey.
        </p>
      </div>

      <div className="pt-2 flex justify-center">
        <Link
          to="/candidate/jobs"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006D44] hover:bg-[#005232] text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
        >
          <span>Explore UAE Vacancies</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
