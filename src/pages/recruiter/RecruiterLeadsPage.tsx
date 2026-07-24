import React, { useState } from 'react';
import RecruitmentPartnerLayout from '../../layouts/RecruitmentPartnerLayout';
import { RecruiterService } from '../../services/recruiter.service';
import { PartnerLead } from '../../types/recruiter';
import { Search, Filter, Check, X, Clock, Briefcase, ChevronRight, UserCheck } from 'lucide-react';

export default function RecruiterLeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const leads = RecruiterService.getAssignedLeads();

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.candidateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.profession.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'new') return matchesSearch && lead.leadStatus === 'awaiting_acceptance';
    if (activeTab === 'accepted') return matchesSearch && lead.leadStatus === 'accepted';
    if (activeTab === 'submitted') return matchesSearch && lead.leadStatus === 'submitted_to_employer';
    return matchesSearch;
  });

  return (
    <RecruitmentPartnerLayout>
      <div className="space-y-6 text-left">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Assigned Candidate Leads</h1>
            <p className="text-xs text-slate-500">Manage candidate lead allocations assigned to your agency by Be Humble & Grow operations.</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Leads ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'new' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Awaiting Acceptance
            </button>
            <button
              onClick={() => setActiveTab('accepted')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'accepted' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Accepted
            </button>
            <button
              onClick={() => setActiveTab('submitted')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'submitted' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Submitted to Employer
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search candidate name, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Candidate</th>
                  <th className="py-3 px-3">Profession</th>
                  <th className="py-3 px-3">Experience</th>
                  <th className="py-3 px-3">Assigned Vacancy</th>
                  <th className="py-3 px-3">Recruiter</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">
                      <span>{lead.flag} </span>
                      <span>{lead.candidateName}</span>
                      <span className="text-[10px] font-mono text-slate-400 block">{lead.candidateId}</span>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800">{lead.profession}</td>
                    <td className="py-3 px-3 text-slate-600">{lead.experienceYears} yrs • {lead.englishLevel}</td>
                    <td className="py-3 px-3 font-semibold text-emerald-800">{lead.assignedJobTitle}</td>
                    <td className="py-3 px-3 text-slate-600">{lead.assignedRecruiterName || 'Unassigned'}</td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                        lead.leadStatus === 'accepted' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}>
                        {lead.leadStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button className="text-xs font-bold text-emerald-700 hover:text-emerald-900 px-2.5 py-1 bg-emerald-50 rounded-lg">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900">{lead.flag} {lead.candidateName}</h3>
                  <span className="text-[10px] font-mono text-slate-400">{lead.candidateId}</span>
                </div>
                <p className="text-xs text-slate-700 font-semibold">{lead.profession} ({lead.experienceYears} yrs)</p>
                <p className="text-[11px] text-emerald-700 font-bold">{lead.assignedJobTitle}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </RecruitmentPartnerLayout>
  );
}
