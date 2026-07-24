import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe2, ShieldCheck } from 'lucide-react';

interface AuthHeaderProps {
  portalName?: string;
  backToLabel?: string;
  backToHref?: string;
}

export default function AuthHeader({ 
  portalName, 
  backToLabel = "Back to Home", 
  backToHref = "/" 
}: AuthHeaderProps) {
  return (
    <header className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200/80">
      {/* Brand Logo & Optional Portal Badge */}
      <div className="flex items-center gap-3">
        <Link to="/" className="group inline-flex items-center">
          <img 
            src="/assets/be-humble-grow/logo-primary-horizontal.webp" 
            alt="Be Humble & Grow" 
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/assets/be-humble-grow/logo-primary-horizontal.png";
            }}
          />
        </Link>

        {portalName && (
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            {portalName}
          </span>
        )}
      </div>

      {/* Action Links */}
      <div className="flex items-center gap-4">
        <button 
          type="button"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
        >
          <Globe2 className="w-3.5 h-3.5 text-slate-500" />
          <span>EN</span>
        </button>

        <Link 
          to={backToHref}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backToLabel}</span>
        </Link>
      </div>
    </header>
  );
}
