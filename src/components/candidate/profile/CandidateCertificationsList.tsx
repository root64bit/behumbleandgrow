import React from 'react';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import type { CandidateDocument } from '../../../lib/supabase/types';

interface Props {
  certifications: CandidateDocument[];
}

export const CandidateCertificationsList: React.FC<Props> = ({ certifications }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0F2747]/5 flex items-center justify-center text-[#00122B]">
            <Award className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-[#00122B]">Certifications & Accreditations</h2>
        </div>
        <a
          href="/candidate/documents"
          className="text-xs font-semibold text-[#006D44] hover:underline flex items-center gap-1"
        >
          <span>Upload in Vault</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {certifications.length === 0 ? (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <p className="text-xs text-slate-500">
            No certification documents linked yet. Upload professional certificates, food safety clearings, or language test scores in the Document Vault.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {certifications.map((cert) => (
            <div key={cert.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">{cert.file_name}</p>
                <p className="text-[11px] text-slate-500 capitalize">{cert.document_type.replace('_', ' ')}</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#006D44] bg-emerald-50 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3" />
                <span className="capitalize">{cert.verification_status || 'Verified'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
