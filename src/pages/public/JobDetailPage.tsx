import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getJobBySlug } from '../../services/job.service';
import { submitApplication } from '../../services/application.service';
import { useAuth } from '../../lib/auth/AuthContext';
import type { Job } from '../../lib/supabase/types';
import { MapPin, DollarSign, Briefcase, CheckCircle2, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user, candidate } = useAuth();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [appError, setAppError] = useState('');
  const [appSuccess, setAppSuccess] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (slug) {
      getJobBySlug(slug).then((data) => {
        setJob(data);
        setLoading(false);
      });
    }
  }, [slug]);

  const handleApply = async () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/jobs/${slug}` } } });
      return;
    }

    if (!consent) {
      setAppError('Please check the consent checkbox to submit your application.');
      return;
    }

    if (!job) return;

    setApplying(true);
    setAppError('');

    try {
      await submitApplication(user.id, job.id, {
        submitted_via: 'web_portal',
      });
      setAppSuccess(true);
    } catch (err: any) {
      setAppError(err.message || 'Application submission failed.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Vacancy Not Found</h2>
        <p className="text-xs text-slate-500">The requested job listing may have been filled or archived.</p>
        <Link to="/jobs" className="inline-flex items-center text-xs text-emerald-600 font-bold hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Jobs Listing
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <Link to="/jobs" className="inline-flex items-center text-xs text-slate-500 hover:text-slate-800">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to All Vacancies
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
            Verified Requisition
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{job.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{job.location || 'Dubai, UAE'}</span>
            </div>
            {job.salary_range && (
              <div className="flex items-center space-x-1 text-emerald-700 font-bold">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <span>{job.salary_range}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <h3 className="text-base font-bold text-slate-900">Vacancy Description & Benefits</h3>
          <p className="whitespace-pre-line text-xs leading-relaxed text-slate-600">{job.description}</p>
        </div>

        {/* Application Submission Box */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Apply for this Position</span>
          </div>

          {appSuccess ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-3 text-xs text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-sm">Application Submitted!</div>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Your profile dossier has been persisted and assigned to internal operations review.
                </p>
                <Link to="/candidate/applications" className="inline-block text-xs font-bold underline mt-2">
                  View My Applications
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {appError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-2 text-xs text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{appError}</span>
                </div>
              )}

              <label className="flex items-start space-x-2 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>
                  I authorize Be Humble & Grow to share my verified candidate profile and documents with the verified employer for evaluation.
                </span>
              </label>

              <button
                onClick={handleApply}
                disabled={applying}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
              >
                <span>{user ? (applying ? 'Submitting...' : 'Submit Application') : 'Sign In to Apply'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
