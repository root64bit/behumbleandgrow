import React, { useEffect, useState } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import { getCandidateApplications } from '../../services/application.service';
import type { Application } from '../../lib/supabase/types';
import { Briefcase, Clock, ShieldCheck } from 'lucide-react';

export default function CandidateApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getCandidateApplications(user.id).then((apps) => {
        setApplications(apps);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Submitted Applications</h1>
        <p className="text-xs text-slate-500 mt-1">
          Track the live review status and operations progress of your submitted vacancy dossiers.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Applications Submitted</h3>
          <p className="text-xs text-slate-500">Browse published vacancies in the jobs portal to submit your candidacy.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app: any) => (
            <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold uppercase">
                    Stage: {app.stage}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{app.jobs?.title || 'UAE Vacancy'}</h3>
                  <p className="text-xs text-slate-500">
                    Location: {app.jobs?.location || 'Dubai, UAE'} | Salary: {app.jobs?.salary_range || '14,000 AED / mo'}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Status:</span>
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold uppercase">
                    {app.status}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Submitted on: {new Date(app.submitted_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1 text-emerald-600 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Consent Logged</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
