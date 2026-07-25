import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronRight } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  link?: string;
}

interface CandidateNotificationSummaryProps {
  notifications: NotificationItem[];
}

export default function CandidateNotificationSummary({ notifications }: CandidateNotificationSummaryProps) {
  if (notifications.length === 0) return null;

  // Rule #9: Filter out any non-candidate routes or internal notes
  const safeNotifications = notifications.filter(n => {
    if (!n.link) return true;
    return n.link.startsWith('/candidate/') || n.link.startsWith('/eligibility');
  });

  return (
    <section className="bg-white dark:bg-slate-900 border border-[#C4C6CF]/60 dark:border-slate-800 rounded-xl p-5 shadow-[0px_4px_12px_rgba(15,39,71,0.05)] text-left space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold font-headline-md text-[#00122B] dark:text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#006D44]" />
          <span>Recent Workspace Updates</span>
        </h2>
        <span className="text-xs font-semibold text-[#44474E] dark:text-slate-400">
          {safeNotifications.length} Safe Updates
        </span>
      </div>

      <div className="space-y-2">
        {safeNotifications.map((n) => (
          <div
            key={n.id}
            className="p-3 bg-[#FAF9FC] dark:bg-slate-800/80 rounded-lg border border-[#C4C6CF]/30 dark:border-slate-700 flex items-start justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-bold text-[#00122B] dark:text-slate-100">{n.title}</h3>
                <span className="text-[10px] text-[#74777F] dark:text-slate-400">{n.date}</span>
              </div>
              <p className="text-xs text-[#44474E] dark:text-slate-300 mt-0.5 line-clamp-2">
                {n.message}
              </p>
            </div>

            {n.link && (
              <Link
                to={n.link}
                className="p-1.5 text-[#006D44] hover:bg-[#EAF7F1] rounded-lg transition-colors shrink-0"
                title="View update"
              >
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
