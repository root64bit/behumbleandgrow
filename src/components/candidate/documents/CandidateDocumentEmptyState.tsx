import React from 'react';
import { Upload, ShieldCheck } from 'lucide-react';

interface Props {
  onUploadClick: () => void;
}

export const CandidateDocumentEmptyState: React.FC<Props> = ({ onUploadClick }) => {
  return (
    <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
      <div className="w-16 h-16 bg-[#0F2747]/5 rounded-full flex items-center justify-center mx-auto text-[#006D44]">
        <ShieldCheck className="w-8 h-8" />
      </div>
      <div>
        <h3 className="text-base font-extrabold text-[#00122B]">Start building your secure document vault</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
          Upload your Curriculum Vitae and International Passport / National ID to verify your candidate profile and unlock direct employer interview opportunities.
        </p>
      </div>
      <button
        onClick={onUploadClick}
        className="px-6 py-3 bg-[#006D44] hover:bg-[#005232] text-white font-bold text-xs rounded-xl shadow-sm inline-flex items-center gap-2 transition-colors"
      >
        <Upload className="w-4 h-4" />
        <span>Upload First Document</span>
      </button>
    </div>
  );
};
