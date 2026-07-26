import React from 'react';
import { ChevronRight, Calendar, Tag } from 'lucide-react';
import { CandidateSupportTicketItem } from '../../../services/candidate-support.service';
import { CandidateSupportStatusBadge } from './CandidateSupportStatusBadge';
import { CandidateSupportActionRequiredNotice } from './CandidateSupportActionRequiredNotice';
import { resolveSupportCategoryLabel } from '../../../lib/candidate/supportCategory';
import { formatNotificationRelativeTime, formatNotificationAccessibleDate } from '../../../lib/candidate/notificationTime';

interface CandidateSupportTicketCardProps {
  ticket: CandidateSupportTicketItem;
  onSelect: (ticketId: string) => void;
}

export function CandidateSupportTicketCard({ ticket, onSelect }: CandidateSupportTicketCardProps) {
  const categoryLabel = resolveSupportCategoryLabel(ticket.category);
  const updatedRelative = formatNotificationRelativeTime(ticket.updatedAt);
  const updatedFull = formatNotificationAccessibleDate(ticket.updatedAt);

  return (
    <article
      className={`p-4 rounded-xl border transition-all ${
        ticket.isCandidateActionRequired
          ? 'bg-white dark:bg-slate-900 border-rose-300 dark:border-rose-800 shadow-xs'
          : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Reference, Category & Status badges */}
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="text-[11px] font-black text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md font-mono">
              {ticket.ticketReference}
            </span>

            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              <Tag className="w-3 h-3" />
              <span>{categoryLabel}</span>
            </span>

            <CandidateSupportStatusBadge
              status={ticket.status}
              isActionRequired={ticket.isCandidateActionRequired}
            />
          </div>

          {/* Escaped Plain-text Subject */}
          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
            {ticket.subject}
          </h3>

          {/* Escaped Plain-text Description Preview */}
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed line-clamp-2 break-words">
            {ticket.description}
          </p>

          {/* Action Required Banner */}
          {ticket.isCandidateActionRequired && <CandidateSupportActionRequiredNotice />}
        </div>

        {/* Updated Timestamp & Action CTA */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
          <time
            dateTime={ticket.updatedAt}
            title={updatedFull}
            aria-label={updatedFull}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Updated {updatedRelative}</span>
          </time>

          <button
            onClick={() => onSelect(ticket.id)}
            className="inline-flex items-center gap-1 bg-emerald-800 hover:bg-emerald-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
          >
            <span>View Request</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
