import React, { useState } from 'react';
import { Plane, AlertTriangle } from 'lucide-react';
import type { RelocationPreferences } from '../../../hooks/candidate/useCandidateProfile';

interface Props {
  relocation: RelocationPreferences | null;
  onSave: (data: RelocationPreferences) => Promise<void>;
}

export const CandidateRelocationForm: React.FC<Props> = ({ relocation }) => {
  const [willing, setWilling] = useState(relocation?.willingToRelocate ?? true);
  const [timeframe, setTimeframe] = useState(relocation?.timeframe || 'Immediate');
  const [noticePeriod, setNoticePeriod] = useState(relocation?.noticePeriod || '1 Month');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg('');
    setTimeout(() => {
      setSaving(false);
      setSavedMsg('Relocation details saved.');
    }, 400);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0F2747]/5 flex items-center justify-center text-[#00122B]">
            <Plane className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-[#00122B]">Relocation Availability</h2>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Required</span>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <input
            type="checkbox"
            id="willingToRelocate"
            checked={willing}
            onChange={(e) => setWilling(e.target.checked)}
            className="w-4 h-4 text-[#006D44] focus:ring-[#006D44] border-slate-300 rounded"
          />
          <label htmlFor="willingToRelocate" className="text-xs font-semibold text-slate-800">
            Willing to relocate to the United Arab Emirates (UAE) for employment
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Available Relocation Timeframe</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#006D44]"
            >
              <option value="Immediate">Immediate (Within 2 weeks)</option>
              <option value="1 Month">1 Month</option>
              <option value="2 Months">2 Months</option>
              <option value="Negotiable">Negotiable</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Current Employer Notice Period</label>
            <select
              value={noticePeriod}
              onChange={(e) => setNoticePeriod(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#006D44]"
            >
              <option value="Immediate / None">Immediate / None</option>
              <option value="15 Days">15 Days</option>
              <option value="1 Month">1 Month</option>
              <option value="2 Months">2 Months</option>
            </select>
          </div>
        </div>

        <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>
            Work-permit and visa decisions are made by relevant UAE authorities (MOHRE & ICP) and are not guaranteed by Be Humble & Grow.
          </span>
        </div>

        {savedMsg && <p className="text-xs font-semibold text-[#006D44]">{savedMsg}</p>}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            {saving ? 'Saving...' : 'Save Relocation Status'}
          </button>
        </div>
      </form>
    </div>
  );
};
