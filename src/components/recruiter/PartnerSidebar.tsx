import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCheck, 
  GitPullRequest, 
  Send, 
  Video, 
  Award, 
  PlaneTakeoff, 
  Users, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  CheckSquare, 
  Building2,
  ChevronDown
} from 'lucide-react';

interface PartnerSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavGroup {
  title: string;
  items: Array<{
    label: string;
    path: string;
    icon: React.ElementType;
    badgeCount?: number;
    badgeSeverity?: 'critical' | 'normal';
  }>;
}

export default function PartnerSidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile
}: PartnerSidebarProps) {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    Overview: true,
    Leads: true,
    Recruitment: true,
    Team: true
  });

  const navGroups: NavGroup[] = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
        { label: 'My Action Tasks', path: '/recruiter/tasks', icon: CheckSquare, badgeCount: 3, badgeSeverity: 'critical' }
      ]
    },
    {
      title: 'Candidate Leads',
      items: [
        { label: 'Assigned Leads', path: '/recruiter/leads', icon: UserCheck, badgeCount: 18, badgeSeverity: 'normal' },
        { label: 'Recruiter Pipeline', path: '/recruiter/pipeline', icon: GitPullRequest }
      ]
    },
    {
      title: 'Employer Placement',
      items: [
        { label: 'Employer Submissions', path: '/recruiter/submissions', icon: Send, badgeCount: 112 },
        { label: 'Upcoming Interviews', path: '/recruiter/interviews', icon: Video, badgeCount: 48 },
        { label: 'Offers in Progress', path: '/recruiter/offers', icon: Award, badgeCount: 24 },
        { label: 'Active Placements', path: '/recruiter/placements', icon: PlaneTakeoff, badgeCount: 20 }
      ]
    },
    {
      title: 'Agency & Team',
      items: [
        { label: 'Agency Recruiters', path: '/recruiter/team', icon: Users },
        { label: 'Partner Compliance', path: '/recruiter/compliance', icon: ShieldCheck }
      ]
    }
  ];

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/recruiter/dashboard' && location.pathname.startsWith(path));
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-[#0B2342] text-slate-200 transition-all duration-300 flex flex-col border-r border-slate-800/80 ${
          collapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 shrink-0">
          <Link to="/" className="flex items-center gap-3 overflow-hidden">
            <img
              src="/assets/be-humble-grow/logo-reversed-on-navy.webp"
              alt="Be Humble & Grow"
              className={`h-8 w-auto object-contain transition-all ${collapsed ? 'h-7' : 'h-8'}`}
              onError={(e) => {
                e.currentTarget.src = "/assets/be-humble-grow/logo-reversed-on-navy.png";
              }}
            />
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Agency Partner Badge Banner */}
        {!collapsed && (
          <div className="px-4 py-2 bg-emerald-950/60 border-b border-emerald-800/40 flex items-center justify-between text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
            <span className="truncate">Nairobi Global Agency</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
          </div>
        )}

        {/* Navigation Groups List */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-4 custom-scrollbar">
          {navGroups.map((group) => {
            const isGroupOpen = expandedGroups[group.title] !== false;

            return (
              <div key={group.title} className="space-y-1">
                {!collapsed && (
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className="w-full flex items-center justify-between px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-200 transition-colors"
                  >
                    <span>{group.title}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isGroupOpen ? '' : '-rotate-90'}`} />
                  </button>
                )}

                {(collapsed || isGroupOpen) && (
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);

                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={onCloseMobile}
                          title={collapsed ? item.label : undefined}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                            active
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                              : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                          } ${collapsed ? 'justify-center px-0' : ''}`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                          
                          {!collapsed && (
                            <span className="flex-1 truncate">{item.label}</span>
                          )}

                          {!collapsed && item.badgeCount !== undefined && (
                            <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                              item.badgeSeverity === 'critical'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : 'bg-slate-700 text-slate-300'
                            }`}>
                              {item.badgeCount}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-800/80 space-y-1 shrink-0">
          <Link
            to="/partner/login"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            {!collapsed && <span>Sign Out Agency Session</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
