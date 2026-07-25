import React from 'react';
import { CheckCircle2, Verified, Edit } from 'lucide-react';
import type { CoreCandidateProfile } from '../../../hooks/candidate/useCandidateProfile';

interface CandidateProfileHeaderProps {
  coreProfile: CoreCandidateProfile;
  completionPercent: number;
  onEditClick?: () => void;
  onSubmitVerification?: () => void;
}

export const CandidateProfileHeader: React.FC<CandidateProfileHeaderProps> = ({
  coreProfile,
  completionPercent,
  onEditClick,
  onSubmitVerification,
}) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius; // ~175.9
  const offset = circumference - (completionPercent / 100) * circumference;

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6 relative overflow-hidden text-left">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-[#00122B] font-headline-lg-mobile">
            {coreProfile.fullName || 'Candidate Profile'}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              ID: {coreProfile.candidateRef || 'BHG-CAN-0000'}
            </span>
            <div className="flex items-center gap-1 text-[#006D44] font-semibold text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{coreProfile.verificationStatus === 'verified' ? 'Eligible' : 'Under Review'}</span>
            </div>
          </div>
        </div>

        <div className="relative w-16 h-16 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              className="text-slate-200 stroke-current"
              cx="32"
              cy="32"
              fill="transparent"
              r={radius}
              strokeWidth="4"
            />
            <circle
              className="text-[#006D44] stroke-current transition-all duration-500"
              cx="32"
              cy="32"
              fill="transparent"
              r={radius}
              strokeLinecap="round"
              strokeWidth="4"
              style={{
                strokeDasharray: `${circumference} ${circumference}`,
                strokeDashoffset: offset,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-[#00122B]">{completionPercent}%</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
        Build a complete professional profile to help authorised recruitment teams assess your suitability for available opportunities.
      </p>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={onSubmitVerification}
          className="flex-1 bg-[#006D44] hover:bg-[#005232] text-white font-semibold text-xs py-3 px-4 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-sm"
        >
          <Verified className="w-4 h-4" />
          <span>Submit for Verification</span>
        </button>
        <button
          onClick={onEditClick}
          className="flex-1 bg-white border border-[#00122B] text-[#00122B] hover:bg-slate-50 font-semibold text-xs py-3 px-4 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Edit className="w-4 h-4" />
          <span>Edit Core Details</span>
        </button>
      </div>
    </section>
  );
};
