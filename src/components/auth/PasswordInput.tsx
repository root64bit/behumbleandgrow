import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export default function PasswordInput({
  label = "Password",
  error,
  helpText,
  id = "password-input",
  required = true,
  className = '',
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5 text-left">
      <label htmlFor={id} className="block text-xs font-bold text-slate-800">
        {label} {required && <span className="text-rose-600">*</span>}
      </label>

      <div className="relative rounded-xl shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Lock className="w-4 h-4" />
        </div>

        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          required={required}
          autoComplete="current-password"
          className={`w-full text-sm rounded-xl border bg-white py-3 pl-10 pr-11 transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
            error 
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' 
              : 'border-slate-200 focus:border-emerald-600 focus:ring-emerald-100'
          } ${className}`}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {error && (
        <p className="text-[11px] font-medium text-rose-600 mt-1">{error}</p>
      )}

      {helpText && !error && (
        <p className="text-[11px] text-slate-500 mt-1">{helpText}</p>
      )}
    </div>
  );
}
