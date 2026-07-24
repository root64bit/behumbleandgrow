import React, { useState } from 'react';
import { Shield, AlertCircle, CheckCircle2, UserX, FileText } from 'lucide-react';

export default function CompliancePartnerReview() {
  const [partners, setPartners] = useState([
    {
      id: '00000000-0000-0000-0000-000000000002',
      name: 'Mozambique Talent Solutions',
      country: 'MZ',
      licenseNumber: 'MZ-PARTNER-402',
      assignedLeads: 42,
      placedCandidates: 18,
      riskLevel: 'Low',
      status: 'active',
    },
    {
      id: '00000000-0000-0000-0000-000000000003',
      name: 'Cape Town Global Placements',
      country: 'ZA',
      licenseNumber: 'ZA-PARTNER-881',
      assignedLeads: 31,
      placedCandidates: 12,
      riskLevel: 'Medium',
      status: 'active',
    },
    {
      id: '00000000-0000-0000-0000-000000000099',
      name: 'Nairobi Apex Agency',
      country: 'KE',
      licenseNumber: 'KE-PARTNER-109',
      assignedLeads: 14,
      placedCandidates: 2,
      riskLevel: 'High',
      status: 'under_review',
    },
  ]);

  const handleToggleStatus = (partnerId) => {
    setPartners(partners.map(p => {
      if (p.id === partnerId) {
        const nextStatus = p.status === 'active' ? 'suspended' : 'active';
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Compliance & Partner Risk Review</h2>
            <p className="text-xs text-slate-500">Recruitment Agency Licensing Audit & Risk Monitoring Console</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-200">
          Compliance Scope Active
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold uppercase tracking-wider text-[10px] border-y border-slate-200">
            <tr>
              <th className="px-4 py-3">Agency Name</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">License No.</th>
              <th className="px-4 py-3">Leads / Placements</th>
              <th className="px-4 py-3">Risk Rating</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {partners.map((partner) => (
              <tr key={partner.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-4 py-3 font-semibold text-slate-900">{partner.name}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-slate-100 rounded font-mono font-bold text-slate-700">
                    {partner.country}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono">{partner.licenseNumber}</td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-slate-800">{partner.assignedLeads}</span> leads / <span className="font-semibold text-emerald-600">{partner.placedCandidates}</span> placed
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                    partner.riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-800' :
                    partner.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {partner.riskLevel} Risk
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`capitalize font-medium ${
                    partner.status === 'active' ? 'text-emerald-600' :
                    partner.status === 'under_review' ? 'text-amber-600' : 'text-rose-600 font-bold'
                  }`}>
                    {partner.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => handleToggleStatus(partner.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      partner.status === 'active'
                        ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    {partner.status === 'active' ? 'Suspend Agency' : 'Reactivate Agency'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
