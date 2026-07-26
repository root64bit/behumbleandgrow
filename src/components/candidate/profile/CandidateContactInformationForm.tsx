import React, { useState } from 'react';
import { Mail, Phone, AlertCircle } from 'lucide-react';
import type { CoreCandidateProfile } from '../../../hooks/candidate/useCandidateProfile';

interface Props {
  coreProfile: CoreCandidateProfile;
  onSave: (updates: Partial<CoreCandidateProfile>) => Promise<void>;
  onUpdateEmail: (newEmail: string) => Promise<void>;
}

export const CandidateContactInformationForm: React.FC<Props> = ({ coreProfile, onSave, onUpdateEmail }) => {
  const [email, setEmail] = useState(coreProfile.email);
  const [phone, setPhone] = useState(coreProfile.phone || '');
  const [saving, setSaving] = useState(false);
  const [emailNotice, setEmailNotice] = useState('');
  const [savedMsg, setSavedMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg('');
    setErrorMsg('');
    setEmailNotice('');

    try {
      if (email !== coreProfile.email) {
        await onUpdateEmail(email);
        setEmailNotice('A confirmation request was sent to your new email address. Changes remain pending until confirmed.');
      }
      await onSave({ phone });
      setSavedMsg('Contact details saved.');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update contact info.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0F2747]/5 flex items-center justify-center text-[#00122B]">
            <Phone className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-[#00122B]">Contact Details</h2>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Required</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Account Email</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2.5 pl-9 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#006D44]"
            />
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Updating your authentication email sends a confirmation link to the new address before taking effect.
          </p>
        </div>

        {emailNotice && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>{emailNotice}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone Number (WhatsApp Enabled)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+258 84 123 4567"
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#006D44]"
          />
        </div>

        {savedMsg && <p className="text-xs font-semibold text-[#006D44]">{savedMsg}</p>}
        {errorMsg && <p className="text-xs font-semibold text-red-600">{errorMsg}</p>}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            {saving ? 'Saving...' : 'Save Contact Details'}
          </button>
        </div>
      </form>
    </div>
  );
};
