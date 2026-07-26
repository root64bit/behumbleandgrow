import React from 'react';
import type { CandidateDocument } from '../../../lib/supabase/types';
import type { DocumentRequirement } from '../../../lib/candidate/documentReadiness';
import { CandidateDocumentCard } from './CandidateDocumentCard';

interface Props {
  requirements: DocumentRequirement[];
  documents: CandidateDocument[];
  onUpload: (category: string) => void;
  onPreview: (doc: CandidateDocument) => void;
  onReplace: (doc: CandidateDocument) => void;
}

export const CandidateDocumentRequirementGroup: React.FC<Props> = ({
  requirements,
  documents,
  onUpload,
  onPreview,
  onReplace,
}) => {
  return (
    <div className="space-y-4">
      {requirements.map((req) => {
        const matchingDoc = documents.find(
          (d) =>
            d.document_type === req.category &&
            d.verification_status !== 'superseded' &&
            d.verification_status !== 'archived'
        );

        return (
          <CandidateDocumentCard
            key={req.category}
            document={matchingDoc || null}
            category={req.category}
            categoryLabel={req.label}
            isRequired={req.required}
            onUpload={() => onUpload(req.category)}
            onPreview={onPreview}
            onReplace={onReplace}
          />
        );
      })}
    </div>
  );
};
