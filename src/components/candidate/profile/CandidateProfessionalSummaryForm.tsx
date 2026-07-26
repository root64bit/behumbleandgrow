import React, { useState } from 'react';
import { FileText, MapPin } from 'lucide-react';
import type { CoreCandidateProfile } from '../../../hooks/candidate/useCandidateProfile';

interface Props {
  coreProfile: CoreCandidateProfile;
  onSave: (updates: Partial<CoreCandidateProfile>) => Promise<void>;
}

export const CandidateProfessionalSummaryForm: React.FC<Props> = ({ coreProfile, onSave }) => {
  const [headline, setHeadline] = useState(coreProfile.headline || '');
  const [bio, setBio] = useState(coreProfile.bio || '');
  const [currentLocation, setCurrentLocation] = useState(coreProfile.currentLocation || '');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const maxBioLength = 600;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg('');
    try {
      await onSave({ headline, bio, currentLocation });
      setSavedMsg('Professional summary saved successfully.');
    } catch (err) {
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
            <FileText className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-[#00122B]">Professional Summary</h2>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Required</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Title / Headline</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="e.g. Senior Hospitality Lead • F&B Outlet Captain"
            required
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#006D44]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Current Location (City, Country)</label>
          <div className="relative">
            <input
              type="text"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              placeholder="e.g. Maputo, Mozambique"
              required
              className="w-full p-2.5 pl-9 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#006D44]"
            />
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-700">Executive Bio & Overview</label>
            <span className="text-[11px] text-slate-400">
              {bio.length} / {maxBioLength} chars
            </span>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, maxBioLength))}
            rows={4}
            placeholder="Summarise your experience, strongest skills and the type of UAE opportunity you are seeking."
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#006D44]"
          />
          <p className="text-[11px] text-slate-500 mt-1">
            Tip: Keep your summary concise and focused on measurable achievements in customer service, leadership, or hospitality.
          </p>
        </div>

        {savedMsg && <p className="text-xs font-semibold text-[#006D44]">{savedMsg}</p>}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            {saving ? 'Saving...' : 'Save Summary'}
          </button>
        </div>
      </form>
    </div>
  );
};
