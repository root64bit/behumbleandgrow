import React from 'react';
import { UserCheck, CheckCircle2, Calendar } from 'lucide-react';
import type { CandidateInterviewDetailData } from '../../../services/candidate-interview-details.service';
import { parseInterviewStatus } from '../../../lib/candidate/interviewStatus';

interface Props {
  detail: CandidateInterviewDetailData;
  onConfirm: () => Promise<void>;
  onOpenReschedule: () => void;
  loading: boolean;
}

export const CandidateInterviewAttendanceCard: React.FC<Props> = ({
  detail,
  onConfirm,
  onOpenReschedule,
  loading,
}) => {
  const canonical = parseInterviewStatus(detail.status);
  const isConfirmed = canonical === 'confirmed';

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-3">
      <div className="flex items-center gap-2">
        <UserCheck className="w-5 h-5 text-[#006D44]" />
        <h3 className="text-sm font-extrabold text-[#00122B]">Your Attendance Status</h3>
      </div>

      <p className="text-xs text-slate-600">
        Please confirm your availability for this video interview slot or request a different time slot if needed.
      </p>

      {isConfirmed ? (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-[#006D44] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#006D44]" />
          <span>Attendance Confirmed for this Slot</span>
        </div>
      ) : (
        <div className="flex gap-3 pt-1">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 bg-[#00122B] hover:bg-[#002147] text-white font-bold text-xs rounded-xl shadow-xs transition-all"
          >
            {loading ? 'Confirming...' : 'Confirm Attendance'}
          </button>
          <button
            onClick={onOpenReschedule}
            disabled={loading}
            className="flex-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl transition-all"
          >
            Request Reschedule
          </button>
        </div>
      )}
    </div>
  );
};
