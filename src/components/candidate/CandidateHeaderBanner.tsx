import React from 'react';
import { CandidateSummary } from '../../types/candidate';
import { ShieldCheck, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CandidateHeaderBannerProps {
  candidate: CandidateSummary;
}

export default function CandidateHeaderBanner({ candidate }: CandidateHeaderBannerProps) {
  return (
    <div className="bg-gradient-to-r from-[#102A4C] via-[#0B2342] to-[#078A5B] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden text-left">
      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified UAE Career Workspace</span>
            </span>
            <span className="text-xs text-slate-300">Candidate ID: <span className="font-mono font-bold text-white">{candidate.candidateId}</span></span>
          </div>

          <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
            {candidate.flag} {candidate.country} Candidate
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, {candidate.candidateName}
            </h1>
            <p className="text-sm text-slate-200 mt-1 max-w-2xl">
              You have an active video interview scheduled for your UAE job application. Review your preparation checklist below.
            </p>
          </div>

          <Link
            to="/candidate/interviews"
            className="btn btn-primary text-xs sm:text-sm px-5 py-3 font-bold shadow-lg shadow-emerald-900/40 shrink-0 self-start sm:self-auto"
          >
            <span>View Interview Details</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
