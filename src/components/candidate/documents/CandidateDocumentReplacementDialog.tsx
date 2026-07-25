import React, { useState } from 'react';
import { RefreshCw, Lock, X, AlertCircle } from 'lucide-react';
import type { CandidateDocument } from '../../../lib/supabase/types';

interface Props {
  isOpen: boolean;
  document: CandidateDocument | null;
  onClose: () => void;
  onReplaceSubmit: (previousDoc: CandidateDocument, file: File, expiryDate?: string) => Promise<void>;
  uploading: boolean;
}

export const CandidateDocumentReplacementDialog: React.FC<Props> = ({
  isOpen,
  document,
  onClose,
  onReplaceSubmit,
  uploading,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [expiryDate, setExpiryDate] = useState('');
  const [localErr, setLocalErr] = useState('');

  if (!isOpen || !document) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalErr('');

    if (!file) {
      setLocalErr('Please select a replacement file.');
      return;
    }

    try {
      await onReplaceSubmit(document, file, expiryDate || undefined);
      setFile(null);
      onClose();
    } catch (err: any) {
      setLocalErr(err.message || 'Replacement upload failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl space-y-4 text-left">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-[#006D44]" />
            <h2 className="text-base font-extrabold text-[#00122B]">Replace Document Version</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {localErr && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{localErr}</span>
          </div>
        )}

        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
          <span className="font-bold">Immutable Versioning:</span> Uploading a replacement creates a new document version and sets status to <span className="font-bold">Pending Review</span>. Previous version history remains preserved.
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Current File Being Replaced</label>
            <div className="p-2.5 bg-slate-100 rounded-xl text-xs text-slate-800 font-mono">
              {document.file_name} ({document.document_type})
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Replacement File</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
            />
          </div>

          {document.document_type === 'candidate-identity' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Updated Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
              />
            </div>
          )}

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
              <span>{uploading ? 'Processing Replacement...' : 'Submit Replacement'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
