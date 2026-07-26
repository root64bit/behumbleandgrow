import React, { useState } from 'react';
import { X, Send, Lock, Loader2, CheckCircle2, RotateCcw } from 'lucide-react';
import { CandidateSupportTicketItem, CandidateSupportMessageItem } from '../../../services/candidate-support.service';
import { CandidateSupportStatusBadge } from './CandidateSupportStatusBadge';
import { resolveSupportCategoryLabel } from '../../../lib/candidate/supportCategory';
import { formatNotificationRelativeTime, formatNotificationAccessibleDate } from '../../../lib/candidate/notificationTime';
import { validateSupportMessage } from '../../../lib/candidate/supportValidation';

interface CandidateSupportTicketDetailsModalProps {
  ticket: CandidateSupportTicketItem | null;
  messages: CandidateSupportMessageItem[];
  isLoadingMessages?: boolean;
  onClose: () => void;
  onReply: (ticketId: string, messageText: string) => Promise<boolean>;
  onCloseTicket: (ticketId: string) => Promise<boolean>;
  onReopenTicket: (ticketId: string) => Promise<boolean>;
  isMutating?: boolean;
  mutationError?: string;
}

export function CandidateSupportTicketDetailsModal({
  ticket,
  messages,
  isLoadingMessages = false,
  onClose,
  onReply,
  onCloseTicket,
  onReopenTicket,
  isMutating = false,
  mutationError,
}: CandidateSupportTicketDetailsModalProps) {
  const [replyText, setReplyText] = useState('');
  const [replyError, setReplyError] = useState<string | undefined>();

  if (!ticket) return null;

  const categoryLabel = resolveSupportCategoryLabel(ticket.category);
  const createdFull = formatNotificationAccessibleDate(ticket.createdAt);
  const isClosed = ticket.status === 'closed' || ticket.status === 'cancelled';
  const isResolved = ticket.status === 'resolved';

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateSupportMessage(replyText);
    if (err) {
      setReplyError(err);
      return;
    }

    setReplyError(undefined);
    const success = await onReply(ticket.id, replyText);
    if (success) {
      setReplyText('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs text-left animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[11px] font-black text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md font-mono">
                {ticket.ticketReference}
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {categoryLabel}
              </span>
              <CandidateSupportStatusBadge status={ticket.status} isActionRequired={ticket.isCandidateActionRequired} />
            </div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
              {ticket.subject}
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Opened on {createdFull}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {mutationError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 rounded-xl text-xs font-semibold text-rose-800 dark:text-rose-300">
              {mutationError}
            </div>
          )}

          {/* Ticket Description as initial message */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-xl space-y-1">
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Original Request
            </p>
            <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap break-words">
              {ticket.description}
            </p>
          </div>

          {/* Messages Feed */}
          {isLoadingMessages ? (
            <div className="py-6 text-center text-xs font-semibold text-slate-500 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              <span>Loading message history...</span>
            </div>
          ) : messages.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">No additional messages yet.</p>
          ) : (
            <div className="space-y-3 pt-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Messages
              </p>
              {messages.map((m) => {
                const isMe = m.authorRole === 'candidate';
                const timeStr = formatNotificationRelativeTime(m.createdAt);
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed break-words ${
                        isMe
                          ? 'bg-emerald-800 text-white rounded-br-none'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none border border-slate-200/80 dark:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 mb-1 border-b border-white/10 dark:border-slate-700/50 pb-1 text-[10px] opacity-80">
                        <span className="font-bold">{m.authorDisplayName}</span>
                        <span>{timeStr}</span>
                      </div>
                      <p className="whitespace-pre-wrap">{m.messageText}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer / Reply Composer / Ticket Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 space-y-3">
          {isClosed ? (
            <div className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-slate-400" />
                <span>This support request is closed.</span>
              </div>
              <button
                onClick={() => onReopenTicket(ticket.id)}
                disabled={isMutating}
                className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reopen Request</span>
              </button>
            </div>
          ) : (
            <>
              {/* Reply Form */}
              <form onSubmit={handleReplySubmit} className="space-y-2">
                <div className="relative">
                  <textarea
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    disabled={isMutating}
                    placeholder="Type your reply to candidate support..."
                    className="w-full p-2.5 pr-12 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={isMutating || !replyText.trim()}
                    className="absolute right-2.5 bottom-3.5 p-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg transition-all disabled:opacity-50"
                    title="Send reply"
                    aria-label="Send reply"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                {replyError && (
                  <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                    {replyError}
                  </p>
                )}
              </form>

              {/* Close Ticket CTA */}
              <div className="flex items-center justify-between pt-1">
                {isResolved ? (
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                    Support resolved this request.
                  </span>
                ) : (
                  <span />
                )}

                <button
                  onClick={() => onCloseTicket(ticket.id)}
                  disabled={isMutating}
                  className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:underline"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Request as Resolved & Close</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
