import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCandidateDetailsForOps } from '../../services/operations.service';
import { getDocumentSignedUrl } from '../../services/document.service';
import type { CandidateDocument } from '../../lib/supabase/types';
import { User, FileText, ArrowLeft, Lock, ShieldCheck } from 'lucide-react';

export default function OperationsCandidateDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getCandidateDetailsForOps(id).then((res) => {
        setDetails(res);
        setLoading(false);
      });
    }
  }, [id]);

  const handleSignedUrl = async (doc: CandidateDocument) => {
    try {
      const url = await getDocumentSignedUrl(doc);
      if (url) window.open(url, '_blank');
      else alert('Signed URL generation failed');
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!details || !details.profile) {
    return (
      <div className="text-center py-12 space-y-3">
        <h3 className="text-lg font-bold text-white">Candidate Dossier Not Found</h3>
        <Link to="/operations/candidates" className="text-xs text-indigo-400 underline">
          Back to Candidate Pool
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link to="/operations/candidates" className="inline-flex items-center text-xs text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Candidate Pool
      </Link>

      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex justify-between items-start border-b border-slate-800 pb-4">
          <div>
            <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-bold uppercase">
              Ops Inspection Mode
            </span>
            <h1 className="text-2xl font-bold text-white mt-1">{details.profile.full_name}</h1>
            <p className="text-xs text-slate-400">{details.profile.email} | {details.profile.country_code}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Verification Status:</span>
            <span className="text-xs font-bold text-emerald-400 uppercase">{details.candidate?.verification_status || 'pending'}</span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <User className="w-4 h-4 text-indigo-400" />
            <span>Candidate Background</span>
          </h3>
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300">
            <div><strong className="text-white">Headline:</strong> {details.candidate?.headline || 'Not specified'}</div>
            <div><strong className="text-white">Current Location:</strong> {details.candidate?.current_location || 'Not specified'}</div>
            <div><strong className="text-white">Bio / Summary:</strong> {details.candidate?.bio || 'Not specified'}</div>
            <div><strong className="text-white">Skills:</strong> {details.candidate?.skills?.join(', ') || 'None listed'}</div>
          </div>
        </div>

        {/* Uploaded Documents */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Uploaded Verification Vault Documents</span>
          </h3>

          {details.documents.length === 0 ? (
            <p className="text-xs text-slate-500">No documents uploaded by this candidate.</p>
          ) : (
            <div className="space-y-2">
              {details.documents.map((doc: CandidateDocument) => (
                <div key={doc.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{doc.file_name}</div>
                    <div className="text-[11px] text-slate-400">Type: {doc.document_type} | Classification: {doc.classification}</div>
                  </div>
                  <button
                    onClick={() => handleSignedUrl(doc)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs flex items-center space-x-1"
                  >
                    <Lock className="w-3.5 h-3.5 mr-1" />
                    <span>View Signed URL</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
