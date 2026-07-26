import React from 'react';
import { AuditLogEntry } from '../../types/superadmin';
import { ShieldAlert, UserCheck, Lock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuditTrailPanelProps {
  logs: AuditLogEntry[];
}

export default function AuditTrailPanel({ logs }: AuditTrailPanelProps) {
  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'high':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Recent Administrative Audit Logs</h2>
            <p className="text-xs text-slate-500">Immutable security trace of privileged platform changes, role escalations, and financial reviews.</p>
          </div>
        </div>

        <Link 
          to="/superadmin/security"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>View Full Audit Log</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {logs.map((log) => (
          <div key={log.id} className="py-3 flex items-start justify-between gap-4 hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">{log.action}</span>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${getRiskBadge(log.riskLevel)}`}>
                  {log.riskLevel} Risk
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Target Resource: <span className="font-semibold text-slate-800">{log.resource}</span>
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>{log.userEmail} ({log.userRole})</span>
              </div>
            </div>

            <span className="text-[11px] text-slate-400 shrink-0 font-medium">{log.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
