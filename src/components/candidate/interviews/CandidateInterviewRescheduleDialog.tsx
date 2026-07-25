import React, { useState } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import type { CandidateInterviewListItem } from '../../../services/candidate-interviews.service';

interface Props {
  interview: CandidateInterviewListItem;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, note?: string) => Promise<void>;
  loading: boolean;
}

const RESCHEDULE_REASONS = [
  'Schedule Conflict',
  'Connectivity / Technical Difficulty',
  'Personal Emergency',
  'Time Zone Difficulty',
  'Other',
];

export const CandidateInterviewRescheduleDialog: React.FC<Props> = ({
  interview,
  isOpen,
  onClose,
  onSubmit,
  loading,
}) => {
  const [reason, setReason] = useState(RESCHEDULE_REASONS[0]);
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4 text-left">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h3 className="text-base font-extrabold text-[#00122B]">Request Interview Reschedule</h3>
        </div>

        <p className="text-xs text-slate-600">
          Submit a reschedule request for <span className="font-bold text-[#00122B]">{interview.job_title}</span>. Operations or the employer recruitment coordinator will review your request.
        </p>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Reason for Reschedule
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-[#006D44]"
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
              Proposed Availability / Additional Note (Optional)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Prefer afternoon slots between 14:00 and 17:00 GST..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#006D44]"
            />
          </div>
        </div>

        <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-[11px] flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>Your request will be marked pending. Authorised coordinators will contact you with updated times.</span>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(reason, note)}
            disabled={loading}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </div>
    </div>
  );
};
