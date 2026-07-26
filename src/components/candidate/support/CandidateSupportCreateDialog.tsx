import React, { useState } from 'react';
import { X, Send, AlertCircle, Loader2 } from 'lucide-react';
import { CandidateSupportCategory, CANONICAL_SUPPORT_CATEGORIES } from '../../../lib/candidate/supportCategory';
import { validateSupportSubject, validateSupportDescription } from '../../../lib/candidate/supportValidation';
import { CreateSupportTicketPayload } from '../../../services/candidate-support.service';

interface CandidateSupportCreateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateSupportTicketPayload) => Promise<boolean>;
  isSubmitting?: boolean;
  serverError?: string;
}

export function CandidateSupportCreateDialog({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  serverError,
}: CandidateSupportCreateDialogProps) {
  const [category, setCategory] = useState<CandidateSupportCategory>('general');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [relatedEntityType, setRelatedEntityType] = useState<any>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const subjErr = validateSupportSubject(subject);
    const descErr = validateSupportDescription(description);

    if (subjErr || descErr) {
      setErrors({
        ...(subjErr ? { subject: subjErr } : {}),
        ...(descErr ? { description: descErr } : {}),
      });
      return;
    }

    setErrors({});
    const success = await onSubmit({
      category,
      subject,
      description,
      relatedEntityType: relatedEntityType || undefined,
    });

    if (success) {
      setSubject('');
      setDescription('');
      setCategory('general');
      setRelatedEntityType('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs text-left animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            Create Support Request
          </h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
          {serverError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 rounded-xl flex items-center gap-2 text-xs font-semibold text-rose-800 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Category Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CandidateSupportCategory)}
              disabled={isSubmitting}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              {Object.values(CANONICAL_SUPPORT_CATEGORIES).map((cat) => (
                <option key={cat.key} value={cat.key}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Related Entity Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Related Topic (Optional)
            </label>
            <select
              value={relatedEntityType}
              onChange={(e) => setRelatedEntityType(e.target.value)}
              disabled={isSubmitting}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="">General Candidate Inquiry</option>
              <option value="application">Job Application</option>
              <option value="document">Document Vault</option>
              <option value="interview">Video Interview</option>
              <option value="offer">Conditional Offer</option>
              <option value="placement">Placement & Relocation</option>
              <option value="profile">Profile & CV</option>
            </select>
          </div>

          {/* Subject Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Subject <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isSubmitting}
              placeholder="Brief summary of your inquiry (min 5 chars)"
              className={`w-full p-2.5 bg-slate-50 dark:bg-slate-800/80 border rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
                errors.subject ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
              }`}
            />
            {errors.subject && (
              <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 mt-1">
                {errors.subject}
              </p>
            )}
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Message Details <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              placeholder="Explain your question or issue in detail (min 20 chars)..."
              className={`w-full p-2.5 bg-slate-50 dark:bg-slate-800/80 border rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
                errors.description ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
              }`}
            ></textarea>
            {errors.description && (
              <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-all shadow-xs disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
