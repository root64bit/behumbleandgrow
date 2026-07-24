import React from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
  icon?: React.ElementType;
}

export default function AuthInput({
  label,
  error,
  helpText,
  icon: Icon,
  id,
  required,
  className = '',
  ...props
}: AuthInputProps) {
  const inputId = id || `auth-input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="space-y-1.5 text-left">
      <label 
        htmlFor={inputId} 
        className="block text-xs font-bold text-slate-800"
      >
        {label} {required && <span className="text-rose-600">*</span>}
      </label>

      <div className="relative rounded-xl shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          required={required}
          className={`w-full text-sm rounded-xl border bg-white py-3 transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
            Icon ? 'pl-10 pr-4' : 'px-4'
          } ${
            error 
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' 
              : 'border-slate-200 focus:border-emerald-600 focus:ring-emerald-100'
          } ${className}`}
          {...props}
        />
      </div>

      {error && (
        <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1">
          <span>{error}</span>
        </p>
      )}

      {helpText && !error && (
        <p className="text-[11px] text-slate-500 mt-1">{helpText}</p>
      )}
    </div>
  );
}
