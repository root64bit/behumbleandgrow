import React from 'react';
import { PlatformHealthService } from '../../types/superadmin';
import { Activity, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';

interface PlatformHealthPanelProps {
  services: PlatformHealthService[];
}

export default function PlatformHealthPanel({ services }: PlatformHealthPanelProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return { label: 'Operational', cls: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: CheckCircle2 };
      case 'degraded':
        return { label: 'Degraded Performance', cls: 'bg-amber-100 text-amber-800 border-amber-200', icon: AlertTriangle };
      case 'outage':
        return { label: 'Service Outage', cls: 'bg-rose-100 text-rose-800 border-rose-200', icon: XCircle };
      default:
        return { label: 'Not Configured', cls: 'bg-slate-100 text-slate-700 border-slate-200', icon: Clock };
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-extrabold text-slate-900">System & Infrastructure Health</h2>
            <p className="text-xs text-slate-500">Real-time status, latency, and uptime monitoring across core microservices.</p>
          </div>
        </div>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
          99.96% Platform Uptime
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {services.map((srv) => {
          const statusInfo = getStatusBadge(srv.status);
          const Icon = statusInfo.icon;

          return (
            <div key={srv.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{srv.category}</span>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border flex items-center gap-1 ${statusInfo.cls}`}>
                  <Icon className="w-3 h-3" />
                  <span>{statusInfo.label}</span>
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-900">{srv.name}</h3>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                <span>Latency: {srv.responseTimeMs ? `${srv.responseTimeMs}ms` : 'N/A'}</span>
                <span className="font-bold text-slate-700">{srv.uptimePercentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
