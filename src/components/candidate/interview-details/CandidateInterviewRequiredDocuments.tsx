import React from 'react';
import { FileText, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  documents: Array<{ id: string; documentType: string; fileName: string; isVerified: boolean }>;
}

export const CandidateInterviewRequiredDocuments: React.FC<Props> = ({ documents }) => {
  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-[#00122B]">Required Documents</h3>
        <Link
          to="/candidate/documents"
          className="text-xs font-bold text-[#006D44] hover:underline flex items-center gap-0.5"
        >
          <span>Document Vault</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl text-xs"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-slate-500" />
              <span className="font-bold text-[#00122B]">{doc.documentType}</span>
            </div>
            {doc.isVerified ? (
              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Ready</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>Pending</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
