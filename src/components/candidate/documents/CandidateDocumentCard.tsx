import React from 'react';
import { FileText, Eye, RefreshCw, Lock, Globe, Award } from 'lucide-react';
import type { CandidateDocument } from '../../../lib/supabase/types';
import { CandidateDocumentStatusBadge } from './CandidateDocumentStatusBadge';

interface Props {
  document?: CandidateDocument | null;
  category: string;
  categoryLabel: string;
  isRequired: boolean;
  onUpload: () => void;
  onPreview: (doc: CandidateDocument) => void;
  onReplace: (doc: CandidateDocument) => void;
}

export const CandidateDocumentCard: React.FC<Props> = ({
  document,
  category,
  categoryLabel,
  isRequired,
  onUpload,
  onPreview,
  onReplace,
}) => {
  const getCategoryIcon = () => {
    if (category === 'candidate-cv') return <FileText className="w-6 h-6 text-[#006D44]" />;
    if (category === 'candidate-identity') return <Globe className="w-6 h-6 text-amber-600" />;
    return <Award className="w-6 h-6 text-[#00122B]" />;
  };

  if (!document) {
    return (
      <div className="bg-slate-50/70 border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 bg-slate-200/80 rounded-full flex items-center justify-center text-slate-600">
          {getCategoryIcon()}
        </div>
        <div>
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-sm font-bold text-[#00122B]">{categoryLabel}</h3>
            {isRequired ? (
              <span className="text-[10px] uppercase font-extrabold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                Required
              </span>
            ) : (
              <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                Optional
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {isRequired ? 'Required for verification and employer matching' : 'Optional supporting evidence'}
          </p>
        </div>
        <button
          onClick={onUpload}
          className="mt-1 px-5 py-2 bg-[#00122B] hover:bg-[#0f2747] text-white text-xs font-bold rounded-full transition-all shadow-sm"
        >
          Upload Now
        </button>
      </div>
    );
  }

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow text-left">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center">
            {getCategoryIcon()}
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#00122B]">{categoryLabel}</h3>
            <p className="text-xs font-medium text-slate-600 truncate max-w-[200px] sm:max-w-xs">{document.file_name}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <CandidateDocumentStatusBadge status={document.verification_status} expiryDate={document.expiry_date} />
              {document.file_size > 0 && (
                <span className="text-[11px] text-slate-400 font-mono">{formatFileSize(document.file_size)}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-t border-slate-100 pt-3 gap-2">
        <button
          onClick={() => onPreview(document)}
          className="flex-1 py-2 rounded-xl text-xs font-bold text-[#00122B] bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview</span>
        </button>
        <button
          onClick={() => onReplace(document)}
          className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Replace</span>
        </button>
      </div>

      <div className="flex items-center gap-1 text-[10px] text-slate-400 pt-1">
        <Lock className="w-3 h-3 text-[#006D44]" />
        <span>Confidential file protected by signed URL security</span>
      </div>
    </div>
  );
};
