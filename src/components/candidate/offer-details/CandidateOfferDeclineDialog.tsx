import React, { useState } from 'react';
import { X, AlertTriangle, Loader2 } from 'lucide-react';
import { CandidateOfferDetails } from '../../../services/candidate-offer-details.service';

interface Props {
  offer: CandidateOfferDetails;
  submitting: boolean;
  onConfirm: (payload: { reasonCode: string; reasonNotes?: string }) => void;
  onClose: () => void;
}

const DECLINE_REASONS = [
  { id: 'compensation_mismatch', label: 'Compensation does not meet expectations' },
  { id: 'location_unsuitable', label: 'Location or travel requirements not suitable' },
  { id: 'start_date_unsuitable', label: 'Start date or notice period conflict' },
  { id: 'accepted_another', label: 'Accepted another employment opportunity' },
  { id: 'personal_reasons', label: 'Personal or family circumstances' },
  { id: 'other', label: 'Other reason' },
];

export const CandidateOfferDeclineDialog: React.FC<Props> = ({
  offer,
  submitting,
  onConfirm,
  onClose,
}) => {
  const [reasonCode, setReasonCode] = useState(DECLINE_REASONS[0].id);
  const [reasonNotes, setReasonNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    onConfirm({
      reasonCode,
      reasonNotes: reasonNotes.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-left my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#00122B]">Decline Conditional Offer</h3>
              <p className="text-xs text-slate-500">Ref: {offer.reference}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="p-3.5 bg-rose-50/80 border border-rose-200 rounded-xl space-y-1 text-rose-950">
            <p className="font-extrabold">Important Notice</p>
            <p className="text-[11px] text-rose-900 leading-relaxed">
              Declining this conditional offer is final. The employer will be notified, and this offer will no longer be available for acceptance.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block font-bold text-slate-800">Select Primary Reason for Declining:</label>
            <select
              value={reasonCode}
              onChange={(e) => setReasonCode(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              {DECLINE_REASONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block font-bold text-slate-800">Additional Notes (Optional):</label>
            <textarea
              value={reasonNotes}
              onChange={(e) => setReasonNotes(e.target.value)}
              rows={3}
              placeholder="Provide any helpful feedback for the recruitment team..."
              className="w-full p-3 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Keep Reviewing
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Confirm Decline Offer</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
