import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../lib/auth/AuthContext';
import { UserCheck, Briefcase, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CandidateDashboardPage() {
  const { profile, candidate } = useAuth();

  const completionPct = candidate?.profile_completion_percentage || 40;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
            Verified Candidate
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            Welcome back, {profile?.full_name || 'Candidate'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Candidate Stage: <span className="font-semibold text-emerald-600 uppercase">{candidate?.stage || 'registered'}</span> | Preferred Location: UAE
          </p>
        </div>

        <div className="text-left md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
          <span className="text-xs text-slate-400">Application Fee Status:</span>
          <div className="text-sm font-bold text-emerald-600 flex items-center md:justify-end space-x-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Zero Illegal Fees Guaranteed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm">
            <UserCheck className="w-4 h-4" />
            <span>Profile Completeness</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${completionPct}%` }}></div>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">{completionPct}% completed</span>
            <Link to="/candidate/profile" className="text-emerald-600 font-bold hover:underline">
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-blue-700 font-bold text-sm">
            <FileText className="w-4 h-4" />
            <span>Verification Vault</span>
          </div>
          <div className="text-xs text-slate-600">
            Passport, CV, and Certificates uploaded for operations audit.
          </div>
          <div className="pt-1">
            <Link to="/candidate/documents" className="text-xs font-bold text-blue-600 hover:underline">
              Manage Documents →
            </Link>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-purple-700 font-bold text-sm">
            <Briefcase className="w-4 h-4" />
            <span>Job Marketplace</span>
          </div>
          <div className="text-xs text-slate-600">
            Browse verified UAE vacancies directly matched to your skills.
          </div>
          <div className="pt-1">
            <Link to="/jobs" className="text-xs font-bold text-purple-600 hover:underline">
              View Published Jobs →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
