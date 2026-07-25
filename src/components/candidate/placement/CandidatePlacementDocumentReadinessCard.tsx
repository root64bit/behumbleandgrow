import React from 'react';
import { FolderShared, CheckCircle2, ArrowRight, FileBadge, School } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CandidatePlacementDocumentReadinessCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-left">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
          <FolderShared className="w-4 h-4 text-emerald-600" />
          <span>Candidate Placement Documents</span>
        </h3>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
          Verified Vault
        </span>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center space-x-3 text-xs font-medium text-slate-900">
            <FileBadge className="w-4 h-4 text-slate-500" />
            <span>Passport Copy</span>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center space-x-3 text-xs font-medium text-slate-900">
            <School className="w-4 h-4 text-slate-500" />
            <span>Attested Degree Certificate</span>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        </div>
      </div>

      <Link
        to="/candidate/documents"
        className="w-full py-2.5 px-4 inline-flex items-center justify-center space-x-2 text-slate-700 font-bold text-xs border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
      >
        <span>View Document Vault</span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
      </Link>
    </div>
  );
};
