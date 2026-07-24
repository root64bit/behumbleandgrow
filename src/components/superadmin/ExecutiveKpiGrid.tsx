import React from 'react';
import { SuperAdminKpiMetric } from '../../types/superadmin';
import { 
  Users, 
  UserPlus, 
  FileText, 
  BadgeCheck, 
  CalendarCheck, 
  Award, 
  PlaneTakeoff, 
  PoundSterling,
  ArrowUpRight,
  ArrowDownRight,
  Info
} from 'lucide-react';

interface ExecutiveKpiGridProps {
  metrics: SuperAdminKpiMetric[];
}

export default function ExecutiveKpiGrid({ metrics }: ExecutiveKpiGridProps) {
  const getIcon = (category: string, id: string) => {
    switch (id) {
      case 'kpi-1': return Users;
      case 'kpi-2': return UserPlus;
      case 'kpi-3': return FileText;
      case 'kpi-4': return BadgeCheck;
      case 'kpi-5': return CalendarCheck;
      case 'kpi-6': return Award;
      case 'kpi-7': return PlaneTakeoff;
      case 'kpi-8': return PoundSterling;
      default: return Users;
    }
  };

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Executive Performance Indicators</h2>
          <p className="text-xs text-slate-500">Key recruitment, candidate conversion, and revenue metrics across the platform.</p>
        </div>
        <span className="text-[11px] font-bold text-slate-400">Updated Real-Time</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = getIcon(metric.category, metric.id);
          const isPositive = metric.changeDirection === 'up';

          return (
            <div 
              key={metric.id}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <span>{metric.label}</span>
                  <span className="text-slate-300 group-hover:text-slate-500 transition-colors" title={metric.tooltip}>
                    <Info className="w-3.5 h-3.5 cursor-help" />
                  </span>
                </span>

                <div className="p-2 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <p className="text-2xl font-black text-slate-900 tracking-tight">{metric.formattedValue}</p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                {metric.change !== undefined && (
                  <span className={`font-bold flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
                    isPositive 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                      : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                  }`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    <span>+{metric.change}%</span>
                  </span>
                )}
                <span className="text-slate-400 truncate">{metric.comparisonLabel}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
