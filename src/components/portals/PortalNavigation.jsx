import React from 'react';
import { 
  Building2, 
  UserCheck, 
  Briefcase, 
  ShieldAlert, 
  DollarSign, 
  Sliders, 
  Home,
  User,
  Users
} from 'lucide-react';

export default function PortalNavigation({ activePortal, setActivePortal }) {
  const portals = [
    { id: 'public', label: 'Public Home', icon: Home },
    { id: 'candidate', label: 'Candidate Portal', icon: User },
    { id: 'partner', label: 'Recruitment Partner', icon: Users },
    { id: 'employer', label: 'Employer Portal', icon: Briefcase },
    { id: 'operations', label: 'Operations Console', icon: Building2 },
    { id: 'finance', label: 'Finance & Compliance', icon: DollarSign },
    { id: 'admin', label: 'Admin Governance', icon: Sliders },
  ];

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-1 shrink-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mr-3 hidden md:inline">
              Role Mode:
            </span>
            {portals.map((portal) => {
              const Icon = portal.icon;
              const isActive = activePortal === portal.id;
              return (
                <button
                  key={portal.id}
                  onClick={() => setActivePortal(portal.id)}
                  className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 mr-1.5" />
                  {portal.label}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center space-x-2 shrink-0 text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>RLS Active</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-300 font-mono">
              JWT: Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
