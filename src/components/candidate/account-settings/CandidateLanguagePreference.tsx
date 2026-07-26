import React from 'react';
import { Globe } from 'lucide-react';
import { SupportedLanguageCode, SUPPORTED_LANGUAGES } from '../../../lib/candidate/languagePreference';

interface Props {
  value: SupportedLanguageCode;
  onChange: (code: SupportedLanguageCode) => void;
}

export const CandidateLanguagePreference: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
        <Globe className="w-4 h-4 text-emerald-600" />
        <span>Preferred Interface Language</span>
      </h2>

      <p className="text-xs text-slate-600 leading-relaxed">
        Select your preferred language for portal communications, status digests, and notification messages.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {Object.values(SUPPORTED_LANGUAGES).map((lang) => {
          const isSelected = value === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onChange(lang.code)}
              className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span className="text-xl" role="img" aria-label={lang.label}>
                  {lang.flagEmoji}
                </span>
                <div>
                  <div className="text-xs font-bold text-slate-900">{lang.nativeLabel}</div>
                  <div className="text-[11px] text-slate-500">{lang.label}</div>
                </div>
              </div>
              <input
                type="radio"
                name="language"
                checked={isSelected}
                onChange={() => onChange(lang.code)}
                className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
