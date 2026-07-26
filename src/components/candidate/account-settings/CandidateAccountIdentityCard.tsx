import React from 'react';
import { User, Mail, Shield, CheckCircle2, Lock } from 'lucide-react';
import { CandidateAccountIdentitySummary } from '../../../services/candidate-account-settings.service';

interface Props {
  identity: CandidateAccountIdentitySummary;
  onOpenPasswordModal: () => void;
}

export const CandidateAccountIdentityCard: React.FC<Props> = ({ identity, onOpenPasswordModal }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
          <User className="w-4 h-4 text-emerald-600" />
          <span>Account Identity</span>
        </h2>
        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
          {identity.countryCode}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Full Name</span>
          <p className="text-sm font-semibold text-slate-900 mt-0.5">{identity.fullName}</p>
        </div>

        <div>
          <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Account Email</span>
          <div className="flex items-center space-x-1.5 mt-0.5">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <p className="text-sm font-semibold text-slate-900 truncate">{identity.email}</p>
            {identity.isEmailVerified && (
              <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3 mr-0.5" /> Verified
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-slate-400" />
          <span>Authentication protected by Supabase Auth</span>
        </div>
        <button
          type="button"
          onClick={onOpenPasswordModal}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Update Password</span>
        </button>
      </div>
    </div>
  );
};
