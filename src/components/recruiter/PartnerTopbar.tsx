import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Building2, 
  User, 
  ChevronDown, 
  X,
  CheckCircle2
} from 'lucide-react';

interface PartnerTopbarProps {
  onOpenMobileSidebar: () => void;
  onOpenNotificationDrawer: () => void;
  dateRange: string;
  onDateRangeChange: (val: string) => void;
}

export default function PartnerTopbar({
  onOpenMobileSidebar,
  onOpenNotificationDrawer,
  dateRange,
  onDateRangeChange
}: PartnerTopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between shadow-xs">
        
        {/* Left Section: Mobile Menu & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl lg:hidden transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>APPROVED PARTNER</span>
            </span>

            <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <span>Recruitment Partner</span>
              <span>/</span>
              <span className="text-slate-900 font-bold">Partner Dashboard</span>
            </div>
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Search agency leads...</span>
            <kbd className="hidden sm:inline-block text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Date Filter */}
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="ytd">Year to Date</option>
          </select>

          {/* Notifications */}
          <button
            onClick={onOpenNotificationDrawer}
            className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white"></span>
          </button>

          {/* Recruiter Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                SJ
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">Sarah Jenkins</p>
                <p className="text-[10px] text-slate-500">Lead Agency Recruiter</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-fade-in text-left">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">s.jenkins@nairobiglobal.com</p>
                  <p className="text-[10px] font-semibold text-emerald-700">Nairobi Global Placement</p>
                </div>
                <a href="/recruiter/team" className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">
                  Team Workload
                </a>
                <a href="/recruiter/compliance" className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">
                  Agency Compliance
                </a>
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <a href="/partner/login" className="block px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50">
                    Sign Out Agency
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>

      </header>

      {/* Command Search Modal */}
      {searchOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4 animate-fade-in"
          onClick={() => setSearchOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search candidates, leads, employers, interviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm font-medium focus:outline-none placeholder:text-slate-400"
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 max-h-80 overflow-y-auto space-y-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Actions</p>
              
              <a href="/recruiter/leads?stage=new" className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800">Leads Awaiting Acceptance</span>
                </div>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">5 Urgent</span>
              </a>

              <a href="/recruiter/interviews" className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800">Upcoming Video Interviews</span>
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">48 Scheduled</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
