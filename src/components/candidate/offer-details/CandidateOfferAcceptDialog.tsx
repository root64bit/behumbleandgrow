import React, { useState } from 'react';
import { X, ShieldCheck, Loader2, CheckSquare, Square } from 'lucide-react';
import { CandidateOfferDetails } from '../../../services/candidate-offer-details.service';

interface Props {
  offer: CandidateOfferDetails;
  submitting: boolean;
  onConfirm: (payload: { declarationAcknowledged: boolean; typedSignature: string }) => void;
  onClose: () => void;
}

export const CandidateOfferAcceptDialog: React.FC<Props> = ({
  offer,
  submitting,
  onConfirm,
  onClose,
}) => {
  const [decl1, setDecl1] = useState(false);
  const [decl2, setDecl2] = useState(false);
  const [decl3, setDecl3] = useState(false);
  const [typedSig, setTypedSig] = useState('');

  const allAcknowledged = decl1 && decl2 && decl3 && typedSig.trim().length >= 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAcknowledged || submitting) return;
    onConfirm({
      declarationAcknowledged: true,
      typedSignature: typedSig.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-left my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#006D44]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#00122B]">Accept Conditional Offer</h3>
              <p className="text-xs text-slate-500">Ref: {offer.reference}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <p className="font-bold text-slate-900">{offer.job_title}</p>
            <p className="text-slate-600 font-semibold">{offer.employer_display_name}</p>
            <p className="text-emerald-700 font-black text-sm">
              {offer.currency} {offer.salary_amount.toLocaleString('en-US')} / {offer.salary_frequency}
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            <p className="font-bold text-slate-800 uppercase text-[10px]">Required Legal Declarations</p>

            <label className="flex items-start gap-2.5 cursor-pointer text-slate-700 select-none">
              <input
                type="checkbox"
                checked={decl1}
                onChange={(e) => setDecl1(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-[#006D44] focus:ring-[#006D44]"
              />
              <span>I have reviewed all offer terms, salary details, benefits, and working conditions.</span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-slate-700 select-none">
              <input
                type="checkbox"
                checked={decl2}
                onChange={(e) => setDecl2(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-[#006D44] focus:ring-[#006D44]"
              />
              <span>I understand that this offer remains conditional upon MOHRE work-permit approval and UAE visa authorization.</span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-slate-700 select-none">
              <input
                type="checkbox"
                checked={decl3}
                onChange={(e) => setDecl3(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-[#006D44] focus:ring-[#006D44]"
              />
              <span>I consent to my electronic decision signature being recorded immutably.</span>
            </label>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="block font-bold text-slate-800 text-xs">
              Type Full Legal Name to Sign Acceptance:
            </label>
            <input
              type="text"
              value={typedSig}
              onChange={(e) => setTypedSig(e.target.value)}
              placeholder="e.g. Amina Mabote"
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006D44]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Review Again
            </button>
            <button
              type="submit"
              disabled={!allAcknowledged || submitting}
              className="px-5 py-2 bg-[#006D44] hover:bg-[#005232] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Decision...</span>
                </>
              ) : (
                <span>Accept Conditional Offer</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
