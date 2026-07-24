import React, { useEffect, useState } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import { uploadAndSaveDocument, getCandidateDocuments, getDocumentSignedUrl } from '../../services/document.service';
import type { CandidateDocument } from '../../lib/supabase/types';
import { FileText, Upload, ShieldCheck, AlertCircle, CheckCircle2, Lock } from 'lucide-react';

export default function CandidateDocumentsPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<CandidateDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [docType, setDocType] = useState<'candidate-cv' | 'candidate-identity' | 'candidate-certificates'>('candidate-cv');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      getCandidateDocuments(user.id).then((docs) => {
        setDocuments(docs);
        setLoading(false);
      });
    }
  }, [user]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !file) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setError('');
    setMessage('');

    try {
      const newDoc = await uploadAndSaveDocument(user.id, docType, file);
      setDocuments([newDoc, ...documents]);
      setMessage(`Document ${file.name} uploaded successfully and persisted to confidential storage.`);
      setFile(null);
    } catch (err: any) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleViewSignedUrl = async (doc: CandidateDocument) => {
    try {
      const url = await getDocumentSignedUrl(doc);
      if (url) {
        window.open(url, '_blank');
      } else {
        alert('Could not generate signed URL.');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Private Verification Vault</h1>
        <p className="text-xs text-slate-500 mt-1">
          Confidential document storage protected by server-side RLS and short-lived signed URLs.
        </p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
          <Upload className="w-4 h-4 text-emerald-600" />
          <span>Upload Confidential Document</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Document Classification Type</label>
            <select
              value={docType}
              onChange={(e: any) => setDocType(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="candidate-cv">Curriculum Vitae / Resume (candidate-cv)</option>
              <option value="candidate-identity">International Passport (candidate-identity)</option>
              <option value="candidate-certificates">Educational Certificate / Diploma (candidate-certificates)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select File (PDF, JPEG, PNG max 10MB)</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-2 transition-colors"
        >
          <Lock className="w-4 h-4" />
          <span>{uploading ? 'Encrypting & Persisting...' : 'Upload to Confidential Vault'}</span>
        </button>
      </form>

      {/* Uploaded Documents List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
          <FileText className="w-4 h-4 text-emerald-600" />
          <span>Persisted Document Records</span>
        </h3>

        {loading ? (
          <div className="flex justify-center py-6">
            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : documents.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-6">No verification documents uploaded yet.</p>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{doc.file_name}</div>
                  <div className="text-slate-500 text-[11px]">
                    Type: <span className="font-mono">{doc.document_type}</span> | Status: <span className="font-semibold text-emerald-600 uppercase">{doc.verification_status}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleViewSignedUrl(doc)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center space-x-1"
                >
                  <Lock className="w-3 h-3 mr-1 text-emerald-400" />
                  <span>Get Signed URL</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
