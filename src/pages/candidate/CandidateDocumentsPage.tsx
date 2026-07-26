import React, { useState } from 'react';
import { useCandidateDocuments } from '../../hooks/candidate/useCandidateDocuments';
import { DEFAULT_PLATFORM_REQUIREMENTS } from '../../lib/candidate/documentReadiness';
import { CandidateDocumentVaultHeader } from '../../components/candidate/documents/CandidateDocumentVaultHeader';
import { CandidateDocumentReadinessSummary } from '../../components/candidate/documents/CandidateDocumentReadinessSummary';
import { CandidateDocumentRequirementGroup } from '../../components/candidate/documents/CandidateDocumentRequirementGroup';
import { CandidateDocumentUploadSheet } from '../../components/candidate/documents/CandidateDocumentUploadSheet';
import { CandidateDocumentUploadDialog } from '../../components/candidate/documents/CandidateDocumentUploadDialog';
import { CandidateDocumentReplacementDialog } from '../../components/candidate/documents/CandidateDocumentReplacementDialog';
import { CandidateDocumentPreviewModal } from '../../components/candidate/documents/CandidateDocumentPreviewModal';
import { CandidateDocumentRejectionNotice } from '../../components/candidate/documents/CandidateDocumentRejectionNotice';
import { CandidateDocumentExpiryNotice } from '../../components/candidate/documents/CandidateDocumentExpiryNotice';
import { CandidateDocumentSecurityNotice } from '../../components/candidate/documents/CandidateDocumentSecurityNotice';
import { CandidateDocumentEmptyState } from '../../components/candidate/documents/CandidateDocumentEmptyState';
import { CandidateDocumentSkeleton } from '../../components/candidate/documents/CandidateDocumentSkeleton';
import { CandidateDocumentErrorState } from '../../components/candidate/documents/CandidateDocumentErrorState';
import { CheckCircle2, AlertCircle, Upload } from 'lucide-react';
import type { CandidateDocument } from '../../lib/supabase/types';

export default function CandidateDocumentsPage() {
  const {
    documentsState,
    readiness,
    uploading,
    uploadError,
    uploadSuccessMsg,
    previewDoc,
    previewSignedUrl,
    previewLoading,
    uploadDoc,
    replaceDoc,
    generatePreview,
    closePreview,
    refetch,
  } = useCandidateDocuments();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedUploadCategory, setSelectedUploadCategory] = useState<string>('candidate-cv');
  const [replaceTargetDoc, setReplaceTargetDoc] = useState<CandidateDocument | null>(null);

  if (documentsState.status === 'loading') {
    return <CandidateDocumentSkeleton />;
  }

  if (documentsState.status === 'error') {
    return <CandidateDocumentErrorState message={documentsState.message} onRetry={refetch} />;
  }

  const activeDocs = documentsState.status === 'success' ? documentsState.data : [];
  const rejectedDocs = activeDocs.filter(
    (d) => d.verification_status === 'rejected' || d.verification_status === 'replacement_requested'
  );
  const expiringDocs = activeDocs.filter((d) => {
    if (!d.expiry_date) return false;
    const days = (new Date(d.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return days > 0 && days <= 90;
  });

  const handleOpenUpload = (category = 'candidate-cv') => {
    setSelectedUploadCategory(category);
    setIsUploadDialogOpen(true);
  };

  const handleOpenReplace = (doc: CandidateDocument) => {
    setReplaceTargetDoc(doc);
  };

  const handleSheetOption = (option: 'camera' | 'gallery' | 'files') => {
    setIsSheetOpen(false);
    setIsUploadDialogOpen(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24 text-left">
      {/* Top Header */}
      <CandidateDocumentVaultHeader />

      {/* Upload Success Feedback */}
      {uploadSuccessMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#006D44]" />
            <span>{uploadSuccessMsg}</span>
          </div>
        </div>
      )}

      {/* Global Upload Error Feedback */}
      {uploadError && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-sm">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Verification Readiness Summary */}
      <CandidateDocumentReadinessSummary readiness={readiness} onUploadClick={() => handleOpenUpload()} />

      {/* Action Notices */}
      <CandidateDocumentRejectionNotice rejectedDocs={rejectedDocs} onReplaceClick={handleOpenReplace} />
      <CandidateDocumentExpiryNotice expiringDocs={expiringDocs} />

      {/* Document Requirements Group */}
      {documentsState.status === 'empty' ? (
        <CandidateDocumentEmptyState onUploadClick={() => handleOpenUpload()} />
      ) : (
        <CandidateDocumentRequirementGroup
          requirements={DEFAULT_PLATFORM_REQUIREMENTS}
          documents={activeDocs}
          onUpload={handleOpenUpload}
          onPreview={generatePreview}
          onReplace={handleOpenReplace}
        />
      )}

      {/* Security & Privacy Notice */}
      <CandidateDocumentSecurityNotice />

      {/* Mobile Floating Action Button */}
      <div className="fixed bottom-20 left-0 w-full p-4 md:hidden z-40 bg-gradient-to-t from-[#FAF9FC] via-[#FAF9FC]/90 to-transparent">
        <button
          onClick={() => setIsSheetOpen(true)}
          className="w-full bg-[#006D44] hover:bg-[#005232] text-white h-14 rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Upload className="w-5 h-5" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Mobile Slide-Up Action Sheet */}
      <CandidateDocumentUploadSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSelectOption={handleSheetOption}
      />

      {/* Desktop Upload Modal Dialog */}
      <CandidateDocumentUploadDialog
        isOpen={isUploadDialogOpen}
        initialCategory={selectedUploadCategory}
        onClose={() => setIsUploadDialogOpen(false)}
        onUploadSubmit={uploadDoc}
        uploading={uploading}
        uploadError={uploadError}
      />

      {/* Replacement Modal Dialog */}
      <CandidateDocumentReplacementDialog
        isOpen={!!replaceTargetDoc}
        document={replaceTargetDoc}
        onClose={() => setReplaceTargetDoc(null)}
        onReplaceSubmit={replaceDoc}
        uploading={uploading}
      />

      {/* Secure Preview Modal (Signed URL clears on close) */}
      <CandidateDocumentPreviewModal
        document={previewDoc}
        signedUrl={previewSignedUrl}
        loading={previewLoading}
        onClose={closePreview}
      />
    </div>
  );
}
