import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const CandidateDocumentSecurityNotice: React.FC = () => {
  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3 text-left">
      <div className="w-8 h-8 rounded-lg bg-[#0F2747]/5 flex items-center justify-center text-[#00122B] flex-shrink-0">
        <ShieldCheck className="w-4 h-4 text-[#006D44]" />
      </div>
      <div className="text-xs text-slate-600 space-y-1">
        <h4 className="font-bold text-[#00122B] flex items-center gap-1">
          <Lock className="w-3 h-3 text-[#006D44]" />
          <span>Private & Confidential Document Vault</span>
        </h4>
        <p>
          Your documents are stored in private Supabase Storage buckets with strict RLS permissions and short-lived signed URLs. They are accessible only by authorized operations reviewers and matching employers.
        </p>
      </div>
    </div>
  );
};
