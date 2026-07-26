import React from 'react';
import { Award, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CandidateOffersHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span>Candidate Workspace</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00122B] tracking-tight">
          Conditional Offers
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Review conditional offers issued through your applications and track your response deadlines.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/candidate/applications"
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <Briefcase className="w-4 h-4 text-slate-500" />
          <span>View Applications</span>
        </Link>
      </div>
    </div>
  );
};
