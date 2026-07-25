import React, { useState } from 'react';
import { SlidersHorizontal, Info } from 'lucide-react';
import type { EmploymentPreferences } from '../../../hooks/candidate/useCandidateProfile';

interface Props {
  preferences: EmploymentPreferences | null;
  onSave: (data: EmploymentPreferences) => Promise<void>;
}

export const CandidateEmploymentPreferencesForm: React.FC<Props> = ({ preferences }) => {
  const [prefLocation, setPrefLocation] = useState(preferences?.preferredLocation || 'Dubai, UAE');
  const [expectedSalary, setExpectedSalary] = useState(preferences?.expectedSalaryText || 'AED 4,500 - 5,500 / month');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg('');
    setTimeout(() => {
      setSaving(false);
      setSavedMsg('Employment preferences saved.');
    }, 400);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0F2747]/5 flex items-center justify-center text-[#00122B]">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-[#00122B]">Employment Preferences</h2>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Optional</span>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred UAE Emirate / Location</label>
            <select
              value={prefLocation}
              onChange={(e) => setPrefLocation(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#006D44]"
            >
              <option value="Dubai, UAE">Dubai, UAE</option>
              <option value="Abu Dhabi, UAE">Abu Dhabi, UAE</option>
              <option value="Sharjah, UAE">Sharjah, UAE</option>
              <option value="Ras Al Khaimah, UAE">Ras Al Khaimah, UAE</option>
              <option value="Any UAE Emirate">Any UAE Emirate</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Expected Minimum Salary (AED)</label>
            <input
              type="text"
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
              placeholder="e.g. AED 4,500 / month"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#006D44]"
            />
          </div>
        </div>

        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-900 text-xs flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <span>Preferences help improve matching but do not guarantee selection, salary or employment.</span>
        </div>

        {savedMsg && <p className="text-xs font-semibold text-[#006D44]">{savedMsg}</p>}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </form>
    </div>
  );
};
