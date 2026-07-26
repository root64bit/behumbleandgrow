import React from 'react';
import { ProfileCompletionSection } from '../../types/candidate';
import { UserCheck, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileCompletionCardProps {
  percentage: number;
  sections: ProfileCompletionSection[];
}

export default function ProfileCompletionCard({ percentage, sections }: ProfileCompletionCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Profile Readiness</h2>
            <p className="text-xs text-slate-500">Your professional CV & qualification completeness score.</p>
          </div>
        </div>

        <span className="text-base font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
          {percentage}% Complete
        </span>
      </div>

      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {sections.map((sec) => (
          <div key={sec.id} className="flex items-center gap-2 text-slate-700 p-2 rounded-xl bg-slate-50">
            {sec.isCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            )}
            <span className={sec.isCompleted ? 'font-medium' : 'font-bold text-slate-900'}>{sec.name}</span>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">Higher completion improves job matching</span>
        <Link to="/candidate/profile" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
          <span>Edit Profile</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
