import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  Building2, 
  UsersRound, 
  UserRoundCheck,
  BadgeCheck
} from 'lucide-react';

export type AuthContextRole = 'candidate' | 'partner' | 'employer' | 'operations';

interface AuthBrandPanelProps {
  role?: AuthContextRole;
}

export default function AuthBrandPanel({ role = 'candidate' }: AuthBrandPanelProps) {
  if (role === 'partner') {
    return (
      <div className="h-full bg-gradient-to-br from-[#0B2342] via-[#102A4C] to-emerald-950 p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-800/60">
            <UsersRound className="w-4 h-4 text-emerald-400" />
            <span>Recruitment Partner Network</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
            Turn qualified candidate leads into successful UAE placements.
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Manage assigned candidate profiles, streamline document verification, and coordinate employer submissions through a unified platform.
          </p>

          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Automated lead allocation & workload tracking</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct submission to verified UAE employers</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Real-time interview & offer milestone updates</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Licensed Agency Access
          </span>
          <span>UAE Compliance Protocol</span>
        </div>
      </div>
    );
  }

  if (role === 'employer') {
    return (
      <div className="h-full bg-gradient-to-br from-[#0B2342] via-slate-900 to-[#102A4C] p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 bg-teal-950/80 px-3 py-1.5 rounded-full border border-teal-800/60">
            <Building2 className="w-4 h-4 text-teal-400" />
            <span>Employer Enterprise Portal</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
            Review qualified international candidates with clarity.
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Direct access to verified candidate credentials, structured screening results, and interview coordination tools.
          </p>

          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Pre-screened candidate credentials & verified CVs</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Integrated video interview scheduling & feedback</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Transparent conditional offer & visa status tracking</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-300">
            <BadgeCheck className="w-4 h-4 text-teal-400" />
            Verified Enterprise Portal
          </span>
          <span>MOHRE Standard Alignment</span>
        </div>
      </div>
    );
  }

  if (role === 'operations') {
    return (
      <div className="h-full bg-slate-950 p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden border-l border-slate-800">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-950/80 px-3 py-1.5 rounded-full border border-amber-800/60">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Restricted Operations Console</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
            Secure recruitment operations & verification control.
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed font-normal">
            Authorized operations personnel management, document audit trails, candidate routing, and regulatory compliance monitoring.
          </p>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-slate-300">
            <p className="font-bold text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Security Protocol Notice
            </p>
            <p className="text-slate-400 leading-relaxed">
              All operations activity is logged and audited. Unauthorized access attempts trigger automated security flags and IP recording.
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-slate-900 text-xs text-slate-500">
          <span>Internal Operations Authorization Only</span>
        </div>
      </div>
    );
  }

  // Default Candidate Role Panel
  return (
    <div className="h-full bg-gradient-to-br from-[#0B2342] via-[#102A4C] to-emerald-950 p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-800/60">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Global Candidate Portal</span>
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
          Your UAE opportunity journey, organized in one place.
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed font-normal">
          Build your professional candidate profile, explore verified UAE vacancies, and track your application progress with full transparency.
        </p>

        {/* Candidate Journey Preview Steps */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">1</span>
            <div>
              <p className="font-bold text-white">Eligibility & Profile Setup</p>
              <p className="text-[11px] text-slate-400">Preliminary check & standardized digital CV</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">2</span>
            <div>
              <p className="font-bold text-white">Document Verification</p>
              <p className="text-[11px] text-slate-400">Encrypted document upload & review</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">3</span>
            <div>
              <p className="font-bold text-white">Interview & Placement Progress</p>
              <p className="text-[11px] text-slate-400">Employer selection & offer tracking</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Protected Candidate Data
        </span>
        <span>Ethical Recruitment Partner</span>
      </div>
    </div>
  );
}
