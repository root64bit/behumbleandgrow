import React, { useState } from 'react';
import PortalNavigation from './PortalNavigation';
import EmployerJobCreateModal from './EmployerJobCreateModal';
import FinanceRefundApprovalModal from './FinanceRefundApprovalModal';
import CompliancePartnerReview from './CompliancePartnerReview';
import AdminRoleManagement from './AdminRoleManagement';
import CandidateVerificationVault from './CandidateVerificationVault';
import { 
  Briefcase, 
  Users, 
  Building2, 
  DollarSign, 
  ShieldCheck, 
  Sliders, 
  Plus, 
  Lock, 
  CheckCircle,
  FileText,
  UserCheck
} from 'lucide-react';

export default function PortalManager({ children }) {
  const [activePortal, setActivePortal] = useState('public');
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [refundModalData, setRefundModalData] = useState(null);

  if (activePortal === 'public') {
    return (
      <div>
        <PortalNavigation activePortal={activePortal} setActivePortal={setActivePortal} />
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      <PortalNavigation activePortal={activePortal} setActivePortal={setActivePortal} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* CANDIDATE PORTAL */}
        {activePortal === 'candidate' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
                  Mozambique Applicant
                </span>
                <h1 className="text-2xl font-bold text-slate-900 mt-2">Candidate Portal — Amina Mabote</h1>
                <p className="text-xs text-slate-500">Candidate Stage: <span className="font-semibold text-emerald-600">Employer Submitted</span> | Visa Status: Initiated</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Target UAE Salary:</span>
                <div className="text-lg font-bold text-slate-900">14,000 AED / mo</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm">
                  <UserCheck className="w-4 h-4" />
                  <span>Onboarding Progress</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-4/5"></div>
                </div>
                <div className="text-xs text-slate-500">80% completed — Verification Documents Uploaded</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 text-blue-700 font-bold text-sm">
                  <Briefcase className="w-4 h-4" />
                  <span>Active Applications</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">2 Vacancies</div>
                <div className="text-xs text-slate-500">Senior Hospitality Manager - Dubai (Submitted)</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 text-purple-700 font-bold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>Verification Fee Status</span>
                </div>
                <div className="text-2xl font-bold text-emerald-600">Paid ($150 AED)</div>
                <div className="text-xs text-slate-500">Stripe Payment ID: <span className="font-mono text-[11px]">pi_3Mx901</span></div>
              </div>
            </div>
          </div>
        )}

        {/* PARTNER PORTAL */}
        {activePortal === 'partner' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider">
                  Partner Agency
                </span>
                <h1 className="text-2xl font-bold text-slate-900 mt-2">Mozambique Talent Solutions Portal</h1>
                <p className="text-xs text-slate-500">License: MZ-PARTNER-402 | Active Leads: 42 candidates</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Assigned Lead Pipeline</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-200">
                    <div>
                      <span className="font-bold text-slate-800">Amina Mabote</span> (Mozambique)
                      <div className="text-slate-500 text-[11px]">Hospitality Manager Candidate</div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[10px]">
                      Shortlisted
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-200">
                    <div>
                      <span className="font-bold text-slate-800">Jose Eduardo</span> (Mozambique)
                      <div className="text-slate-500 text-[11px]">Construction Engineer</div>
                    </div>
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-800 font-bold rounded-lg text-[10px]">
                      Assigned
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Partner Placement Revenue</h3>
                <div className="text-3xl font-bold text-emerald-600">$48,500 AED</div>
                <p className="text-xs text-slate-500">Commission payouts processed for 18 successful Dubai candidate placements.</p>
              </div>
            </div>
          </div>
        )}

        {/* EMPLOYER PORTAL */}
        {activePortal === 'employer' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
                  Employer Portal
                </span>
                <h1 className="text-2xl font-bold text-slate-900 mt-2">Jumeirah Luxury Hospitality Group</h1>
                <p className="text-xs text-slate-500">Verified UAE Employer | 3 Published Vacancies</p>
              </div>
              <button
                onClick={() => setIsJobModalOpen(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Post New UAE Vacancy
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Submitted Job Applicants</h3>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Amina Mabote</div>
                  <div className="text-slate-500">Applied for: Senior Hospitality Manager - Dubai | Match Score: <span className="font-bold text-emerald-600">92%</span></div>
                </div>
                <div className="space-x-2">
                  <button className="px-3 py-1.5 bg-slate-900 text-white font-semibold rounded-lg text-xs">
                    Review Dossier
                  </button>
                  <button className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg text-xs">
                    Issue Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* OPERATIONS CONSOLE */}
        {activePortal === 'operations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold uppercase tracking-wider">
                Internal Ops
              </span>
              <h1 className="text-2xl font-bold text-slate-900 mt-2">Operations Control Console</h1>
              <p className="text-xs text-slate-500">Global lead distribution, verification queue, and relocation pipeline management.</p>
            </div>

            <CandidateVerificationVault />
          </div>
        )}

        {/* FINANCE & COMPLIANCE CONSOLE */}
        {activePortal === 'finance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
                  Finance & Compliance
                </span>
                <h1 className="text-2xl font-bold text-slate-900 mt-2">Financial Ledger & Compliance Risk Engine</h1>
                <p className="text-xs text-slate-500">Enforcing MFA, Dual-Approval Four-Eyes Policy & Append-Only Audit Logs.</p>
              </div>
              <button
                onClick={() => setRefundModalData({
                  paymentId: 'pi_3Mx901_test',
                  candidateName: 'Amina Mabote',
                  amount: 750.00,
                  requestedBy: 'usr_finance_officer_01',
                  reason: 'Duplicate payment adjustment request',
                })}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-sm"
              >
                <Lock className="w-4 h-4 mr-1" />
                Test Refund Approval ($750 AED)
              </button>
            </div>

            <CompliancePartnerReview />
          </div>
        )}

        {/* ADMIN GOVERNANCE CONSOLE */}
        {activePortal === 'admin' && (
          <div className="space-y-6">
            <AdminRoleManagement />
          </div>
        )}
      </main>

      <EmployerJobCreateModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
      />

      <FinanceRefundApprovalModal
        isOpen={!!refundModalData}
        onClose={() => setRefundModalData(null)}
        refundRequest={refundModalData}
      />
    </div>
  );
}
