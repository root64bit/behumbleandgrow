import React from 'react';
import { Megaphone, ShieldCheck } from 'lucide-react';

interface Props {
  granted: boolean;
  onToggle: (granted: boolean) => void;
}

export const CandidateMarketingConsent: React.FC<Props> = ({ granted, onToggle }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
          <Megaphone className="w-4 h-4 text-emerald-600" />
          <span>Product Updates & Optional Communications</span>
        </h2>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={granted}
            onChange={(e) => onToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
        </label>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Receive optional career tips, regional hospitality insights, and platform feature announcements. This consent is separate from transactional recruitment notices and may be revoked at any time.
      </p>

      <div className="text-[11px] text-slate-500 flex items-center space-x-1.5 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
        <span>Transactional recruitment, interview, and offer notifications are mandatory and unaffected by this setting.</span>
      </div>
    </div>
  );
};
