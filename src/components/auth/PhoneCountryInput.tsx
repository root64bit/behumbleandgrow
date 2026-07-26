import React from 'react';
import { Phone } from 'lucide-react';

interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

const COUNTRY_CODES: CountryCode[] = [
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+258', country: 'Mozambique', flag: '🇲🇿' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+255', country: 'Tanzania', flag: '🇹🇿' },
  { code: '+256', country: 'Uganda', flag: '🇺🇬' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+233', country: 'Ghana', flag: '🇬🇭' },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
];

interface PhoneCountryInputProps {
  label: string;
  phoneValue: string;
  countryCodeValue: string;
  onPhoneChange: (val: string) => void;
  onCountryCodeChange: (val: string) => void;
  error?: string;
  required?: boolean;
}

export default function PhoneCountryInput({
  label,
  phoneValue,
  countryCodeValue,
  onPhoneChange,
  onCountryCodeChange,
  error,
  required = true
}: PhoneCountryInputProps) {
  return (
    <div className="space-y-1.5 text-left">
      <label className="block text-xs font-bold text-slate-800">
        {label} {required && <span className="text-rose-600">*</span>}
      </label>

      <div className="flex gap-2">
        {/* Country Code Select */}
        <div className="relative shrink-0">
          <select
            value={countryCodeValue}
            onChange={(e) => onCountryCodeChange(e.target.value)}
            className="h-full text-xs font-bold bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-2.5 py-3 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 cursor-pointer"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} ({c.country})
              </option>
            ))}
          </select>
        </div>

        {/* Phone Number Input */}
        <div className="relative flex-1 rounded-xl shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Phone className="w-4 h-4" />
          </div>

          <input
            type="tel"
            required={required}
            value={phoneValue}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="712 345 678"
            autoComplete="tel-national"
            className={`w-full text-sm rounded-xl border bg-white py-3 pl-9 pr-4 transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
              error 
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' 
                : 'border-slate-200 focus:border-emerald-600 focus:ring-emerald-100'
            }`}
          />
        </div>
      </div>

      {error && (
        <p className="text-[11px] font-medium text-rose-600 mt-1">{error}</p>
      )}
    </div>
  );
}
