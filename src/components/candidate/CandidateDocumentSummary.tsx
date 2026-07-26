import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, Clock, AlertTriangle, ArrowUpRight } from 'lucide-react';
import type { CandidateDocumentRecord } from '../../types/candidate';

interface CandidateDocumentSummaryProps {
  documents: CandidateDocumentRecord[];
}

export default function CandidateDocumentSummary({ documents }: CandidateDocumentSummaryProps) {
  const verifiedCount = documents.filter(d => d.status === 'verified').length;
  const underReviewCount = documents.filter(d => d.status === 'under_review' || d.status === 'uploaded').length;
  const missingCount = documents.filter(d => d.status === 'replacement_required' || d.status === 'missing').length;

  return (
    <section className="bg-white dark:bg-slate-900 border border-[#C4C6CF]/60 dark:border-slate-800 rounded-xl p-5 shadow-[0px_4px_12px_rgba(15,39,71,0.05)] text-left flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold font-headline-md text-[#00122B] dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#006D44]" />
            <span>Document Status</span>
          </h2>
          <span className="text-xs font-semibold text-[#44474E] dark:text-slate-400">
            {documents.length} Uploaded
          </span>
        </div>

        {/* Status Pills */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#EAF7F1] dark:bg-emerald-950/60 p-2.5 rounded-lg border border-[#7DF7B6]/40 text-center">
            <ShieldCheck className="w-4 h-4 text-[#006D44] mx-auto mb-1" />
            <div className="text-sm font-bold text-[#006D44] dark:text-emerald-300">{verifiedCount}</div>
            <div className="text-[10px] text-[#005232] dark:text-emerald-400 font-semibold uppercase">Verified</div>
          </div>

          <div className="bg-[#FFDEA9]/50 dark:bg-amber-950/60 p-2.5 rounded-lg border border-[#FFDEA9] text-center">
            <Clock className="w-4 h-4 text-[#5F4100] mx-auto mb-1" />
            <div className="text-sm font-bold text-[#5F4100] dark:text-amber-300">{underReviewCount}</div>
            <div className="text-[10px] text-[#5F4100] dark:text-amber-400 font-semibold uppercase">Review</div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
            <AlertTriangle className="w-4 h-4 text-slate-500 mx-auto mb-1" />
            <div className="text-sm font-bold text-slate-700 dark:text-slate-300">{missingCount}</div>
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Action Req</div>
          </div>
        </div>

        {/* Recent Documents List */}
        <div className="space-y-2">
          {documents.slice(0, 3).map((doc) => (
            <div key={doc.id} className="flex items-center justify-between text-xs py-1.5 border-b border-[#C4C6CF]/20 dark:border-slate-800/80 last:border-0">
              <span className="font-medium text-[#00122B] dark:text-slate-200 truncate max-w-[200px]">
                {doc.name}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                doc.status === 'verified'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {doc.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-[#C4C6CF]/30 dark:border-slate-800">
        <Link
          to="/candidate/documents"
          className="w-full py-2.5 px-4 bg-[#0F2747] hover:bg-[#00122B] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-xs"
        >
          <span>Manage Documents</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
