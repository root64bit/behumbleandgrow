import React from 'react';
import { FileCheck, Eye, Lock, Loader2 } from 'lucide-react';

interface Props {
  documentAvailable: boolean;
  documentStatus: 'idle' | 'checking' | 'available' | 'unavailable' | 'error';
  onRequestAccess: () => void;
}

export const CandidateOfferDocumentCard: React.FC<Props> = ({
  documentAvailable,
  documentStatus,
  onRequestAccess,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#006D44] shrink-0">
          <FileCheck className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-extrabold text-[#00122B]">Formal Offer Letter & Terms Document</h4>
          <p className="text-xs text-slate-500">
            Level 3 server-verified secure document access with ephemeral signed preview.
          </p>
        </div>
      </div>

      <button
        onClick={onRequestAccess}
        disabled={!documentAvailable || documentStatus === 'checking'}
        className="px-4 py-2.5 bg-[#006D44] hover:bg-[#005232] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all shrink-0"
      >
        {documentStatus === 'checking' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Verifying Access...</span>
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" />
            <span>View Offer Document</span>
          </>
        )}
      </button>
    </div>
  );
};
