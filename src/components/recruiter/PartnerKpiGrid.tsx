import React from 'react';
import { PartnerKpiMetric } from '../../types/recruiter';
import { 
  UserCheck, 
  Clock, 
  Users, 
  Send, 
  Video, 
  Award, 
  PlaneTakeoff, 
  AlertTriangle,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface PartnerKpiGridProps {
  metrics: PartnerKpiMetric[];
}

export default function PartnerKpiGrid({ metrics }: PartnerKpiGridProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'kpi-1': return UserCheck;
      case 'kpi-2': return Clock;
      case 'kpi-3': return Users;
      case 'kpi-4': return Send;
      case 'kpi-5': return Video;
      case 'kpi-6': return Award;
      case 'kpi-7': return PlaneTakeoff;
      case 'kpi-8': return AlertTriangle;
      default: return Users;
    }
  };

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Agency Performance Indicators</h2>
          <p className="text-xs text-slate-500">Key lead processing, employer submissions, and placement conversion metrics.</p>
        </div>
        <span className="text-[11px] font-bold text-slate-400">Live Scoped Data</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = getIcon(metric.id);
          const isWarning = metric.status === 'warning';
          const isCritical = metric.status === 'critical';

          return (
            <Link 
              key={metric.id}
              to={metric.destinationRoute}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-3 block group text-decoration-none"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <span>{metric.label}</span>
                  <span className="text-slate-300 group-hover:text-slate-500 transition-colors" title={metric.tooltip}>
                    <Info className="w-3.5 h-3.5 cursor-help" />
                  </span>
                </span>

                <div className={`p-2 rounded-xl transition-colors ${
                  isCritical 
                    ? 'bg-rose-100 text-rose-700' 
                    : isWarning 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <p className="text-2xl font-black text-slate-900 tracking-tight">{metric.formattedValue}</p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                {metric.change !== undefined ? (
                  <span className="font-bold text-emerald-700 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>+{metric.change}%</span>
                  </span>
                ) : (
                  <span className={`font-bold px-2 py-0.5 rounded-full ${
                    isCritical ? 'bg-rose-100 text-rose-800' : isWarning ? 'bg-amber-100 text-amber-800' : 'text-slate-400'
                  }`}>
                    {metric.comparisonLabel}
                  </span>
                )}
                {metric.change !== undefined && (
                  <span className="text-slate-400 truncate">{metric.comparisonLabel}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
