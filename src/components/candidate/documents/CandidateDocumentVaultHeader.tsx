import React from 'react';
import { ArrowLeft, User } from 'lucide-react';

interface Props {
  candidateName?: string;
  avatarUrl?: string;
  onBack?: () => void;
}

export const CandidateDocumentVaultHeader: React.FC<Props> = ({
  candidateName = 'Amina Mabote',
  avatarUrl,
  onBack,
}) => {
  return (
    <header className="flex justify-between items-center pb-4 border-b border-slate-200/80 mb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack || (() => window.history.back())}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-[#00122B] transition-colors"
          aria-label="Back to Previous Page"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-extrabold text-[#00122B]">My Documents</h1>
          <p className="text-xs text-slate-500">Private, confidential credential storage</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-600">
          {avatarUrl ? (
            <img src={avatarUrl} alt={candidateName} className="w-full h-full object-cover" />
          ) : (
            <User className="w-4 h-4" />
          )}
        </div>
      </div>
    </header>
  );
};
