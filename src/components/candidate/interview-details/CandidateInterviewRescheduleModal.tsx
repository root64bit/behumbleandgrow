import React, { useState } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, note?: string) => Promise<void>;
  loading: boolean;
}

const RESCHEDULE_REASONS = [
  'Technical Issues',
  'Schedule Conflict',
  'Personal Emergency',
  'Time Zone Difficulty',
  'Other',
];

export const CandidateInterviewRescheduleModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
}) => {
  const [reason, setReason] = useState(RESCHEDULE_REASONS[0]);
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl space-y-4 text-left">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto sm:hidden mb-2" />

        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h3 className="text-base font-extrabold text-[#00122B]">Request Reschedule</h3>
        </div>

        <p className="text-xs text-slate-600">
          Let the recruiter know why you need to reschedule and suggest a new time window.
        </p>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Reason for Rescheduling
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-[#006D44]"
            >
              {RESCHEDULE_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Message to Recruiter (Optional)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Type your message here..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#006D44]"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(reason, note)}
            disabled={loading}
            className="flex-1 py-3 bg-[#00122B] hover:bg-[#002147] text-white font-bold text-xs rounded-xl shadow-xs"
          >
            {loading ? 'Sending...' : 'Send Request'}
          </button>
        </div>
      </div>
    </div>
  );
};
