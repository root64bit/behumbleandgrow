import React from 'react';
import { X, Bell, CheckCheck, ShieldAlert, Receipt, Building2, UserCheck } from 'lucide-react';

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function NotificationDrawer({ open, onClose }: NotificationDrawerProps) {
  if (!open) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'Partner Approval Requested',
      description: 'Nairobi Global Placement Agency submitted license documents for verification.',
      time: '10 minutes ago',
      category: 'Approvals',
      icon: Building2,
      unread: true,
      route: '/superadmin/organisations'
    },
    {
      id: 'notif-2',
      title: 'Refund Request Awaiting Review',
      description: 'Senior finance approval required for candidate refund request PAY-2026-8838 (£90.00).',
      time: '1 hour ago',
      category: 'Finance',
      icon: Receipt,
      unread: true,
      route: '/superadmin/finance'
    },
    {
      id: 'notif-3',
      title: 'Suspicious Authentication Spike',
      description: '5 failed login attempts detected from IP 194.26.29.11 targeting administrative route.',
      time: '3 hours ago',
      category: 'Security',
      icon: ShieldAlert,
      unread: false,
      route: '/superadmin/security'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-left">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Platform Notifications</h3>
              <span className="text-[10px] font-extrabold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                2 New
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.route}
                  onClick={onClose}
                  className={`block p-3.5 rounded-2xl border transition-all ${
                    item.unread 
                      ? 'bg-emerald-50/40 border-emerald-200/80 shadow-xs' 
                      : 'bg-white border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl shrink-0 ${item.unread ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                        <span className="text-[10px] text-slate-400">{item.time}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mt-0.5">{item.title}</h4>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <button className="text-xs font-bold text-slate-600 hover:text-emerald-700 flex items-center gap-1.5">
              <CheckCheck className="w-4 h-4 text-emerald-600" />
              <span>Mark all as read</span>
            </button>

            <button onClick={onClose} className="text-xs font-bold text-slate-500 hover:text-slate-900">
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
