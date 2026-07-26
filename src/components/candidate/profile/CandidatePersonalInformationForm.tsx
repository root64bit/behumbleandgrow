import React, { useState } from 'react';
import { User, ShieldCheck, Lock } from 'lucide-react';
import type { CoreCandidateProfile } from '../../../hooks/candidate/useCandidateProfile';

interface Props {
  coreProfile: CoreCandidateProfile;
  onSave: (updates: Partial<CoreCandidateProfile>) => Promise<void>;
}

export const CandidatePersonalInformationForm: React.FC<Props> = ({ coreProfile, onSave }) => {
  const [fullName, setFullName] = useState(coreProfile.fullName);
  const [countryCode, setCountryCode] = useState(coreProfile.countryCode || 'MZ');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg('');
    try {
      await onSave({ fullName, countryCode });
      setSavedMsg('Personal details updated successfully.');
    } catch (err: any) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0F2747]/5 flex items-center justify-center text-[#00122B]">
            <User className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-[#00122B]">Personal Information</h2>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Required</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#006D44]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Country of Nationality / Residence</label>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#006D44]"
            >
              <option value="MZ">Mozambique 🇲🇿</option>
              <option value="ZA">South Africa 🇿🇦</option>
              <option value="KE">Kenya 🇰🇪</option>
              <option value="AE">United Arab Emirates 🇦🇪</option>
              <option value="IN">India 🇮🇳</option>
              <option value="PH">Philippines 🇵🇭</option>
            </select>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#006D44]" />
            <div>
              <p className="text-xs font-semibold text-slate-800">Passport Identification</p>
              <p className="text-[11px] text-slate-500">Passport information managed in Document Vault</p>
            </div>
          </div>
          <a
            href="/candidate/documents"
            className="text-xs font-semibold text-[#006D44] hover:underline"
          >
            Manage in Vault
          </a>
        </div>

        <div className="p-3 bg-slate-100/60 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-slate-500">Candidate System Reference</p>
            <p className="text-xs font-mono font-bold text-slate-800">{coreProfile.candidateRef}</p>
          </div>
          <Lock className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {savedMsg && <p className="text-xs font-semibold text-[#006D44]">{savedMsg}</p>}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            {saving ? 'Saving...' : 'Save Personal Details'}
          </button>
        </div>
      </form>
    </div>
  );
};
