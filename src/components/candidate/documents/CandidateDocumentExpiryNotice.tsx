import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import type { CandidateDocument } from '../../../lib/supabase/types';

interface Props {
  expiringDocs: CandidateDocument[];
}

export const CandidateDocumentExpiryNotice: React.FC<Props> = ({ expiringDocs }) => {
  if (expiringDocs.length === 0) return null;

  return (
    <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-left">
      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div className="text-xs text-amber-900 space-y-1">
        <h4 className="font-extrabold flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-amber-700" />
          <span>Passport / Credential Expiry Warning</span>
        </h4>
        <p>
          The following document is expiring within 90 days. Update your credential to maintain active eligibility:
        </p>
        <ul className="list-disc list-inside font-mono text-[11px] font-bold">
          {expiringDocs.map((d) => (
            <li key={d.id}>
              {d.file_name} (Expires: {d.expiry_date || 'Soon'})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
