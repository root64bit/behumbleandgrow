import React, { useState } from 'react';
import { Lock, FileCheck, CheckCircle, XCircle, Eye, ShieldCheck } from 'lucide-react';
import { generateSignedUrl } from '../../lib/storageSecurity';

export default function CandidateVerificationVault() {
  const [documents, setDocuments] = useState([
    {
      id: 'doc_101',
      candidateName: 'Amina Mabote',
      candidateCountry: 'Mozambique',
      documentType: 'International Passport',
      fileName: 'passport_amina_mabote.pdf',
      storagePath: 'candidate-docs-vault/mz_amina_passport.pdf',
      mimeType: 'application/pdf',
      fileSize: '2.4 MB',
      status: 'pending',
    },
    {
      id: 'doc_102',
      candidateName: 'Amina Mabote',
      candidateCountry: 'Mozambique',
      documentType: 'BSc Hospitality Degree Certificate',
      fileName: 'degree_certificate_amina.pdf',
      storagePath: 'candidate-docs-vault/mz_amina_degree.pdf',
      mimeType: 'application/pdf',
      fileSize: '1.8 MB',
      status: 'verified',
    },
    {
      id: 'doc_103',
      candidateName: 'Thabo Mbeki',
      candidateCountry: 'South Africa',
      documentType: 'Police Clearance Certificate',
      fileName: 'police_clearance_thabo.pdf',
      storagePath: 'candidate-docs-vault/za_thabo_police.pdf',
      mimeType: 'application/pdf',
      fileSize: '1.1 MB',
      status: 'pending',
    },
  ]);

  const [activeSignedUrl, setActiveSignedUrl] = useState(null);

  const handleGenerateSignedUrl = (storagePath) => {
    const signedData = generateSignedUrl(storagePath, 15);
    setActiveSignedUrl(signedData);
  };

  const handleVerify = (id, newStatus) => {
    setDocuments(documents.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Candidate Verification Vault</h2>
            <p className="text-xs text-slate-500">Private Storage & Pre-Signed Document Inspection Console</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200 flex items-center">
          <ShieldCheck className="w-3.5 h-3.5 mr-1" />
          Private Vault Active
        </span>
      </div>

      {activeSignedUrl && (
        <div className="mb-6 p-4 bg-slate-900 text-white rounded-xl text-xs space-y-2 font-mono">
          <div className="flex justify-between items-center text-emerald-400 font-bold">
            <span>Pre-Signed URL Generated (15-Min Expire):</span>
            <button onClick={() => setActiveSignedUrl(null)} className="text-slate-400 hover:text-white">Close</button>
          </div>
          <p className="break-all text-[11px] text-slate-300">{activeSignedUrl.signed_url}</p>
          <div className="text-[10px] text-slate-400">Expires at: {activeSignedUrl.expires_at}</div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="border border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50/50">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{doc.candidateCountry}</span>
                <h4 className="text-sm font-bold text-slate-900">{doc.candidateName}</h4>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                doc.status === 'verified' ? 'bg-emerald-100 text-emerald-800' :
                doc.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {doc.status}
              </span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs space-y-1">
              <div className="font-semibold text-slate-800">{doc.documentType}</div>
              <div className="text-slate-500 font-mono text-[11px] truncate">{doc.fileName}</div>
              <div className="text-slate-400 text-[10px]">{doc.fileSize} • {doc.mimeType}</div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                onClick={() => handleGenerateSignedUrl(doc.storagePath)}
                className="flex-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium flex items-center justify-center"
              >
                <Eye className="w-3.5 h-3.5 mr-1" />
                View Doc
              </button>
              <button
                onClick={() => handleVerify(doc.id, 'verified')}
                className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg"
                title="Verify Document"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleVerify(doc.id, 'rejected')}
                className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg"
                title="Reject Document"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
