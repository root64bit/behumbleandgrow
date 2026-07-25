import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import type { CandidateDocument } from '../../../lib/supabase/types';

interface Props {
  rejectedDocs: CandidateDocument[];
  onReplaceClick: (doc: CandidateDocument) => void;
}

export const CandidateDocumentRejectionNotice: React.FC<Props> = ({ rejectedDocs, onReplaceClick }) => {
  if (rejectedDocs.length === 0) return null;

  return (
    <div className="space-y-3">
      {rejectedDocs.map((doc) => (
        <div
          key={doc.id}
          className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start justify-between gap-3 text-left"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-extrabold text-red-900">
                Action Required: Document Replacement ({doc.document_type})
              </h4>
              <p className="text-xs text-red-700 mt-0.5 font-medium">
                {doc.file_name} was rejected or requires update. Please upload a clear replacement document.
              </p>
            </div>
          </div>
          <button
            onClick={() => onReplaceClick(doc)}
            className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-bold shadow-sm flex items-center gap-1 flex-shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Replace</span>
          </button>
        </div>
      ))}
    </div>
  );
};
