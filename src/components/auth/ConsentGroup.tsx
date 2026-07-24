import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface ConsentGroupProps {
  termsAccepted: boolean;
  privacyAccepted: boolean;
  visaDisclaimerAccepted: boolean;
  jobAlertsConsent: boolean;
  whatsappConsent: boolean;
  onTermsChange: (val: boolean) => void;
  onPrivacyChange: (val: boolean) => void;
  onVisaDisclaimerChange: (val: boolean) => void;
  onJobAlertsChange: (val: boolean) => void;
  onWhatsappChange: (val: boolean) => void;
  error?: string;
}

export default function ConsentGroup({
  termsAccepted,
  privacyAccepted,
  visaDisclaimerAccepted,
  jobAlertsConsent,
  whatsappConsent,
  onTermsChange,
  onPrivacyChange,
  onVisaDisclaimerChange,
  onJobAlertsChange,
  onWhatsappChange,
  error
}: ConsentGroupProps) {
  return (
    <div className="space-y-3.5 text-left border-t border-slate-100 pt-4">
      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
        Terms, Privacy & Regulatory Disclaimers
      </h4>

      {/* Required Terms */}
      <label className="flex items-start gap-2.5 cursor-pointer group">
        <input
          type="checkbox"
          required
          checked={termsAccepted}
          onChange={(e) => onTermsChange(e.target.checked)}
          className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
        />
        <span className="text-xs text-slate-600 leading-normal">
          I agree to the <a href="#terms" className="text-emerald-700 font-bold hover:underline">Terms & Conditions</a> and <a href="#privacy" className="text-emerald-700 font-bold hover:underline">Privacy Policy</a>. <span className="text-rose-600">*</span>
        </span>
      </label>

      {/* Mandatory Visa Disclaimer Checkbox */}
      <label className="flex items-start gap-2.5 cursor-pointer group p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
        <input
          type="checkbox"
          required
          checked={visaDisclaimerAccepted}
          onChange={(e) => onVisaDisclaimerChange(e.target.checked)}
          className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
        />
        <span className="text-xs text-slate-700 leading-snug">
          <span className="font-bold text-slate-900">Official Disclaimer:</span> I understand that creating an account does not guarantee employment, employer selection, work-permit approval, or visa approval in the UAE. <span className="text-rose-600">*</span>
        </span>
      </label>

      {/* Optional Consent Checkboxes */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="text-[11px] font-semibold text-slate-400 block">Optional Preferences</span>
        
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={jobAlertsConsent}
            onChange={(e) => onJobAlertsChange(e.target.checked)}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
          />
          <span className="text-xs text-slate-600">I would like to receive relevant job recommendations by email.</span>
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={whatsappConsent}
            onChange={(e) => onWhatsappChange(e.target.checked)}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
          />
          <span className="text-xs text-slate-600">I consent to receiving status updates and alerts on WhatsApp.</span>
        </label>
      </div>

      {error && (
        <p className="text-[11px] font-medium text-rose-600 mt-1">{error}</p>
      )}
    </div>
  );
}
