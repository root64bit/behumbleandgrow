import React from 'react';
import { X, ExternalLink, ShieldCheck, Loader2 } from 'lucide-react';
import type { CandidateDocument } from '../../../lib/supabase/types';
import { getSensitivitySignedUrlDuration } from '../../../services/storage.service';

interface Props {
  document: CandidateDocument | null;
  signedUrl: string | null;
  loading: boolean;
  onClose: () => void;
}

export const CandidateDocumentPreviewModal: React.FC<Props> = ({
  document,
  signedUrl,
  loading,
  onClose,
}) => {
  if (!document) return null;

  const isImage = document.mime_type?.startsWith('image/') || document.file_name?.match(/\.(jpg|jpeg|png|webp)$/i);
  const isPdf = document.mime_type === 'application/pdf' || document.file_name?.endsWith('.pdf');
  const durationMins = getSensitivitySignedUrlDuration(document.document_type) / 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col text-left">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-[#00122B]">{document.file_name}</h2>
            <p className="text-xs text-slate-500">
              Sensitivity Signed URL (Expires in {durationMins} minutes)
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
            aria-label="Close Preview Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-slate-50 rounded-xl p-4 flex items-center justify-center min-h-[350px]">
          {loading ? (
            <div className="flex flex-col items-center gap-2 text-slate-500">
              <Loader2 className="w-8 h-8 text-[#006D44] animate-spin" />
              <span className="text-xs font-semibold">Generating temporary signed URL...</span>
            </div>
          ) : !signedUrl ? (
            <div className="text-center p-6">
              <p className="text-xs text-slate-600 font-semibold mb-2">
                Could not generate secure preview. The file link may have expired.
              </p>
            </div>
          ) : isImage ? (
            <img
              src={signedUrl}
              alt={document.file_name}
              className="max-h-[500px] max-w-full object-contain rounded-lg shadow-sm"
            />
          ) : isPdf ? (
            <iframe
              src={signedUrl}
              title={document.file_name}
              className="w-full h-[500px] rounded-lg border border-slate-200"
            />
          ) : (
            <div className="text-center p-6 space-y-3">
              <p className="text-xs text-slate-600">
                Direct browser preview is not supported for this document format ({document.mime_type}).
              </p>
              <a
                href={signedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#006D44] text-white text-xs font-bold rounded-xl shadow-sm"
              >
                <span>Download Securely</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#006D44]" />
            <span>Confidential stream — signed URL clears on modal close</span>
          </div>

          {signedUrl && (
            <a
              href={signedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#006D44] hover:underline font-bold flex items-center gap-1"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
