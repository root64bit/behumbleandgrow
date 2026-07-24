import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth/AuthContext';
import { User, FileText, Briefcase, LogOut, CheckCircle, ShieldCheck } from 'lucide-react';

export default function CandidateLayout() {
  const { user, profile, candidate, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col">
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-sm">
              BHG
            </div>
            <span className="font-bold text-white text-sm tracking-wide">Candidate Portal</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-white">{profile?.full_name || user?.email}</div>
              <div className="text-[10px] text-emerald-400 font-mono">Stage: {candidate?.stage || 'registered'}</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sub-nav tabs */}
        <div className="bg-slate-950 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-2 overflow-x-auto py-2">
            <NavLink
              to="/candidate"
              end
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                  isActive ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`
              }
            >
              <User className="w-3.5 h-3.5" />
              <span>Overview</span>
            </NavLink>
            <NavLink
              to="/candidate/profile"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                  isActive ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`
              }
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>My Profile</span>
            </NavLink>
            <NavLink
              to="/candidate/documents"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                  isActive ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`
              }
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Documents Vault</span>
            </NavLink>
            <NavLink
              to="/candidate/applications"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                  isActive ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`
              }
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Applications</span>
            </NavLink>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}
