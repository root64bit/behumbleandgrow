import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password?: string;
}

export default function PasswordStrength({ password = '' }: PasswordStrengthProps) {
  if (!password) return null;

  const checks = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'Uppercase & lowercase letters', valid: /[A-Z]/.test(password) && /[a-z]/.test(password) },
    { label: 'Contains a number', valid: /[0-9]/.test(password) },
    { label: 'Contains a special character (!@#$%^&*)', valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const score = checks.filter(c => c.valid).length;

  const getScoreColor = () => {
    if (score <= 1) return 'bg-rose-500';
    if (score === 2) return 'bg-amber-500';
    if (score === 3) return 'bg-teal-500';
    return 'bg-emerald-600';
  };

  const getScoreLabel = () => {
    if (score <= 1) return 'Weak';
    if (score === 2) return 'Fair';
    if (score === 3) return 'Good';
    return 'Strong Password';
  };

  return (
    <div className="space-y-2 pt-1 text-left">
      {/* Strength Bar */}
      <div className="flex items-center justify-between text-[11px] font-bold">
        <span className="text-slate-500">Password Strength:</span>
        <span className={score === 4 ? 'text-emerald-700' : 'text-slate-700'}>{getScoreLabel()}</span>
      </div>

      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-full flex-1 transition-all duration-300 ${
              i <= score ? getScoreColor() : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Rules Checklist */}
      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {checks.map((c, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-[11px]">
            {c.valid ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <X className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            )}
            <span className={c.valid ? 'text-slate-700 font-medium' : 'text-slate-400'}>
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
