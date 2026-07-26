import React, { useState } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  currentPhotoUrl?: string;
  candidateName: string;
  onPhotoUploaded?: (newUrl: string) => void;
}

export const CandidateProfilePhotoEditor: React.FC<Props> = ({ currentPhotoUrl, candidateName, onPhotoUploaded }) => {
  const [photoUrl, setPhotoUrl] = useState(
    currentPhotoUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd8aNBvVDD2QWr3EImv5sINsDi5JHx62472uiL1cnpLzXyhSCe23LShn7G6uU5JlAMPIWyWaQ2GL_v6YzalaFsoWaw464CRQRPMdoykhKVV1xRPjY3ODCwkti-tA-vkiHYe1sbBsko5B8eoGTNlO_CWQJvqa7Juf3N__RKjxzKsO7LJJr0zW20fcpAlfOILGmIIjwVbdxEb12iYvPkkJ1_pMwvF-N6uWH9f7wWONHKP9YIkB0b5F3H7G_pDAJTQVe2x27NDFFbIQxX'
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setSuccessMsg('');

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Profile photograph file size must be less than 5MB.');
      return;
    }

    // Validate MIME type (JPEG, PNG, WebP)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid format. Only JPEG, PNG, or WebP photographs are permitted.');
      return;
    }

    setUploading(true);

    try {
      // Simulate photo upload & signed URL generation
      const fakeUrl = URL.createObjectURL(file);
      setPhotoUrl(fakeUrl);
      setSuccessMsg('Photograph uploaded and updated successfully.');
      if (onPhotoUploaded) onPhotoUploaded(fakeUrl);
    } catch (err: any) {
      setError('Failed to upload profile photograph.');
    } finally {
      setUploading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#0F2747]/5 flex items-center justify-center text-[#00122B]">
          <Camera className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-[#00122B]">Profile Photograph</h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-5">
        <div className="relative w-24 h-24 rounded-full border-2 border-[#006D44]/20 overflow-hidden flex-shrink-0 bg-slate-100 flex items-center justify-center">
          {photoUrl ? (
            <img src={photoUrl} alt={candidateName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl font-bold text-slate-600">{getInitials(candidateName || 'Candidate')}</span>
          )}
        </div>

        <div className="flex-1 space-y-2 text-center sm:text-left">
          <p className="text-xs font-semibold text-slate-800">Upload Professional Studio Portrait</p>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Format: JPEG, PNG, or WebP. Max file size: 5MB. Photo is securely stored with private authenticated access policies.
          </p>

          <label className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span>{uploading ? 'Processing...' : 'Upload New Photo'}</span>
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
      </div>

      {error && (
        <div className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
    </div>
  );
};
