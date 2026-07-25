import React, { useState } from 'react';
import { X, CheckSquare, AlertCircle } from 'lucide-react';
import { PlacementCandidateAction } from '../../../lib/candidate/placementNextAction';

interface Props {
  action: PlacementCandidateAction;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const CandidatePlacementAcknowledgementDialog: React.FC<Props> = ({
  action,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [acknowledged, setAcknowledged] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acknowledged) return;

    setSubmitting(true);
    setError(null);

    try {
      await onConfirm();
    } catch (err: any) {
      setError(err.message || 'Failed to record acknowledgement.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-left space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-emerald-600" />
            <span>Confirm Placement Action</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 text-xs text-slate-600">
          <p className="font-bold text-slate-900 text-sm">{action.title}</p>
          <p className="leading-relaxed">{action.description}</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <label className="flex items-start space-x-2.5 cursor-pointer text-xs text-slate-700 font-medium">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <span>I explicitly confirm that the details provided are accurate and complete.</span>
          </label>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!acknowledged || submitting}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              {submitting ? 'Submitting...' : 'Submit Acknowledgement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
