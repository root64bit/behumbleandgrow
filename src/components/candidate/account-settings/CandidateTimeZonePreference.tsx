import React from 'react';
import { Clock, Navigation } from 'lucide-react';
import {
  SUPPORTED_TIME_ZONES,
  detectBrowserTimeZone,
  formatTimeZoneLabel,
} from '../../../lib/candidate/timeZonePreference';

interface Props {
  value: string;
  onChange: (tz: string) => void;
}

export const CandidateTimeZonePreference: React.FC<Props> = ({ value, onChange }) => {
  const detected = detectBrowserTimeZone();

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
        <Clock className="w-4 h-4 text-emerald-600" />
        <span>Candidate IANA Time Zone</span>
      </h2>

      <p className="text-xs text-slate-600 leading-relaxed">
        Interview schedules, placement deadlines, and quiet hour schedules are automatically converted to your selected time zone.
      </p>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Active Time Zone</label>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {SUPPORTED_TIME_ZONES.map((tz) => (
              <option key={tz.iana} value={tz.iana}>
                {tz.label} ({tz.utcOffset})
              </option>
            ))}
          </select>
        </div>

        {detected && detected !== value && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-3 text-xs text-amber-900">
            <div className="flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Browser detected time zone: <strong>{formatTimeZoneLabel(detected)}</strong></span>
            </div>
            <button
              type="button"
              onClick={() => onChange(detected)}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] rounded-lg transition-colors flex-shrink-0"
            >
              Use Detected
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
