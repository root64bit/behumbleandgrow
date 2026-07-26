import React from 'react';
import { FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CandidateDocument } from '../../../lib/supabase/types';

interface Props {
  documents: CandidateDocument[];
}

export const CandidateApplicationDocumentRequirements: React.FC<Props> = ({ documents }) => {
  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3 text-left">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#006D44]" />
          <h3 className="text-xs font-extrabold text-[#00122B] uppercase tracking-wider">
            Connected Document Vault Status
          </h3>
        </div>
        <Link
          to="/candidate/documents"
          className="text-xs text-[#006D44] font-bold hover:underline flex items-center gap-1"
        >
          <span>Manage Vault</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-2">
        {documents.map((doc) => (
          <div key={doc.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <p className="font-bold text-[#00122B]">{doc.file_name}</p>
              <p className="text-[11px] text-slate-500">{doc.document_type}</p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#006D44] bg-emerald-50 px-2 py-0.5 rounded">
              <ShieldCheck className="w-3 h-3" />
              <span>{doc.verification_status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
