import React, { useState } from 'react';
import { PartnerLead } from '../../types/recruiter';
import { 
  UserCheck, 
  Check, 
  X, 
  Clock, 
  Briefcase, 
  User, 
  AlertCircle, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewLeadsListProps {
  leads: PartnerLead[];
}

export default function NewLeadsList({ leads }: NewLeadsListProps) {
  const [selectedLead, setSelectedLead] = useState<PartnerLead | null>(null);
  const [modalMode, setModalMode] = useState<'accept' | 'decline' | null>(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState('Sarah Jenkins');
  const [declineReason, setDeclineReason] = useState('Insufficient relevant experience');
  const [declineExplanation, setDeclineExplanation] = useState('');
  const [actionDoneMessage, setActionDoneMessage] = useState<string | null>(null);

  const handleOpenAccept = (lead: PartnerLead) => {
    setSelectedLead(lead);
    setModalMode('accept');
  };

  const handleOpenDecline = (lead: PartnerLead) => {
    setSelectedLead(lead);
    setModalMode('decline');
  };

  const handleConfirmAccept = () => {
    if (!selectedLead) return;
    setActionDoneMessage(`Lead ${selectedLead.candidateName} (${selectedLead.candidateId}) successfully accepted and assigned to ${selectedRecruiter}! Operations notified.`);
    setModalMode(null);
    setSelectedLead(null);
    setTimeout(() => setActionDoneMessage(null), 5000);
  };

  const handleConfirmDecline = () => {
    if (!selectedLead) return;
    setActionDoneMessage(`Lead ${selectedLead.candidateName} (${selectedLead.candidateId}) declined (${declineReason}). Returned to Operations for reassignment.`);
    setModalMode(null);
    setSelectedLead(null);
    setTimeout(() => setActionDoneMessage(null), 5000);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">New Assigned Candidate Leads</h2>
          <p className="text-xs text-slate-500">Qualified candidates routed by operations requiring lead acceptance or recruiter assignment.</p>
        </div>
        <Link 
          to="/recruiter/leads"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>View All Leads ({leads.length})</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {actionDoneMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-800 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{actionDoneMessage}</span>
          </div>
          <button onClick={() => setActionDoneMessage(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leads.map((lead) => (
          <div key={lead.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-3 flex flex-col justify-between hover:border-emerald-300 transition-all">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{lead.flag}</span>
                    <span>{lead.candidateName}</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">{lead.candidateId} • {lead.country}</p>
                </div>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                  lead.leadPriority === 'urgent' ? 'bg-rose-100 text-rose-800 border-rose-200' : 'bg-amber-100 text-amber-800 border-amber-200'
                }`}>
                  {lead.leadPriority}
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100">
                <p className="font-bold text-slate-900">{lead.profession}</p>
                <p className="text-[11px] text-slate-500">{lead.experienceYears} Years Exp • {lead.englishLevel}</p>
                <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{lead.assignedJobTitle}</span>
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Deadline: {lead.responseDeadline}</span>
                </span>
                <span className="font-semibold text-slate-600">
                  {lead.assignedRecruiterName || 'Unassigned'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-200/60 flex items-center gap-2">
              <button
                onClick={() => handleOpenAccept(lead)}
                className="flex-1 btn btn-primary py-2 text-xs font-bold shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Accept Lead</span>
              </button>

              <button
                onClick={() => handleOpenDecline(lead)}
                className="px-3 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 rounded-xl text-xs font-bold transition-colors"
                title="Decline lead with reason"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Accept Lead Modal */}
      {modalMode === 'accept' && selectedLead && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900">Accept Lead Assignment</h3>
              <button onClick={() => setModalMode(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600">
                You are accepting lead <strong className="text-slate-900">{selectedLead.candidateName}</strong> ({selectedLead.candidateId}) for vacancy <strong className="text-slate-900">{selectedLead.assignedJobTitle}</strong>.
              </p>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assign Internal Recruiter</label>
                <select
                  value={selectedRecruiter}
                  onChange={(e) => setSelectedRecruiter(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Sarah Jenkins">Sarah Jenkins (Lead Recruiter)</option>
                  <option value="David Ochieng">David Ochieng (Senior Recruiter)</option>
                  <option value="Amina Kimani">Amina Kimani (Recruiter)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button onClick={() => setModalMode(null)} className="btn btn-ghost py-2 text-xs">
                Cancel
              </button>
              <button onClick={handleConfirmAccept} className="btn btn-primary py-2 text-xs">
                Confirm Acceptance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decline Lead Modal */}
      {modalMode === 'decline' && selectedLead && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-rose-900">Decline Candidate Lead</h3>
              <button onClick={() => setModalMode(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600">
                Declining will return candidate <strong className="text-slate-900">{selectedLead.candidateName}</strong> to Be Humble & Grow Operations for review.
              </p>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Decline Reason (Required)</label>
                <select
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Candidate does not meet vacancy requirements">Candidate does not meet vacancy requirements</option>
                  <option value="Insufficient relevant experience">Insufficient relevant experience</option>
                  <option value="Required language not available">Required language not available</option>
                  <option value="Candidate documents incomplete">Candidate documents incomplete</option>
                  <option value="Partner capacity reached">Partner capacity reached</option>
                  <option value="Candidate unavailable">Candidate unavailable</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Partner Note to Operations (Optional)</label>
                <textarea
                  rows={3}
                  value={declineExplanation}
                  onChange={(e) => setDeclineExplanation(e.target.value)}
                  placeholder="Provide additional details..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button onClick={() => setModalMode(null)} className="btn btn-ghost py-2 text-xs">
                Cancel
              </button>
              <button onClick={handleConfirmDecline} className="btn bg-rose-600 hover:bg-rose-700 text-white py-2 text-xs font-bold rounded-xl">
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
