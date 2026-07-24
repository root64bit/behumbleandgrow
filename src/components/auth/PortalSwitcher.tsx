import React from 'react';
import { Link } from 'react-router-dom';
import { UsersRound, Building2, Lock, UserCheck } from 'lucide-react';

interface PortalSwitcherProps {
  currentRole: 'candidate' | 'partner' | 'employer' | 'operations';
}

export default function PortalSwitcher({ currentRole }: PortalSwitcherProps) {
  return (
    <div className="pt-6 border-t border-slate-200/80 text-center space-y-3">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
        Looking for another portal?
      </span>

      <div className="flex flex-wrap justify-center gap-2">
        {currentRole !== 'candidate' && (
          <Link
            to="/login"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5" />
            Candidate Login
          </Link>
        )}

        {currentRole !== 'partner' && (
          <Link
            to="/partner/login"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <UsersRound className="w-3.5 h-3.5" />
            Recruiter Partner Login
          </Link>
        )}

        {currentRole !== 'employer' && (
          <Link
            to="/employer/login"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-teal-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Building2 className="w-3.5 h-3.5" />
            Employer Login
          </Link>
        )}

        {currentRole !== 'operations' && (
          <Link
            to="/operations/login"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-amber-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            Operations Access
          </Link>
        )}
      </div>
    </div>
  );
}
