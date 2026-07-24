import React from 'react';
import { CandidateDocumentRecord } from '../../types/candidate';
import { FileText, CheckCircle2, Clock, Upload, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DocumentReadinessCardProps {
  documents: CandidateDocumentRecord[];
}

export default function DocumentReadinessCard({ documents }: DocumentReadinessCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'under_review':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'replacement_required':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Document Readiness</h2>
            <p className="text-xs text-slate-500">Official document verification status required for UAE work permit processing.</p>
          </div>
        </div>
        <Link to="/candidate/documents" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
          <span>Manage Documents</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-2">
        {documents.map((doc) => (
          <div key={doc.id} className="p-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between gap-3 hover:bg-slate-100/50 transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <h3 className="text-xs font-bold text-slate-900">{doc.name}</h3>
                {doc.expiryDate && (
                  <p className="text-[10px] text-slate-400">Expires: {doc.expiryDate}</p>
                )}
              </div>
            </div>

            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${getStatusBadge(doc.status)}`}>
              {doc.status.replace('_', ' ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
