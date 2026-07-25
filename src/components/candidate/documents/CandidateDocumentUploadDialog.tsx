import React, { useState } from 'react';
import { Upload, Lock, X, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  initialCategory?: string;
  onClose: () => void;
  onUploadSubmit: (
    docType: 'candidate-cv' | 'candidate-identity' | 'candidate-certificates',
    file: File,
    expiryDate?: string
  ) => Promise<void>;
  uploading: boolean;
  uploadError?: string | null;
}

export const CandidateDocumentUploadDialog: React.FC<Props> = ({
  isOpen,
  initialCategory = 'candidate-cv',
  onClose,
  onUploadSubmit,
  uploading,
  uploadError,
}) => {
  const [docType, setDocType] = useState<'candidate-cv' | 'candidate-identity' | 'candidate-certificates'>(
    (initialCategory as any) || 'candidate-cv'
  );
  const [file, setFile] = useState<File | null>(null);
  const [expiryDate, setExpiryDate] = useState('');
  const [localErr, setLocalErr] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalErr('');

    if (!file) {
      setLocalErr('Please select a file to upload.');
      return;
    }

    const isIdentity = docType === 'candidate-identity';
    const maxSize = docType === 'candidate-cv' ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setLocalErr(`File size exceeds maximum limit of ${maxSize / (1024 * 1024)}MB.`);
      return;
    }

    try {
      await onUploadSubmit(docType, file, expiryDate || undefined);
      setFile(null);
      setExpiryDate('');
      onClose();
    } catch (err: any) {
      setLocalErr(err.message || 'Upload failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl space-y-4 text-left">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#006D44]" />
            <h2 className="text-base font-extrabold text-[#00122B]">Upload Confidential Document</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {(localErr || uploadError) && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{localErr || uploadError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Document Category</label>
            <select
              value={docType}
              onChange={(e: any) => setDocType(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#006D44]"
            >
              <option value="candidate-cv">Curriculum Vitae / Resume (candidate-cv)</option>
              <option value="candidate-identity">International Passport / National ID (candidate-identity)</option>
              <option value="candidate-certificates">Educational & Professional Certificates (candidate-certificates)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select File ({docType === 'candidate-cv' ? 'PDF max 5MB' : 'PDF, JPEG, PNG, WebP max 10MB'})
            </label>
            <input
              type="file"
              accept={docType === 'candidate-cv' ? '.pdf' : '.pdf,.jpg,.jpeg,.png,.webp'}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
            />
          </div>

          {docType === 'candidate-identity' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Passport / Document Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#006D44]"
              />
            </div>
          )}

          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-900 text-xs flex items-start gap-2">
            <Lock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>
              Your file is encrypted and saved to private storage. Access is limited to authorized application reviewers.
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-5 py-2 bg-[#006D44] hover:bg-[#005232] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{uploading ? 'Encrypting & Uploading...' : 'Upload File'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
