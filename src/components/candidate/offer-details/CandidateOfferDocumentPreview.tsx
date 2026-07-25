import React from 'react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

interface Props {
  url: string;
  onClose: () => void;
}

export const CandidateOfferDocumentPreview: React.FC<Props> = ({ url, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden text-left">
        <div className="p-4 bg-[#00122B] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-extrabold">Secure Offer Document Preview</h3>
              <p className="text-[10px] text-slate-400">Level 3 Ephemeral Signed Access Token (Expires in 10m)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 bg-slate-100 p-4 flex items-center justify-center">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-lg text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#006D44] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-[#00122B]">Signed Document URL Ready</h4>
              <p className="text-xs text-slate-500">
                Your ephemeral document access token has been generated. Select below to open or download.
              </p>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006D44] hover:bg-[#005232] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              <span>Open Document File</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            Close Preview Window
          </button>
        </div>
      </div>
    </div>
  );
};
