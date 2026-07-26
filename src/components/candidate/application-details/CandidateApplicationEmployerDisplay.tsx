import React from 'react';
import { Building } from 'lucide-react';
import type { Application } from '../../../lib/supabase/types';
import { resolveCandidateEmployerDisplay } from '../../../lib/candidate/applicationStatus';

interface Props {
  application: Partial<Application> & { jobs?: any; employerDisclosureAuthorised?: boolean };
}

export const CandidateApplicationEmployerDisplay: React.FC<Props> = ({ application }) => {
  const employerName = resolveCandidateEmployerDisplay(application);
  const isMasked = employerName === 'Approved UAE Employer';

  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium text-left">
      <Building className="w-4 h-4 text-slate-400 flex-shrink-0" />
      <span className={isMasked ? 'italic text-slate-500' : 'font-bold text-[#00122B]'}>
        {employerName}
      </span>
    </div>
  );
};
