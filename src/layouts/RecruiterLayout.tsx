import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth/AuthContext';
import { Users, Briefcase, LogOut } from 'lucide-react';

export default function RecruiterLayout() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
              AGY
            </div>
            <div>
              <span className="font-bold text-white text-sm">Recruitment Partner Portal</span>
              <div className="text-[10px] text-blue-400 font-mono">Agency Lead Management</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-white">{profile?.full_name}</div>
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

        <div className="bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-2 overflow-x-auto py-2">
            <NavLink
              to="/recruiter"
              end
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                  isActive ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <Users className="w-3.5 h-3.5" />
              <span>Assigned Leads</span>
            </NavLink>
            <NavLink
              to="/recruiter/pipeline"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                  isActive ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Placement Pipeline</span>
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
