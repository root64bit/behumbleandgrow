import React, { useState } from 'react';
import { Sliders, Key, UserCheck, ShieldCheck, Plus, Check } from 'lucide-react';

export default function AdminRoleManagement() {
  const [selectedRole, setSelectedRole] = useState('partner_admin');
  const [permissionsList, setPermissionsList] = useState([
    { id: '1', code: 'candidate.profile.read_own', module: 'candidate', action: 'read_own', active: true },
    { id: '2', code: 'partner.lead.read_assigned', module: 'partner', action: 'read_assigned', active: true },
    { id: '3', code: 'partner.lead.accept', module: 'partner', action: 'accept', active: true },
    { id: '4', code: 'partner.candidate.shortlist', module: 'partner', action: 'shortlist', active: true },
    { id: '5', code: 'employer.job.create', module: 'employer', action: 'create', active: false },
    { id: '6', code: 'finance.refund.approve', module: 'finance', action: 'approve', active: false },
    { id: '7', code: 'compliance.partner.suspend', module: 'compliance', action: 'suspend', active: false },
  ]);

  const togglePermission = (id) => {
    setPermissionsList(permissionsList.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Admin Role & Permission Governance</h2>
            <p className="text-xs text-slate-500">Super Administrator RBAC / ABAC Permission Assignment Engine</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-slate-900 text-emerald-400 rounded-full text-xs font-semibold font-mono">
          SuperAdmin Mode
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2 border-r border-slate-100 pr-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">System Roles (16)</h3>
          {[
            { key: 'candidate', label: 'Candidate' },
            { key: 'partner_admin', label: 'Partner Administrator' },
            { key: 'partner_recruiter', label: 'Partner Recruiter' },
            { key: 'employer_admin', label: 'Employer Administrator' },
            { key: 'ops_officer', label: 'Operations Officer' },
            { key: 'finance_officer', label: 'Finance Officer' },
            { key: 'compliance_officer', label: 'Compliance Officer' },
            { key: 'super_admin', label: 'Super Administrator' },
          ].map((role) => (
            <button
              key={role.key}
              onClick={() => setSelectedRole(role.key)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                selectedRole === role.key
                  ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{role.label}</span>
              {selectedRole === role.key && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-4">
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <h4 className="text-sm font-bold text-slate-900 capitalize">
                Editing Permissions for: <span className="text-emerald-700">{selectedRole.replace('_', ' ')}</span>
              </h4>
              <p className="text-xs text-slate-500">Enable or revoke granular authorization permissions</p>
            </div>
            <button className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center space-x-1">
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Permission Code
            </button>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {permissionsList.map((perm) => (
              <div key={perm.id} className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    {perm.code}
                  </span>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Module: <span className="capitalize font-semibold">{perm.module}</span> | Action: <span className="font-semibold">{perm.action}</span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={perm.active}
                    onChange={() => togglePermission(perm.id)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
