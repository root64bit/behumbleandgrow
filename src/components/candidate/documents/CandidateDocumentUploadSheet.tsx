import React from 'react';
import { Camera, Image as ImageIcon, FolderOpen, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: 'camera' | 'gallery' | 'files') => void;
}

export const CandidateDocumentUploadSheet: React.FC<Props> = ({ isOpen, onClose, onSelectOption }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h2 className="text-base font-extrabold text-[#00122B]">Add Verification Document</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-500 mb-6 text-center">
          Select a source to upload your passport, identity document, or CV certificate
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => onSelectOption('camera')}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#00122B] transition-colors"
          >
            <Camera className="w-7 h-7 text-[#006D44]" />
            <span className="text-xs font-bold">Camera</span>
          </button>

          <button
            onClick={() => onSelectOption('gallery')}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#00122B] transition-colors"
          >
            <ImageIcon className="w-7 h-7 text-amber-600" />
            <span className="text-xs font-bold">Gallery</span>
          </button>

          <button
            onClick={() => onSelectOption('files')}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#00122B] transition-colors"
          >
            <FolderOpen className="w-7 h-7 text-[#00122B]" />
            <span className="text-xs font-bold">Files</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-[#00122B] font-bold text-xs rounded-xl"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
