import React from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../lib/auth/AuthContext';

export const CandidateApplicationDetailsHeader: React.FC = () => {
  const { profile } = useAuth();
  const fullName = profile?.full_name || 'Candidate';
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const avatarUrl = (profile as any)?.avatar_url;

  return (
    <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-left">
      <div className="flex items-center gap-3">
        <Link
          to="/candidate/applications"
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all"
          aria-label="Back to My Applications"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="px-2.5 py-0.5 bg-emerald-50 text-[#006D44] border border-emerald-200 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
            Candidate Workspace
          </span>
          <h1 className="text-xl font-extrabold text-[#00122B] mt-0.5">Application Details</h1>
        </div>
      </div>

      {/* Candidate Profile Avatar or Initials (No stock photo) */}
      <div className="w-9 h-9 rounded-full bg-[#00122B] text-white flex items-center justify-center text-xs font-black shadow-xs overflow-hidden border-2 border-white">
        {avatarUrl ? (
          <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
        ) : initials ? (
          <span>{initials}</span>
        ) : (
          <User className="w-4 h-4 text-slate-300" />
        )}
      </div>
    </div>
  );
};
