import React, { useEffect, useState } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import { getAllApplicationsForOperations, updateApplicationStatusByOps } from '../../services/operations.service';
import type { Application } from '../../lib/supabase/types';
import { FileText, CheckCircle, XCircle, Clock, ShieldCheck } from 'lucide-react';

export default function OperationsApplicationsPage() {
  const { user, userRoles } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    getAllApplicationsForOperations().then((apps) => {
      setApplications(apps);
      setLoading(false);
    });
  }, []);

  const handleStatusChange = async (appId: string, newStatus: string) => {
    if (!user) return;
    setUpdatingId(appId);

    try {
      await updateApplicationStatusByOps(
        appId,
        user.id,
        userRoles[0] || 'operations_admin',
        newStatus,
        `Status updated to ${newStatus} by operations officer.`,
        `Your application status has been updated to ${newStatus}.`
      );

      setApplications(
        applications.map((app) =>
          app.id === appId ? ({ ...app, status: newStatus } as Application) : app
        )
      );
    } catch (err: any) {
      alert(`Status update error: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Operations Application Queue</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review submitted candidate applications, verify compliance, and update status history.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center space-y-2">
          <FileText className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Submitted Applications Found</h3>
          <p className="text-xs text-slate-400">Applications submitted by candidates will appear here for verification.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app: any) => (
            <div key={app.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full text-[10px] font-bold uppercase">
                    Stage: {app.stage}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    Candidate: {app.candidates?.profiles?.full_name || 'Anonymous Candidate'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Vacancy: <span className="text-white font-semibold">{app.jobs?.title || 'UAE Requisition'}</span> | Country: {app.candidates?.profiles?.country_code || 'MOZ'}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400">Current Status:</span>
                  <span className="px-3 py-1 bg-slate-800 text-emerald-400 font-bold rounded-lg text-xs uppercase border border-slate-700">
                    {app.status}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-slate-400">
                  Email: <span className="text-slate-200">{app.candidates?.profiles?.email}</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(app.id, 'shortlisted')}
                    disabled={updatingId === app.id}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-colors flex items-center space-x-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Shortlist</span>
                  </button>
                  <button
                    onClick={() => handleStatusChange(app.id, 'rejected')}
                    disabled={updatingId === app.id}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs transition-colors flex items-center space-x-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
