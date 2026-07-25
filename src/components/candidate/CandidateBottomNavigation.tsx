import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Send, 
  Video, 
  User 
} from 'lucide-react';

export default function CandidateBottomNavigation() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/candidate/dashboard', icon: LayoutDashboard },
    { label: 'Opportunities', path: '/candidate/jobs', icon: Briefcase },
    { label: 'Applications', path: '/candidate/applications', icon: Send, badge: 1 },
    { label: 'Interviews', path: '/candidate/interviews', icon: Video, badge: 1 },
    { label: 'Profile', path: '/candidate/profile', icon: User }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/candidate/dashboard' && location.pathname.startsWith(path));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/80 px-2 py-2 flex items-center justify-around lg:hidden shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all relative ${
              active ? 'text-emerald-700 font-extrabold' : 'text-slate-500 hover:text-slate-900 font-semibold'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${active ? 'text-emerald-600 scale-110' : 'text-slate-400'}`} />
              {item.badge && (
                <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 leading-none">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
